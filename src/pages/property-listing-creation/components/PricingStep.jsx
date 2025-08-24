import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PricingStep = ({ formData, onFormChange }) => {
  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' },
    { value: 'AUD', label: 'AUD (A$)' },
    { value: 'INR', label: 'INR (₹)' },
    { value: 'JPY', label: 'JPY (¥)' }
  ];

  const rentPeriods = [
    { value: 'monthly', label: 'Per Month' },
    { value: 'weekly', label: 'Per Week' },
    { value: 'daily', label: 'Per Day' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('pricing', { ...formData?.pricing, [field]: value });
  };

  const getMarketRateComparison = () => {
    const baseRent = parseFloat(formData?.pricing?.baseRent || 0);
    const marketRate = 1200; // Mock market rate
    
    if (baseRent === 0) return null;
    
    const difference = ((baseRent - marketRate) / marketRate) * 100;
    
    if (Math.abs(difference) < 5) {
      return { status: 'good', message: 'Competitively priced', color: 'text-success' };
    } else if (difference > 5) {
      return { status: 'high', message: 'Above market rate', color: 'text-warning' };
    } else {
      return { status: 'low', message: 'Below market rate', color: 'text-primary' };
    }
  };

  const marketComparison = getMarketRateComparison();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Pricing & Costs</h3>
        <p className="text-sm text-muted-foreground">Set competitive pricing for your property</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Currency"
          options={currencies}
          value={formData?.pricing?.currency || 'USD'}
          onChange={(value) => handleInputChange('currency', value)}
          required
        />

        <Select
          label="Rent Period"
          options={rentPeriods}
          value={formData?.pricing?.rentPeriod || 'monthly'}
          onChange={(value) => handleInputChange('rentPeriod', value)}
          required
        />
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Base Rent"
            type="number"
            placeholder="1200"
            value={formData?.pricing?.baseRent || ''}
            onChange={(e) => handleInputChange('baseRent', e?.target?.value)}
            description="The main rental amount"
            required
          />
          
          {marketComparison && (
            <div className="mt-2 flex items-center space-x-2">
              <Icon 
                name={marketComparison?.status === 'good' ? 'CheckCircle' : 'Info'} 
                size={14} 
                className={marketComparison?.color} 
              />
              <span className={`text-sm ${marketComparison?.color}`}>
                {marketComparison?.message} (Market avg: $1,200)
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Security Deposit"
            type="number"
            placeholder="1200"
            value={formData?.pricing?.securityDeposit || ''}
            onChange={(e) => handleInputChange('securityDeposit', e?.target?.value)}
            description="Refundable deposit amount"
          />

          <Input
            label="Utilities Cost"
            type="number"
            placeholder="150"
            value={formData?.pricing?.utilities || ''}
            onChange={(e) => handleInputChange('utilities', e?.target?.value)}
            description="Monthly utilities (if not included)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Application Fee"
            type="number"
            placeholder="50"
            value={formData?.pricing?.applicationFee || ''}
            onChange={(e) => handleInputChange('applicationFee', e?.target?.value)}
            description="One-time application processing fee"
          />

          <Input
            label="Pet Deposit"
            type="number"
            placeholder="300"
            value={formData?.pricing?.petDeposit || ''}
            onChange={(e) => handleInputChange('petDeposit', e?.target?.value)}
            description="Additional deposit for pets"
          />
        </div>
      </div>
      {/* Pricing Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Pricing Summary</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Base Rent</span>
            <span className="font-medium">
              {formData?.pricing?.currency || 'USD'} {formData?.pricing?.baseRent || '0'}
              <span className="text-muted-foreground text-xs ml-1">
                /{formData?.pricing?.rentPeriod?.replace('ly', '') || 'month'}
              </span>
            </span>
          </div>
          
          {formData?.pricing?.utilities && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Utilities</span>
              <span className="font-medium">
                {formData?.pricing?.currency || 'USD'} {formData?.pricing?.utilities}
              </span>
            </div>
          )}
          
          {formData?.pricing?.securityDeposit && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Security Deposit</span>
              <span className="font-medium">
                {formData?.pricing?.currency || 'USD'} {formData?.pricing?.securityDeposit}
              </span>
            </div>
          )}
          
          <div className="border-t border-border pt-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Total Monthly Cost</span>
              <span className="font-semibold text-lg text-primary">
                {formData?.pricing?.currency || 'USD'} {
                  (parseFloat(formData?.pricing?.baseRent || 0) + parseFloat(formData?.pricing?.utilities || 0))?.toFixed(0)
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Pricing Strategy</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Research similar properties in your area</li>
              <li>• Consider seasonal demand fluctuations</li>
              <li>• Include utilities in rent for simpler pricing</li>
              <li>• Competitive pricing gets 60% more inquiries</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Market Insights */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="BarChart3" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary">Market Insights</p>
            <div className="text-xs text-primary/80 mt-1 space-y-1">
              <p>• Average rent in your area: $1,200/month</p>
              <p>• Properties with utilities included rent 15% faster</p>
              <p>• Security deposits typically equal 1-2 months rent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;