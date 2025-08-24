import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AvailabilityStep = ({ formData, onFormChange }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarView, setCalendarView] = useState(new Date());

  const leaseTerms = [
    { value: '1-month', label: '1 Month' },
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '12-months', label: '12 Months' },
    { value: '24-months', label: '24 Months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('availability', { ...formData?.availability, [field]: value });
  };

  const generateCalendarDays = () => {
    const year = calendarView?.getFullYear();
    const month = calendarView?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(currentDate));
      currentDate?.setDate(currentDate?.getDate() + 1);
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    const availableFrom = new Date(formData.availability?.availableFrom || Date.now());
    const availableTo = formData?.availability?.availableTo ? new Date(formData.availability.availableTo) : null;
    
    if (date < availableFrom) return false;
    if (availableTo && date > availableTo) return false;
    
    return true;
  };

  const isDateSelected = (date) => {
    return selectedDates?.some(selectedDate => 
      selectedDate?.toDateString() === date?.toDateString()
    );
  };

  const handleDateClick = (date) => {
    if (!isDateAvailable(date)) return;
    
    const isSelected = isDateSelected(date);
    if (isSelected) {
      setSelectedDates(selectedDates?.filter(d => d?.toDateString() !== date?.toDateString()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(calendarView);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setCalendarView(newDate);
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Availability & Terms</h3>
        <p className="text-sm text-muted-foreground">Set when your property is available for rent</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Available From"
          type="date"
          value={formData?.availability?.availableFrom || ''}
          onChange={(e) => handleInputChange('availableFrom', e?.target?.value)}
          min={new Date()?.toISOString()?.split('T')?.[0]}
          required
        />

        <Input
          label="Available Until (Optional)"
          type="date"
          value={formData?.availability?.availableTo || ''}
          onChange={(e) => handleInputChange('availableTo', e?.target?.value)}
          min={formData?.availability?.availableFrom || new Date()?.toISOString()?.split('T')?.[0]}
          description="Leave empty for ongoing availability"
        />
      </div>
      <Select
        label="Minimum Lease Term"
        options={leaseTerms}
        value={formData?.availability?.minLeaseTerm || ''}
        onChange={(value) => handleInputChange('minLeaseTerm', value)}
        placeholder="Select minimum lease term"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Notice Period (Days)"
          type="number"
          placeholder="30"
          min="0"
          value={formData?.availability?.noticePeriod || ''}
          onChange={(e) => handleInputChange('noticePeriod', e?.target?.value)}
          description="Days notice required before move-in"
        />

        <Input
          label="Maximum Occupants"
          type="number"
          placeholder="2"
          min="1"
          value={formData?.availability?.maxOccupants || ''}
          onChange={(e) => handleInputChange('maxOccupants', e?.target?.value)}
          required
        />
      </div>
      {/* Availability Calendar */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Availability Calendar</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateCalendar(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <span className="font-medium text-foreground min-w-[120px] text-center">
              {monthNames?.[calendarView?.getMonth()]} {calendarView?.getFullYear()}
            </span>
            <button
              onClick={() => navigateCalendar(1)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays?.map((date, index) => {
            const isCurrentMonth = date?.getMonth() === calendarView?.getMonth();
            const isAvailable = isDateAvailable(date);
            const isSelected = isDateSelected(date);
            const isToday = date?.toDateString() === new Date()?.toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!isAvailable}
                className={`p-2 text-sm rounded-lg transition-smooth ${
                  !isCurrentMonth
                    ? 'text-muted-foreground/50'
                    : isSelected
                    ? 'bg-primary text-primary-foreground'
                    : isAvailable
                    ? 'hover:bg-muted text-foreground'
                    : 'text-muted-foreground/50 cursor-not-allowed'
                } ${isToday ? 'ring-2 ring-primary/50' : ''}`}
              >
                {date?.getDate()}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            {selectedDates?.length} dates selected
          </span>
        </div>
      </div>
      {/* Additional Options */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Additional Options</h4>
        
        <div className="space-y-3">
          <Checkbox
            label="Allow pets"
            checked={formData?.availability?.allowPets || false}
            onChange={(e) => handleInputChange('allowPets', e?.target?.checked)}
          />
          
          <Checkbox
            label="Allow smoking"
            checked={formData?.availability?.allowSmoking || false}
            onChange={(e) => handleInputChange('allowSmoking', e?.target?.checked)}
          />
          
          <Checkbox
            label="Suitable for students"
            checked={formData?.availability?.studentFriendly || false}
            onChange={(e) => handleInputChange('studentFriendly', e?.target?.checked)}
          />
          
          <Checkbox
            label="Professional tenants only"
            checked={formData?.availability?.professionalsOnly || false}
            onChange={(e) => handleInputChange('professionalsOnly', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Availability Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Availability Summary</p>
            <div className="text-xs text-muted-foreground mt-1 space-y-1">
              <p>• Available from: {formData?.availability?.availableFrom || 'Not set'}</p>
              <p>• Minimum lease: {formData?.availability?.minLeaseTerm || 'Not set'}</p>
              <p>• Maximum occupants: {formData?.availability?.maxOccupants || 'Not set'}</p>
              <p>• Notice period: {formData?.availability?.noticePeriod || '0'} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStep;