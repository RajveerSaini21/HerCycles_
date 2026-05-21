import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Calendar, Droplet, Heart } from "lucide-react";
import { 
  format, 
  parseISO, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addDays,
  subDays,
  addMonths,
  subMonths
} from "date-fns";

export default function CycleCalendar({ cycles, currentDate, onDateChange, onEditCycle }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days for complete weeks
  const startDay = monthStart.getDay();
  const endDay = monthEnd.getDay();
  const paddingStart = Array.from({ length: startDay }, (_, i) => 
    subDays(monthStart, startDay - i)
  );
  const paddingEnd = Array.from({ length: 6 - endDay }, (_, i) => 
    addDays(monthEnd, i + 1)
  );
  const allDays = [...paddingStart, ...calendarDays, ...paddingEnd];

  const getDayType = (date) => {
    for (const cycle of cycles) {
      const startDate = parseISO(cycle.start_date);
      const endDate = cycle.end_date ? parseISO(cycle.end_date) : null;
      
      // Period days
      if (endDate) {
        const periodDays = eachDayOfInterval({ start: startDate, end: endDate });
        if (periodDays.some(day => isSameDay(day, date))) {
          return { type: 'period', cycle };
        }
      } else if (isSameDay(startDate, date)) {
        return { type: 'period', cycle };
      }
      
      // Ovulation day (approximately 14 days before next cycle)
      if (cycle.cycle_length) {
        const ovulationDay = addDays(startDate, cycle.cycle_length - 14);
        if (isSameDay(ovulationDay, date)) {
          return { type: 'ovulation', cycle };
        }
        
        // Fertile window (5 days before ovulation + ovulation day)
        const fertileStart = subDays(ovulationDay, 4);
        const fertileEnd = ovulationDay;
        const fertileDays = eachDayOfInterval({ start: fertileStart, end: fertileEnd });
        if (fertileDays.some(day => isSameDay(day, date))) {
          return { type: 'fertile', cycle };
        }
      }
    }
    
    return { type: 'normal' };
  };

  const getDayClasses = (date, dayInfo) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer";
    const isCurrentMonth = isSameMonth(date, currentDate);
    const isToday = isSameDay(date, new Date());
    
    if (!isCurrentMonth) {
      return `${baseClasses} text-gray-300 hover:bg-gray-100`;
    }
    
    if (isToday) {
      return `${baseClasses} bg-gray-800 text-white`;
    }
    
    switch (dayInfo.type) {
      case 'period':
        return `${baseClasses} bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:from-pink-500 hover:to-rose-600`;
      case 'ovulation':
        return `${baseClasses} bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700`;
      case 'fertile':
        return `${baseClasses} bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200`;
      default:
        return `${baseClasses} text-gray-700 hover:bg-gray-100`;
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-pink-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {format(currentDate, 'MMMM yyyy')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDateChange(subMonths(currentDate, 1))}
              className="hover:bg-pink-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDateChange(new Date())}
              className="hover:bg-pink-50"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDateChange(addMonths(currentDate, 1))}
              className="hover:bg-pink-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((date, index) => {
            const dayInfo = getDayType(date);
            return (
              <div
                key={index}
                className={getDayClasses(date, dayInfo)}
                onClick={() => {
                  if (dayInfo.cycle) {
                    onEditCycle(dayInfo.cycle);
                  }
                }}
              >
                {format(date, 'd')}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-pink-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-500"></div>
              <span className="text-gray-600">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <span className="text-gray-600">Ovulation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200"></div>
              <span className="text-gray-600">Fertile Window</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}