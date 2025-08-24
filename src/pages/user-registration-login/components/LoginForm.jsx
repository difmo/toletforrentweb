import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ isLoading, onSubmit, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
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
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={(e) => handleChange('password', e?.target?.value)}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleChange('rememberMe', e?.target?.checked)}
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-hover"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Sign In
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        <p>Demo Credentials:</p>
        <p>Tenant: tenant@rentspace.com / tenant123</p>
        <p>Owner: owner@rentspace.com / owner123</p>
      </div>
    </form>
  );
};

export default LoginForm;