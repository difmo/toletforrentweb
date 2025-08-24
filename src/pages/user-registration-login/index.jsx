import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import AuthFooter from './components/AuthFooter';
import Icon from '../../components/AppIcon';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const userType = localStorage.getItem('userType');
      if (userType === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/property-search-browse');
      }
    }

    // Set initial tab based on URL parameter
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      const validCredentials = [
        { email: 'tenant@rentspace.com', password: 'tenant123', type: 'tenant' },
        { email: 'owner@rentspace.com', password: 'owner123', type: 'owner' }
      ];
      
      const user = validCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (user) {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', user?.type);
        localStorage.setItem('userEmail', formData?.email);
        
        setSuccessMessage(`Welcome back! Redirecting to your ${user?.type} dashboard...`);
        setShowSuccess(true);
        
        setTimeout(() => {
          if (user?.type === 'owner') {
            navigate('/owner-dashboard');
          } else {
            navigate('/property-search-browse');
          }
        }, 2000);
      } else {
        throw new Error('Invalid email or password. Please check your credentials.');
      }
    } catch (error) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', formData?.userType);
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', `${formData?.firstName} ${formData?.lastName}`);
      
      setSuccessMessage(`Account created successfully! Welcome to RentSpace, ${formData?.firstName}!`);
      setShowSuccess(true);
      
      setTimeout(() => {
        if (formData?.userType === 'owner') {
          navigate('/owner-dashboard');
        } else {
          navigate('/property-search-browse');
        }
      }, 2000);
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'tenant');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      setSuccessMessage(`Successfully signed in with ${provider}!`);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/property-search-browse');
      }, 2000);
    } catch (error) {
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link has been sent to your email address.');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-elevation-2 p-8 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Success!</h2>
            <p className="text-muted-foreground mb-4">{successMessage}</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-elevation-2 p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome back' : 'Join RentSpace'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to your account to continue' :'Create your account to get started'
                }
              </p>
            </div>

            {/* Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Forms */}
            {activeTab === 'login' ? (
              <LoginForm
                isLoading={isLoading}
                onSubmit={handleLogin}
                onForgotPassword={handleForgotPassword}
              />
            ) : (
              <RegisterForm
                isLoading={isLoading}
                onSubmit={handleRegister}
              />
            )}

            {/* Social Login */}
            <div className="mt-6">
              <SocialLogin
                isLoading={isLoading}
                onSocialLogin={handleSocialLogin}
              />
            </div>

            {/* Switch Tab Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 font-medium transition-hover"
                  disabled={isLoading}
                >
                  {activeTab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>

            <AuthFooter />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationLogin;