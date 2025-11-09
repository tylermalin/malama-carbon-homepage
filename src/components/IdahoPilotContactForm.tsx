import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { CheckCircle, Loader2, AlertCircle, Sprout, MapPin } from 'lucide-react';
import { submitIdahoPilotForm, type IdahoPilotSubmission } from '../lib/supabaseClient';

interface IdahoPilotContactFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function IdahoPilotContactForm({ onSuccess, onCancel }: IdahoPilotContactFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    category: 'Farmer / Landowner',
    country: '',
    region: '',
    farm_name: '',
    farm_size_acres: '',
    land_type: '',
    soil_ph_known: '',
    soil_texture: '',
    recent_amendments: '',
    current_crops: '',
    crop_cycle: '',
    previous_silicate_use: '',
    preferred_contact_method: '',
    best_contact_time: '',
    message: '',
    how_heard: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['first_name', 'last_name', 'email', 'category', 'country', 'message', 'how_heard'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields with valid information.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Prepare submission data
      const submissionData: Omit<IdahoPilotSubmission, 'id' | 'created_at' | 'user_agent' | 'referrer'> = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        category: formData.category,
        country: formData.country,
        region: formData.region.trim() || undefined,
        farm_name: formData.farm_name.trim() || undefined,
        farm_size_acres: formData.farm_size_acres ? parseInt(formData.farm_size_acres) : undefined,
        land_type: formData.land_type || undefined,
        soil_ph_known: formData.soil_ph_known || undefined,
        soil_texture: formData.soil_texture || undefined,
        recent_amendments: formData.recent_amendments.trim() || undefined,
        current_crops: formData.current_crops.trim() || undefined,
        crop_cycle: formData.crop_cycle.trim() || undefined,
        previous_silicate_use: formData.previous_silicate_use.trim() || undefined,
        preferred_contact_method: formData.preferred_contact_method || undefined,
        best_contact_time: formData.best_contact_time || undefined,
        message: formData.message.trim(),
        how_heard: formData.how_heard
      };

      const result = await submitIdahoPilotForm(submissionData);

      if (result.success) {
        setSubmitStatus('success');
        console.log('✅ Idaho Pilot form submitted successfully');
        
        // Call success callback after a delay
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      } else if (result.fallbackToMailto) {
        // Fallback to mailto if Supabase fails
        console.warn('⚠️ Falling back to mailto for Idaho Pilot form');
        const subject = `Idaho Pilot Application: ${formData.first_name} ${formData.last_name}`;
        const body = `
Idaho Rock Weathering Pilot Application

Personal Information:
Name: ${formData.first_name} ${formData.last_name}
Email: ${formData.email}
Phone: ${formData.phone}
Category: ${formData.category}

Location:
Country: ${formData.country}
Region: ${formData.region}

Farm Information:
Farm/Business Name: ${formData.farm_name}
Farm Size (Acres): ${formData.farm_size_acres}
Land Type: ${formData.land_type}

Soil & Crop Information:
Soil pH Known: ${formData.soil_ph_known}
Soil Texture: ${formData.soil_texture}
Recent Amendments: ${formData.recent_amendments}
Current Crops: ${formData.current_crops}
Crop Cycle: ${formData.crop_cycle}
Previous Silicate Rock Use: ${formData.previous_silicate_use}

Contact Preferences:
Preferred Method: ${formData.preferred_contact_method}
Best Time to Contact: ${formData.best_contact_time}

Message:
${formData.message}

How They Heard About Us: ${formData.how_heard}
        `.trim();
        
        const mailtoLink = `mailto:idaho@malamaproject.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        setSubmitStatus('success');
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your interest in the Idaho Rock Weathering Pilot Program. 
            We'll review your application and contact you within 3-5 business days.
          </p>
          <Badge variant="secondary" className="mb-4">
            <Sprout className="w-4 h-4 mr-2" />
            Welcome to the Idaho Pilot Program
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Idaho Rock Weathering Pilot Application</CardTitle>
            </div>
            <CardDescription>
              Whether you're a business, farmer, potential partner, or just have a question for one of our teams, 
              fill out the form below to start a conversation about our climate solutions, joining our farmer program 
              or how we can work together towards a sustainable future.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center text-destructive">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name*</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name*</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Which category best describes you?*</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farmer / Landowner">Farmer / Landowner</SelectItem>
                  <SelectItem value="Agricultural Business">Agricultural Business</SelectItem>
                  <SelectItem value="Researcher">Researcher</SelectItem>
                  <SelectItem value="Government Agency">Government Agency</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="country">Country*</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="New Zealand">New Zealand</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region">Country/Region/Province:*</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                placeholder="e.g., Idaho, California, Ontario"
              />
            </div>
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Farm & Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="farm_name">(Optional) Farm/Business Name (if applicable):</Label>
              <Input
                id="farm_name"
                value={formData.farm_name}
                onChange={(e) => handleInputChange('farm_name', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="farm_size_acres">(Optional) What is the size of your farm? (Acres)</Label>
              <Input
                id="farm_size_acres"
                type="number"
                value={formData.farm_size_acres}
                onChange={(e) => handleInputChange('farm_size_acres', e.target.value)}
                placeholder="Enter number of acres"
              />
            </div>

            <div>
              <Label htmlFor="land_type">(Optional) What type of land do you manage?</Label>
              <Select value={formData.land_type} onValueChange={(value) => handleInputChange('land_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Row Crops (Corn, Soybeans, etc.)">Row Crops (Corn, Soybeans, etc.)</SelectItem>
                  <SelectItem value="Wheat/Grain Production">Wheat/Grain Production</SelectItem>
                  <SelectItem value="Potato Production">Potato Production</SelectItem>
                  <SelectItem value="Pasture/Grazing Land">Pasture/Grazing Land</SelectItem>
                  <SelectItem value="Mixed Farming Operation">Mixed Farming Operation</SelectItem>
                  <SelectItem value="Specialty Crops">Specialty Crops</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Soil & Agricultural Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Soil & Agricultural Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="soil_ph_known">(Optional) Do you know the pH of your soil?</Label>
              <Select value={formData.soil_ph_known} onValueChange={(value) => handleInputChange('soil_ph_known', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes, pH below 6.0 (Acidic)">Yes, pH below 6.0 (Acidic)</SelectItem>
                  <SelectItem value="Yes, pH 6.0-7.0 (Slightly Acidic to Neutral)">Yes, pH 6.0-7.0 (Slightly Acidic to Neutral)</SelectItem>
                  <SelectItem value="Yes, pH above 7.0 (Alkaline)">Yes, pH above 7.0 (Alkaline)</SelectItem>
                  <SelectItem value="No, but would like to test">No, but would like to test</SelectItem>
                  <SelectItem value="No, not interested in testing">No, not interested in testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="soil_texture">(Optional) What is the soil texture on your land?</Label>
              <Select value={formData.soil_texture} onValueChange={(value) => handleInputChange('soil_texture', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Loam">Loam</SelectItem>
                  <SelectItem value="Silt">Silt</SelectItem>
                  <SelectItem value="Mixed/Variable">Mixed/Variable</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="recent_amendments">(Optional) Have you recently applied any soil amendments (e.g., lime, fertilisers)?</Label>
              <Textarea
                id="recent_amendments"
                value={formData.recent_amendments}
                onChange={(e) => handleInputChange('recent_amendments', e.target.value)}
                placeholder="Please describe any recent soil amendments, including type and timing"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="current_crops">(Optional) What crops are you currently growing?</Label>
              <Textarea
                id="current_crops"
                value={formData.current_crops}
                onChange={(e) => handleInputChange('current_crops', e.target.value)}
                placeholder="List your current crops or planned crops for next season"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="crop_cycle">(Optional) Do you follow a specific crop cycle?</Label>
              <Textarea
                id="crop_cycle"
                value={formData.crop_cycle}
                onChange={(e) => handleInputChange('crop_cycle', e.target.value)}
                placeholder="Describe your crop rotation or farming cycle"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="previous_silicate_use">(Optional) Have you previously applied crushed silicate rock like Wollastonite to your land? If Yes, when?</Label>
              <Textarea
                id="previous_silicate_use"
                value={formData.previous_silicate_use}
                onChange={(e) => handleInputChange('previous_silicate_use', e.target.value)}
                placeholder="Please provide details about previous use of silicate rock amendments"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="preferred_contact_method">(Optional) Preferred Method of Contact (e.g., phone, email, SMS)</Label>
              <Select value={formData.preferred_contact_method} onValueChange={(value) => handleInputChange('preferred_contact_method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="Text/SMS">Text/SMS</SelectItem>
                  <SelectItem value="Video Call">Video Call</SelectItem>
                  <SelectItem value="No Preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="best_contact_time">(Optional) Best Time to Contact</Label>
              <Select value={formData.best_contact_time} onValueChange={(value) => handleInputChange('best_contact_time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="Afternoon (12PM - 5PM)">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="No Preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Message & Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="message">Let us know more about your enquiry*</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Please tell us about your interest in the Idaho Rock Weathering Pilot Program, any specific questions you have, or what you hope to achieve through participation..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="how_heard">How did you hear about us?*</Label>
              <Select value={formData.how_heard} onValueChange={(value) => handleInputChange('how_heard', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mālama Labs Website">Mālama Labs Website</SelectItem>
                  <SelectItem value="Social Media (LinkedIn, Twitter, etc.)">Social Media (LinkedIn, Twitter, etc.)</SelectItem>
                  <SelectItem value="Agricultural Conference/Event">Agricultural Conference/Event</SelectItem>
                  <SelectItem value="Industry Publication">Industry Publication</SelectItem>
                  <SelectItem value="Word of Mouth/Referral">Word of Mouth/Referral</SelectItem>
                  <SelectItem value="Search Engine (Google, etc.)">Search Engine (Google, etc.)</SelectItem>
                  <SelectItem value="University/Research Institution">University/Research Institution</SelectItem>
                  <SelectItem value="Government Agency">Government Agency</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Thank you for your information. This will help us with support enquiries and allow us to share updates 
              about our mission and progress. You retain full control over these communications and can opt out at any point. 
              Please review our Privacy Policy to learn how to unsubscribe and read about our commitment to protecting your privacy.
            </p>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting || !validateForm()}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}



