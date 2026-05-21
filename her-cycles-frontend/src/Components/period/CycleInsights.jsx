import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, Calendar, Droplet, Heart } from "lucide-react";
import { format, parseISO, addDays, differenceInDays } from "date-fns";

export default function CycleInsights({ cycles }) {
  if (cycles.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Cycle Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Track a few cycles to see personalized insights and predictions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const calculatePredictions = () => {
    if (cycles.length < 2) return null;
    
    const lastCycle = cycles[0];
    const avgCycleLength = cycles.slice(0, 6).reduce((sum, cycle) => 
      sum + (cycle.cycle_length || 28), 0) / Math.min(6, cycles.length);
    
    const nextPeriodDate = addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength));
    const nextOvulationDate = addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength - 14));
    
    const daysUntilPeriod = differenceInDays(nextPeriodDate, new Date());
    const daysUntilOvulation = differenceInDays(nextOvulationDate, new Date());
    
    return {
      nextPeriodDate,
      nextOvulationDate,
      daysUntilPeriod,
      daysUntilOvulation,
      avgCycleLength: Math.round(avgCycleLength)
    };
  };

  const predictions = calculatePredictions();

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Cycle Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {predictions ? (
          <div className="space-y-4">
            {/* Next Period Prediction */}
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <Droplet className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-800">Next Period</h4>
              </div>
              <p className="text-2xl font-bold text-pink-600">
                {predictions.daysUntilPeriod > 0 
                  ? `${predictions.daysUntilPeriod} days`
                  : predictions.daysUntilPeriod === 0
                  ? 'Today'
                  : 'Overdue'
                }
              </p>
              <p className="text-sm text-gray-600">
                Expected on {format(predictions.nextPeriodDate, 'MMM d, yyyy')}
              </p>
            </div>

            {/* Next Ovulation Prediction */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-800">Next Ovulation</h4>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {predictions.daysUntilOvulation > 0 
                  ? `${predictions.daysUntilOvulation} days`
                  : predictions.daysUntilOvulation === 0
                  ? 'Today'
                  : 'Passed'
                }
              </p>
              <p className="text-sm text-gray-600">
                Expected on {format(predictions.nextOvulationDate, 'MMM d, yyyy')}
              </p>
            </div>

            {/* Cycle Stats */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-800">Your Pattern</h4>
              </div>
              <p className="text-sm text-gray-600">
                Average cycle: <span className="font-semibold">{predictions.avgCycleLength} days</span>
              </p>
              <p className="text-sm text-gray-600">
                Based on last {Math.min(6, cycles.length)} cycles
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Track more cycles to get predictions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}