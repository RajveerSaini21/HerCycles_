
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Calendar, Plus, Droplet, TrendingUp } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import PeriodForm from "../Components/period/PeriodForm";
import CycleCalendar from "../Components/period/CycleCalendar";
import CycleInsights from "../Components/period/CycleInsights";

const API_BASE = "http://localhost:5001/api/cycles";

export default function PeriodTracker() {
  const [cycles, setCycles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load user cycles when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first to track your periods.");
      window.location.href = "/login";
      return;
    }
    loadCycles(token);
  }, []);

  // ✅ Fetch all cycles for the logged-in user
  const loadCycles = async (token) => {
    try {
      setIsLoading(true);
      const res = await fetch(API_BASE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("Failed to load cycles");

      const data = await res.json();
      setCycles(data);
    } catch (error) {
      console.error("Error loading cycles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Create or update a cycle
  const handleSaveCycle = async (cycleData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      window.location.href = "/login";
      return;
    }

    try {
      const url = selectedCycle ? `${API_BASE}/${selectedCycle._id}` : API_BASE;
      const method = selectedCycle ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cycleData),
      });

      if (!res.ok) throw new Error("Failed to save cycle");

      setShowForm(false);
      setSelectedCycle(null);
      loadCycles(token);
    } catch (error) {
      console.error("Error saving cycle:", error);
    }
  };

  const handleEditCycle = (cycle) => {
    setSelectedCycle(cycle);
    setShowForm(true);
  };

  // ✅ Calculate statistics for user’s cycles
  const calculateStats = () => {
    if (cycles.length < 2) return null;

    const avgCycleLength =
      cycles.slice(0, 6).reduce((sum, c) => sum + (c.cycle_length || 28), 0) /
      Math.min(6, cycles.length);

    const avgPeriodLength =
      cycles.slice(0, 6).reduce((sum, c) => sum + (c.period_length || 5), 0) /
      Math.min(6, cycles.length);

    return {
      avgCycleLength: Math.round(avgCycleLength),
      avgPeriodLength: Math.round(avgPeriodLength),
    };
  };

  const stats = calculateStats();

  // ✅ Loading screen shimmer
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg w-64 mb-6"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main layout
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Period Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            Track your menstrual cycles and get personalized insights
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Period
        </Button>
      </div>

      {/* Stats */}
      {/* {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-pink-400 to-pink-600 border-0 text-white">
            <CardHeader className="pb-3">
              <Droplet className="w-8 h-8 text-white/80" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.avgCycleLength}</p>
              <p className="text-pink-100 text-sm">Average cycle length (days)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-400 to-rose-600 border-0 text-white">
            <CardHeader className="pb-3">
              <Calendar className="w-8 h-8 text-white/80" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.avgPeriodLength}</p>
              <p className="text-rose-100 text-sm">Average period length (days)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 border-0 text-white">
            <CardHeader className="pb-3">
              <TrendingUp className="w-8 h-8 text-white/80" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{cycles.length}</p>
              <p className="text-purple-100 text-sm">Total cycles tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-400 to-indigo-600 border-0 text-white">
            <CardHeader className="pb-3">
              <Calendar className="w-8 h-8 text-white/80" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {cycles.length > 0
                  ? differenceInDays(new Date(), parseISO(cycles[0].start_date))
                  : 0}
              </p>
              <p className="text-indigo-100 text-sm">Days since last period</p>
            </CardContent>
          </Card>
        </div>
      )} */}
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Avg cycle length */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-xl p-5">

            {/* MULTIPLE BUBBLES */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Right Cluster */}
              <div className="absolute top-3 right-4 w-6 h-6 bg-white/25 rounded-full" />
              <div className="absolute top-8 right-8 w-4 h-4 bg-pink-200/30 rounded-full" />
              <div className="absolute top-1 right-10 w-3 h-3 bg-white/20 rounded-full" />

              {/* Bottom Left Cluster */}
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-pink-300/25 rounded-full" />
              <div className="absolute bottom-2 left-10 w-6 h-6 bg-white/20 rounded-full" />
              <div className="absolute bottom-8 left-7 w-4 h-4 bg-pink-100/30 rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="pb-3">
                <Droplet className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold">{stats.avgCycleLength}</p>
              <p className="text-pink-100 text-sm">Average cycle length (days)</p>
            </div>
          </div>

          {/* Avg period length */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-xl p-5">

            {/* Bubbles */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Right side bubbles */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/25 rounded-full" />
              <div className="absolute top-12 right-8 w-4 h-4 bg-purple-200/30 rounded-full" />
              <div className="absolute top-1 right-12 w-3 h-3 bg-white/15 rounded-full" />

              {/* Left bottom */}
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-purple-300/25 rounded-full" />
              <div className="absolute bottom-1 left-12 w-6 h-6 bg-white/20 rounded-full" />
              <div className="absolute bottom-8 left-8 w-4 h-4 bg-purple-100/30 rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="pb-3">
                <Calendar className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold">{stats.avgPeriodLength}</p>
              <p className="text-purple-100 text-sm">Average period length (days)</p>
            </div>
          </div>

          {/* Total cycles tracked */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-xl p-5">

            {/* Bubbles */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Right cluster */}
              <div className="absolute top-3 right-4 w-6 h-6 bg-white/25 rounded-full" />
              <div className="absolute top-10 right-10 w-4 h-4 bg-indigo-200/30 rounded-full" />
              <div className="absolute top-1 right-12 w-3 h-3 bg-white/20 rounded-full" />

              {/* Left cluster */}
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-indigo-300/25 rounded-full" />
              <div className="absolute bottom-1 left-12 w-6 h-6 bg-white/20 rounded-full" />
              <div className="absolute bottom-8 left-8 w-4 h-4 bg-indigo-100/30 rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="pb-3">
                <TrendingUp className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold">{cycles.length}</p>
              <p className="text-indigo-100 text-sm">Total cycles tracked</p>
            </div>
          </div>

          {/* Days since last period */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-xl p-5">

            {/* Bubbles */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Right */}
              <div className="absolute top-3 right-4 w-6 h-6 bg-white/25 rounded-full" />
              <div className="absolute top-10 right-10 w-4 h-4 bg-violet-200/30 rounded-full" />
              <div className="absolute top-1 right-12 w-3 h-3 bg-white/15 rounded-full" />

              {/* Left */}
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-violet-300/25 rounded-full" />
              <div className="absolute bottom-1 left-12 w-6 h-6 bg-white/20 rounded-full" />
              <div className="absolute bottom-8 left-8 w-4 h-4 bg-violet-100/30 rounded-full" />
            </div>

            <div className="relative z-10">
              <div className="pb-3">
                <Calendar className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-3xl font-bold">
                {cycles.length > 0
                  ? differenceInDays(new Date(), parseISO(cycles[0].start_date))
                  : 0}
              </p>
              <p className="text-violet-100 text-sm">Days since last period</p>
            </div>
          </div>

        </div>
      )}

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CycleCalendar
            cycles={cycles}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onEditCycle={handleEditCycle}
          />
        </div>

        <div className="space-y-6">
          <CycleInsights cycles={cycles} />

          {/* Recent Cycles */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Cycles</CardTitle>
            </CardHeader>
            <CardContent>
              {cycles.length > 0 ? (
                <div className="space-y-3">
                  {cycles.slice(0, 5).map((cycle) => (
                    <div
                      key={cycle._id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl cursor-pointer hover:from-pink-100 hover:to-rose-100 transition-colors"
                      onClick={() => handleEditCycle(cycle)}
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {format(parseISO(cycle.start_date), "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cycle.cycle_length
                            ? `${cycle.cycle_length} day cycle`
                            : "Ongoing"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-pink-600">
                          {cycle.flow_intensity || "Moderate"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {cycle.period_length || "--"} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-3">No cycles tracked yet</p>
                  <Button
                    onClick={() => setShowForm(true)}
                    size="sm"
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    Add First Cycle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <PeriodForm
              cycle={selectedCycle}
              onSave={handleSaveCycle}
              onCancel={() => {
                setShowForm(false);
                setSelectedCycle(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
