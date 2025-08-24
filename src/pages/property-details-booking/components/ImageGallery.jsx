import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageGallery = ({ images, propertyName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image Display */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
        <Image
          src={images?.[currentImageIndex]}
          alt={`${propertyName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images?.length}
        </div>

        {/* View All Photos Button */}
        <button
          onClick={() => setShowFullGallery(true)}
          className="absolute bottom-4 left-4 bg-white hover:bg-gray-50 text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-smooth"
        >
          <Icon name="Grid3X3" size={16} />
          <span>View all {images?.length} photos</span>
        </button>
      </div>
      {/* Thumbnail Grid (Desktop) */}
      <div className="hidden md:grid grid-cols-6 gap-2 mt-4">
        {images?.slice(0, 6)?.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`relative w-full h-16 lg:h-20 overflow-hidden rounded-lg transition-smooth ${
              index === currentImageIndex 
                ? 'ring-2 ring-primary' :'hover:opacity-80'
            }`}
          >
            <Image
              src={image}
              alt={`${propertyName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 5 && images?.length > 6 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                +{images?.length - 6}
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Mobile Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {images?.map((_, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black/90 z-200 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowFullGallery(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth z-10"
            >
              <Icon name="X" size={20} />
            </button>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    selectImage(index);
                    setShowFullGallery(false);
                  }}
                  className="relative w-full h-32 md:h-40 overflow-hidden rounded-lg hover:opacity-80 transition-smooth"
                >
                  <Image
                    src={image}
                    alt={`${propertyName} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;