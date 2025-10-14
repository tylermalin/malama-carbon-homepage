/**
 * Comprehensive Profile Editor
 * Allows users to view and edit all profile information
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  FileText, 
  UserCircle,
  Save,
  Upload,
  X,
  Edit,
  CheckCircle2,
  Leaf,
  Code,
  ShoppingCart,
  Handshake
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface ProfileEditorProps {
  userId: string;
  userEmail: string;
  onProfileUpdate?: () => void;
}

interface ProfileData {
  full_name: string;
  phone: string;
  org_name: string;
  project_lead: string;
  project_description: string;
  profile_image_url: string;
}

interface UserRole {
  id: number;
  role: string;
  questionnaire_completed: boolean;
  added_at: string;
}

const roleIcons = {
  'PROJECT_DEVELOPER': Leaf,
  'TECHNOLOGY_DEVELOPER': Code,
  'CREDIT_BUYER': ShoppingCart,
  'PARTNER': Handshake
};

const roleLabels = {
  'PROJECT_DEVELOPER': 'Project Developer',
  'TECHNOLOGY_DEVELOPER': 'Technology Developer',
  'CREDIT_BUYER': 'Credit Buyer',
  'PARTNER': 'Partner'
};

export function ProfileEditor({ userId, userEmail, onProfileUpdate }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    phone: '',
    org_name: '',
    project_lead: '',
    project_description: '',
    profile_image_url: ''
  });
  const [editedData, setEditedData] = useState<ProfileData>(profileData);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadProfile();
    loadRoles();
  }, [userId]);

  const loadProfile = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, org_name, project_lead, project_description, profile_image_url')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      const profile = {
        full_name: data.full_name || '',
        phone: data.phone || '',
        org_name: data.org_name || '',
        project_lead: data.project_lead || '',
        project_description: data.project_description || '',
        profile_image_url: data.profile_image_url || ''
      };

      setProfileData(profile);
      setEditedData(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadRoles = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: true });

      if (error) throw error;
      setUserRoles(data || []);
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  };

  const handleSave = async () => {
    if (!supabase) return;

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editedData.full_name,
          phone: editedData.phone,
          org_name: editedData.org_name,
          project_lead: editedData.project_lead,
          project_description: editedData.project_description,
          profile_image_url: editedData.profile_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;

      setProfileData(editedData);
      setIsEditing(false);
      onProfileUpdate?.();
      
      console.log('✅ Profile updated successfully');
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const toggleRole = async (role: string) => {
    if (!supabase) return;

    try {
      const hasRole = userRoles.some(r => r.role === role);

      if (hasRole) {
        // Remove role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);

        if (error) throw error;
        console.log(`✅ Removed role: ${role}`);
      } else {
        // Add role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: role,
            questionnaire_completed: false,
            added_at: new Date().toISOString()
          });

        if (error) throw error;
        console.log(`✅ Added role: ${role}`);
      }

      // Reload roles to reflect changes
      await loadRoles();
      onProfileUpdate?.(); // Notify dashboard to refresh

    } catch (error: any) {
      console.error('Error toggling role:', error);
      alert(`Failed to ${userRoles.some(r => r.role === role) ? 'remove' : 'add'} role. ${error.message || ''}`);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !supabase) return;

    setIsUploading(true);

    try {
      // ✅ CRITICAL: Verify auth session exists before upload
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('❌ No active session found:', sessionError);
        alert('You must be logged in to upload images. Please sign in again.');
        setIsUploading(false);
        return;
      }
      
      console.log('✅ Auth session verified, user:', session.user.id);
      
      const fileExt = file.name.split('.').pop();
      // Simple flat structure - just userId-timestamp.ext
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      console.log('📤 Attempting upload:', {
        bucket: 'profile-images',
        fileName,
        fileSize: file.size,
        fileType: file.type,
        userId: session.user.id
      });

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error details:', {
          message: uploadError.message,
          error: uploadError.error,
          statusCode: uploadError.statusCode,
          full: uploadError
        });
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      setEditedData({ ...editedData, profile_image_url: publicUrl });
      
      console.log('✅ Image uploaded successfully to:', publicUrl);
    } catch (error: any) {
      console.error('❌ Error uploading image:', {
        message: error?.message,
        statusCode: error?.statusCode,
        error: error?.error,
        full: error
      });
      
      let errorMessage = 'Failed to upload image. ';
      if (error?.message) {
        errorMessage += error.message;
      } else if (error?.statusCode === 404) {
        errorMessage += 'Storage bucket not found. Please run the setup SQL first.';
      } else {
        errorMessage += 'Please ensure the image is under 5MB and in JPEG, PNG, GIF, or WebP format.';
      }
      
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            My Profile
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {editedData.profile_image_url ? (
              <img
                src={editedData.profile_image_url}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <UserCircle className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          {isEditing && (
            <div>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              <label htmlFor="profile-image">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('profile-image')?.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </label>
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  value={editedData.full_name}
                  onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
                  placeholder="John Doe"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profileData.full_name || <span className="text-gray-400 italic text-sm">Not set</span>}
                </p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-600">{userEmail}</p>
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profileData.phone || <span className="text-gray-400 italic text-sm">Not set</span>}
                </p>
              )}
            </div>

            {/* Project Lead */}
            <div>
              <Label htmlFor="project_lead">Project Lead</Label>
              {isEditing ? (
                <Input
                  id="project_lead"
                  value={editedData.project_lead}
                  onChange={(e) => setEditedData({ ...editedData, project_lead: e.target.value })}
                  placeholder="Lead person for projects"
                />
              ) : (
                <p className="mt-1 text-gray-900">
                  {profileData.project_lead || <span className="text-gray-400 italic text-sm">Not set</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Organization
          </h3>
          
          <div>
            <Label htmlFor="org_name">Company Name</Label>
            {isEditing ? (
              <Input
                id="org_name"
                value={editedData.org_name}
                onChange={(e) => setEditedData({ ...editedData, org_name: e.target.value })}
                placeholder="Your Company LLC"
              />
            ) : (
              <p className="mt-1 text-gray-900">
                {profileData.org_name || <span className="text-gray-400 italic text-sm">Not set</span>}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="project_description">Project Description</Label>
            {isEditing ? (
              <Textarea
                id="project_description"
                value={editedData.project_description}
                onChange={(e) => setEditedData({ ...editedData, project_description: e.target.value })}
                placeholder="Describe your carbon removal projects..."
                rows={4}
              />
            ) : (
              <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                {profileData.project_description || <span className="text-gray-400 italic text-sm">No description provided</span>}
              </p>
            )}
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Your Roles
          </h3>
          
          {/* Current Roles */}
          {userRoles.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {userRoles.map((userRole) => {
                const Icon = roleIcons[userRole.role as keyof typeof roleIcons];
                return (
                  <Badge
                    key={userRole.id}
                    variant={userRole.questionnaire_completed ? 'default' : 'secondary'}
                    className="flex items-center gap-2 px-3 py-1"
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {roleLabels[userRole.role as keyof typeof roleLabels]}
                    {userRole.questionnaire_completed && (
                      <CheckCircle2 className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4">No roles selected yet. Click below to add a role.</p>
          )}

          {/* Add/Remove Roles */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-600 mb-3">Manage your roles:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
                const Icon = roleIcons[roleKey as keyof typeof roleIcons];
                const hasRole = userRoles.some(r => r.role === roleKey);
                
                return (
                  <button
                    key={roleKey}
                    onClick={() => toggleRole(roleKey)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md border-2 transition-all text-left
                      ${hasRole 
                        ? 'border-primary bg-primary/5 text-primary hover:bg-primary/10' 
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                    <span className="text-sm font-medium flex-1">{roleLabel}</span>
                    {hasRole && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">
              Click a role to add it to your profile. Click again to remove it.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

