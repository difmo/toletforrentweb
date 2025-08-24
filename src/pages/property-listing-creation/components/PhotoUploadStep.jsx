import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadStep = ({ formData, onFormChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const photos = formData?.photos || [];
  const coverPhotoId = formData?.coverPhoto || null;

  const mockPhotos = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560449752-2dd9b55c4d4b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560449752-2dd9b55c4d4b?w=800&h=600&fit=crop"
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    imageFiles?.forEach((file, index) => {
      const photoId = `photo_${Date.now()}_${index}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [photoId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev?.[photoId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            // Add photo to collection after upload completes
            const newPhoto = {
              id: photoId,
              url: mockPhotos?.[Math.floor(Math.random() * mockPhotos?.length)],
              name: file?.name,
              size: file?.size
            };
            
            const updatedPhotos = [...photos, newPhoto];
            onFormChange('photos', updatedPhotos);
            
            // Set as cover photo if it's the first photo
            if (updatedPhotos?.length === 1) {
              onFormChange('coverPhoto', photoId);
            }
            
            // Remove from progress tracking
            const { [photoId]: removed, ...rest } = prev;
            return rest;
          }
          return { ...prev, [photoId]: currentProgress + 10 };
        });
      }, 200);
    });
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    onFormChange('photos', updatedPhotos);
    
    // If removed photo was cover photo, set new cover photo
    if (coverPhotoId === photoId && updatedPhotos?.length > 0) {
      onFormChange('coverPhoto', updatedPhotos?.[0]?.id);
    } else if (updatedPhotos?.length === 0) {
      onFormChange('coverPhoto', null);
    }
  };

  const handleSetCoverPhoto = (photoId) => {
    onFormChange('coverPhoto', photoId);
  };

  const handleReorderPhotos = (fromIndex, toIndex) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos?.splice(fromIndex, 1);
    updatedPhotos?.splice(toIndex, 0, movedPhoto);
    onFormChange('photos', updatedPhotos);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Property Photos</h3>
        <p className="text-sm text-muted-foreground">
          Upload high-quality photos to showcase your property ({photos?.length}/20 photos)
        </p>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
          dragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Upload Property Photos</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your photos here, or click to browse
            </p>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="photo-upload"
            />
            
            <Button
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              iconName="Plus"
              iconPosition="left"
            >
              Choose Photos
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, WebP. Max size: 10MB per photo.
          </p>
        </div>
      </div>
      {/* Upload Progress */}
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Uploading Photos...</h4>
          {Object.entries(uploadProgress)?.map(([photoId, progress]) => (
            <div key={photoId} className="flex items-center space-x-3">
              <Icon name="Upload" size={16} className="text-primary" />
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
          ))}
        </div>
      )}
      {/* Photo Gallery */}
      {photos?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Uploaded Photos</h4>
            <span className="text-sm text-muted-foreground">
              {photos?.length} of 20 photos
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo, index) => (
              <div
                key={photo?.id}
                className="relative group bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={photo?.url}
                    alt={`Property photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Cover Photo Badge */}
                {coverPhotoId === photo?.id && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Cover Photo
                  </div>
                )}

                {/* Photo Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {coverPhotoId !== photo?.id && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSetCoverPhoto(photo?.id)}
                      iconName="Star"
                    >
                      Set Cover
                    </Button>
                  )}
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePhoto(photo?.id)}
                    iconName="Trash2"
                  >
                    Remove
                  </Button>
                </div>

                {/* Reorder Handles */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col space-y-1">
                    {index > 0 && (
                      <button
                        onClick={() => handleReorderPhotos(index, index - 1)}
                        className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
                      >
                        <Icon name="ChevronUp" size={12} />
                      </button>
                    )}
                    {index < photos?.length - 1 && (
                      <button
                        onClick={() => handleReorderPhotos(index, index + 1)}
                        className="p-1 bg-black/50 text-white rounded hover:bg-black/70"
                      >
                        <Icon name="ChevronDown" size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Photo Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Camera" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Photo Tips</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Take photos during daylight for best lighting</li>
              <li>• Include photos of all rooms, kitchen, and bathroom</li>
              <li>• Show unique features and amenities</li>
              <li>• Use horizontal orientation for better display</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadStep;