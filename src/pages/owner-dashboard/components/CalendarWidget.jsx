import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarWidget = ({ bookings = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const getBookingStatus = (date) => {
    if (!date) return null;
    
    const dateString = date?.toISOString()?.split('T')?.[0];
    const booking = bookings?.find(b => {
      const checkIn = new Date(b.checkIn)?.toISOString()?.split('T')?.[0];
      const checkOut = new Date(b.checkOut)?.toISOString()?.split('T')?.[0];
      return dateString >= checkIn && dateString <= checkOut;
    });
    
    return booking ? booking?.status : null;
  };
  
  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      checkout: 'bg-primary text-primary-foreground',
      maintenance: 'bg-error text-error-foreground'
    };
    return colors?.[status] || '';
  };
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Property Calendar</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          />
          <span className="text-sm font-medium text-foreground min-w-32 text-center">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek?.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          const status = getBookingStatus(date);
          const today = isToday(date);
          
          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-smooth cursor-pointer
                ${date ? 'hover:bg-muted' : ''}
                ${today ? 'ring-2 ring-primary' : ''}
                ${status ? getStatusColor(status) : ''}
                ${!date ? 'invisible' : ''}
              `}
            >
              {date && (
                <span className={`
                  ${status ? 'font-semibold' : 'text-foreground'}
                  ${today && !status ? 'font-bold text-primary' : ''}
                `}>
                  {date?.getDate()}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span className="text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span className="text-muted-foreground">Maintenance</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;