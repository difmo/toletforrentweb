import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, steps, onStepClick }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    return step?.icon;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Create Your Listing</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps?.length}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps?.length) * 100}%` }}
        />
      </div>
      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          
          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`flex flex-col items-center p-3 rounded-lg transition-smooth ${
                status === 'completed'
                  ? 'bg-success/10 text-success hover:bg-success/20'
                  : status === 'current' ?'bg-primary/10 text-primary hover:bg-primary/20' :'text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                status === 'completed'
                  ? 'bg-success text-success-foreground'
                  : status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name={getStepIcon(step, status)} size={16} />
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {step?.title}
              </span>
              {status === 'current' && (
                <div className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
      {/* Current Step Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name={steps?.[currentStep]?.icon} size={14} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{steps?.[currentStep]?.title}</h4>
            <p className="text-sm text-muted-foreground">{steps?.[currentStep]?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;