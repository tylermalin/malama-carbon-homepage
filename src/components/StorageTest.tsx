/**
 * Storage Test Component
 * Tests loading images from Supabase Storage
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { getAssetUrl, uploadAsset, listAssets, isStorageAvailable } from '../lib/imageAssets';

export function StorageTest() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = async () => {
    const available = isStorageAvailable();
    setIsAvailable(available);

    if (available) {
      // Try to load the malama blue logo
      const url = getAssetUrl('logos/malama-logo-blue.png');
      setLogoUrl(url);
      console.log('🔍 Testing logo URL:', url);

      // List all assets in logos folder
      try {
        const files = await listAssets('logos');
        setAssets(files);
        console.log('📁 Files in logos folder:', files);
      } catch (error) {
        console.error('Error listing assets:', error);
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadAsset(file, `logos/${file.name}`);
      console.log('✅ Uploaded:', file.name);
      alert(`Uploaded ${file.name} successfully!`);
      
      // Refresh assets list
      const files = await listAssets('logos');
      setAssets(files);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Make sure you are logged in as admin.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary" />
              Supabase Storage Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Storage Status */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium">Supabase Storage Status:</span>
                {isAvailable ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Not Configured</span>
                  </div>
                )}
              </div>

              {/* Setup Instructions */}
              {!isAvailable && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">Storage Not Set Up</p>
                      <p className="text-sm text-yellow-800 mt-1">
                        To use Supabase Storage:
                      </p>
                      <ol className="text-sm text-yellow-800 mt-2 ml-4 list-decimal space-y-1">
                        <li>Go to Supabase Dashboard → Storage</li>
                        <li>Create new bucket: <code className="bg-yellow-100 px-1 rounded">website-assets</code></li>
                        <li>Toggle <strong>Public</strong> ON</li>
                        <li>Create folder: <code className="bg-yellow-100 px-1 rounded">logos/</code></li>
                        <li>Upload malama-logo-blue.png</li>
                        <li>Refresh this page</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Logo URL */}
              {isAvailable && logoUrl && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">Logo URL:</p>
                  <code className="text-xs text-blue-700 break-all bg-blue-100 p-2 rounded block">
                    {logoUrl}
                  </code>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Image Test */}
        {isAvailable && logoUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Image Load Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Image Display */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] bg-white">
                  {!imageLoaded && !imageError && (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading image from storage...</p>
                    </div>
                  )}
                  
                  {imageError && (
                    <div className="text-center">
                      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600 font-medium">Failed to load image</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Make sure the logo exists in the bucket at: logos/malama-logo-blue.png
                      </p>
                    </div>
                  )}

                  <img
                    src={logoUrl}
                    alt="Malama Logo Test"
                    className={`max-w-md max-h-[250px] object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => {
                      setImageLoaded(true);
                      console.log('✅ Image loaded successfully from storage!');
                    }}
                    onError={() => {
                      setImageError(true);
                      console.error('❌ Failed to load image from storage');
                    }}
                  />
                </div>

                {/* Status */}
                {imageLoaded && (
                  <div className="flex items-center gap-2 text-green-600 justify-center">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">✅ Image loaded successfully from Supabase Storage!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assets List */}
        {isAvailable && assets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Files in logos/ folder ({assets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(asset.metadata?.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = getAssetUrl(`logos/${asset.name}`);
                        setLogoUrl(url);
                        setImageLoaded(false);
                        setImageError(false);
                      }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Test (Admin Only) */}
        {isAvailable && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Test (Admin Only)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Test uploading a new logo to the storage bucket. You must be logged in as an admin.
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="flex-1"
                    disabled={uploading}
                  />
                  {uploading && (
                    <span className="text-sm text-muted-foreground">Uploading...</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Code Example */}
        {isAvailable && (
          <Card>
            <CardHeader>
              <CardTitle>How to Use in Your Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`// Import the helper
import ASSETS from '@/lib/imageAssets';

// Use in JSX
<img 
  src={ASSETS.LOGO_BLUE} 
  alt="Malama Logo" 
/>

// Or get any asset
import { getAssetUrl } from '@/lib/imageAssets';

const logoUrl = getAssetUrl('logos/malama-logo-blue.png');

<img src={logoUrl} alt="Logo" />`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

