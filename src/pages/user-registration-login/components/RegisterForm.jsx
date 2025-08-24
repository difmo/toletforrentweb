import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import UserTypeSelector from './UserTypeSelector';

const RegisterForm = ({ isLoading, onSubmit }) => {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    experience: '',
    verificationPreference: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState({});

  const experienceOptions = [
    { value: 'none', label: 'No experience' },
    { value: '1-2', label: '1-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' }
  ];

  const verificationOptions = [
    { value: 'basic', label: 'Basic verification' },
    { value: 'enhanced', label: 'Enhanced verification' },
    { value: 'premium', label: 'Premium verification' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.userType) {
      newErrors.userType = 'Please select your user type';
    }

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (formData?.userType === 'owner') {
      if (!formData?.experience) {
        newErrors.experience = 'Please select your experience level';
      }
      if (!formData?.verificationPreference) {
        newErrors.verificationPreference = 'Please select verification preference';
      }
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <UserTypeSelector
        selectedType={formData?.userType}
        onTypeChange={(type) => handleChange('userType', type)}
      />
      {errors?.userType && (
        <p className="text-sm text-error mt-1">{errors?.userType}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => handleChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
          disabled={isLoading}
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => handleChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
          disabled={isLoading}
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={(e) => handleChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={formData?.phone}
        onChange={(e) => handleChange('phone', e?.target?.value)}
        error={errors?.phone}
        required
        disabled={isLoading}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={(e) => handleChange('password', e?.target?.value)}
          error={errors?.password}
          description="Must be at least 8 characters"
          required
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
      </div>
      {formData?.userType === 'owner' && (
        <div className="space-y-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <h3 className="text-sm font-medium text-foreground">Property Owner Information</h3>
          
          <Select
            label="Property Management Experience"
            placeholder="Select your experience level"
            options={experienceOptions}
            value={formData?.experience}
            onChange={(value) => handleChange('experience', value)}
            error={errors?.experience}
            required
            disabled={isLoading}
          />

          <Select
            label="Verification Preference"
            placeholder="Choose verification level"
            options={verificationOptions}
            value={formData?.verificationPreference}
            onChange={(value) => handleChange('verificationPreference', value)}
            error={errors?.verificationPreference}
            description="Higher verification levels increase tenant trust"
            required
            disabled={isLoading}
          />
        </div>
      )}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />

        <Checkbox
          label="I want to receive marketing emails and updates"
          checked={formData?.agreeToMarketing}
          onChange={(e) => handleChange('agreeToMarketing', e?.target?.checked)}
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;