import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import step components
import ProgressIndicator from './components/ProgressIndicator';
import PropertyTypeSelector from './components/PropertyTypeSelector';
import LocationStep from './components/LocationStep';
import PropertyDetailsStep from './components/PropertyDetailsStep';
import AmenitiesStep from './components/AmenitiesStep';
import PhotoUploadStep from './components/PhotoUploadStep';
import PricingStep from './components/PricingStep';
import AvailabilityStep from './components/AvailabilityStep';
import ListingPreview from './components/ListingPreview';

const PropertyListingCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [propertyType, setPropertyType] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    location: {},
    details: {},
    amenities: [],
    photos: [],
    coverPhoto: null,
    pricing: {},
    availability: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const steps = [
    {
      title: 'Property Type',
      description: 'Select the type of property you want to list',
      icon: 'Home',
      component: PropertyTypeSelector
    },
    {
      title: 'Location',
      description: 'Provide the property address and location details',
      icon: 'MapPin',
      component: LocationStep
    },
    {
      title: 'Details',
      description: 'Add property specifications and description',
      icon: 'FileText',
      component: PropertyDetailsStep
    },
    {
      title: 'Amenities',
      description: 'Select available amenities and features',
      icon: 'Star',
      component: AmenitiesStep
    },
    {
      title: 'Photos',
      description: 'Upload property photos and images',
      icon: 'Camera',
      component: PhotoUploadStep
    },
    {
      title: 'Pricing',
      description: 'Set rental price and additional costs',
      icon: 'DollarSign',
      component: PricingStep
    },
    {
      title: 'Availability',
      description: 'Configure availability and lease terms',
      icon: 'Calendar',
      component: AvailabilityStep
    }
  ];

  useEffect(() => {
    // Check if user is authenticated and is an owner
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userType = localStorage.getItem('userType');
    
    if (!isAuthenticated || userType !== 'owner') {
      navigate('/user-registration-login');
      return;
    }

    // Load draft from localStorage if exists
    const savedDraft = localStorage.getItem('propertyListingDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft?.formData || formData);
        setPropertyType(draft?.propertyType || '');
        setCurrentStep(draft?.currentStep || 0);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [navigate]);

  const handleFormChange = (section, data) => {
    const updatedFormData = { ...formData, [section]: data };
    setFormData(updatedFormData);
    
    // Auto-save draft
    saveDraft(updatedFormData, propertyType, currentStep);
  };

  const handlePropertyTypeSelect = (type) => {
    setPropertyType(type);
    const updatedFormData = { ...formData, type };
    setFormData(updatedFormData);
    saveDraft(updatedFormData, type, currentStep);
  };

  const saveDraft = (data, type, step) => {
    const draft = {
      formData: data,
      propertyType: type,
      currentStep: step,
      lastSaved: new Date()?.toISOString()
    };
    localStorage.setItem('propertyListingDraft', JSON.stringify(draft));
  };

  const handleStepClick = (stepIndex) => {
    // Allow navigation to previous steps or current step
    if (stepIndex <= currentStep || stepIndex === 0) {
      setCurrentStep(stepIndex);
      saveDraft(formData, propertyType, stepIndex);
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveDraft(formData, propertyType, nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveDraft(formData, propertyType, prevStep);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    saveDraft(formData, propertyType, currentStep);
    setIsSaving(false);
    
    // Show success message (you could use a toast notification here)
    alert('Draft saved successfully!');
  };

  const handlePublishListing = async () => {
    if (!isListingComplete()) {
      alert('Please complete all required fields before publishing.');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call to publish listing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear draft after successful publish
    localStorage.removeItem('propertyListingDraft');
    
    setIsSaving(false);
    
    // Navigate to owner dashboard
    navigate('/owner-dashboard');
  };

  const isListingComplete = () => {
    return !!(
      propertyType &&
      formData?.details?.title &&
      formData?.details?.description &&
      formData?.location?.address &&
      formData?.location?.city &&
      formData?.pricing?.baseRent &&
      formData?.availability?.availableFrom
    );
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return !!propertyType;
      case 1: return !!(formData?.location?.address && formData?.location?.city);
      case 2: return !!(formData?.details?.title && formData?.details?.description);
      case 3: return true; // Amenities are optional
      case 4: return true; // Photos are optional but recommended
      case 5: return !!formData?.pricing?.baseRent;
      case 6: return !!formData?.availability?.availableFrom;
      default: return true;
    }
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps?.[currentStep]?.component;
    
    if (currentStep === 0) {
      return (
        <PropertyTypeSelector
          selectedType={propertyType}
          onTypeSelect={handlePropertyTypeSelect}
        />
      );
    }
    
    return (
      <StepComponent
        formData={formData}
        onFormChange={handleFormChange}
        propertyType={propertyType}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Property Listing</h1>
            <p className="text-muted-foreground">
              List your property for rent and connect with potential tenants
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            steps={steps}
            onStepClick={handleStepClick}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                {getCurrentStepComponent()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      onClick={handleSaveDraft}
                      loading={isSaving}
                      iconName="Save"
                      iconPosition="left"
                    >
                      Save Draft
                    </Button>

                    {currentStep === steps?.length - 1 ? (
                      <Button
                        variant="default"
                        onClick={handlePublishListing}
                        disabled={!isListingComplete()}
                        loading={isSaving}
                        iconName="Upload"
                        iconPosition="left"
                      >
                        Publish Listing
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleNext}
                        disabled={!canProceedToNext()}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-3">
              {/* Mobile Preview Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                  iconName={showMobilePreview ? "EyeOff" : "Eye"}
                  iconPosition="left"
                  fullWidth
                >
                  {showMobilePreview ? 'Hide' : 'Show'} Preview
                </Button>
              </div>

              {/* Preview Component */}
              <div className={`${showMobilePreview ? 'block' : 'hidden'} lg:block sticky top-24`}>
                <ListingPreview
                  formData={formData}
                  propertyType={propertyType}
                />
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-muted/50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="HelpCircle" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our listing creation guide will help you create an attractive property listing that gets more inquiries.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" iconName="Book" iconPosition="left">
                    Listing Guide
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Get Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="Video" iconPosition="left">
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyListingCreation;