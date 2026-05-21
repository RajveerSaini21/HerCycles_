// import React, { useState, useEffect } from "react";
// import Cycle from "../Entities/Cycle.json";
// import Symptom from "../Entities/Symptom.json";
// import Medication from "../Entities/Medication.json";
// import Post from "../Entities/Post.json";
// import User from "../Entities/User.json";
// import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
// import { Button } from "../Components/ui/button";
// import { Link } from "react-router-dom";
// import { createPageUrl } from "../utils";
// import { 
//   Calendar, 
//   Activity, 
//   Pill, 
//   MessageCircle, 
//   Heart,
//   Droplet,
//   Clock,
//   TrendingUp,
//   AlertCircle
// } from "lucide-react";
// import { Badge } from "../Components/ui/badge";
// import { format, addDays, differenceInDays, parseISO, isBefore, isAfter } from "date-fns";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [cycles, setCycles] = useState([]);
//   const [recentSymptoms, setRecentSymptoms] = useState([]);
//   const [medications, setMedications] = useState([]);
//   const [communityPosts, setCommunityPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const [userData, cycleData, symptomData, medicationData, postData] = await Promise.all([
//         User.me().catch(() => null),
//         Cycle.list('-start_date', 5),
//         Symptom.list('-date', 10),
//         Medication.filter({ active: true }),
//         Post.list('-created_date', 5)
//       ]);

//       setUser(userData);
//       setCycles(cycleData);
//       setRecentSymptoms(symptomData);
//       setMedications(medicationData);
//       setCommunityPosts(postData);
//     } catch (error) {
//       console.error("Error loading dashboard data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const calculateNextPeriod = () => {
//     if (cycles.length === 0) return null;

//     const lastCycle = cycles[0];
//     const avgCycleLength = cycles.length > 1 
//       ? cycles.slice(0, 3).reduce((sum, cycle) => sum + (cycle.cycle_length || 28), 0) / Math.min(3, cycles.length)
//       : 28;

//     return addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength));
//   };

//   const calculateOvulation = () => {
//     if (cycles.length === 0) return null;

//     const lastCycle = cycles[0];
//     const avgCycleLength = cycles.length > 1 
//       ? cycles.slice(0, 3).reduce((sum, cycle) => sum + (cycle.cycle_length || 28), 0) / Math.min(3, cycles.length)
//       : 28;

//     return addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength - 14));
//   };

//   const getDaysUntilNext = (date) => {
//     if (!date) return null;
//     const today = new Date();
//     return differenceInDays(date, today);
//   };

//   const nextPeriod = calculateNextPeriod();
//   const nextOvulation = calculateOvulation();
//   const daysUntilPeriod = getDaysUntilNext(nextPeriod);
//   const daysUntilOvulation = getDaysUntilNext(nextOvulation);

//   if (isLoading) {
//     return (
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg w-64"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Array(4).fill(0).map((_, i) => (
//               <div key={i} className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       {/* Welcome Header */}
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//           Welcome to Your Health Journey
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Stay connected with your body and well-being
//         </p>
//       </div>

//       {/* Quick Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="relative overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 border-0 shadow-xl">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <Droplet className="w-8 h-8 text-white/80" />
//               <Badge className="bg-white/20 text-white border-white/30 font-medium">
//                 Next Period
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-white">
//               <p className="text-3xl font-bold">
//                 {daysUntilPeriod !== null 
//                   ? daysUntilPeriod > 0 
//                     ? `${daysUntilPeriod} days`
//                     : daysUntilPeriod === 0
//                     ? 'Today'
//                     : 'Overdue'
//                   : 'Unknown'
//                 }
//               </p>
//               <p className="text-pink-100 text-sm mt-1">
//                 {nextPeriod ? format(nextPeriod, 'MMM d, yyyy') : 'Track cycles for predictions'}
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="relative overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 border-0 shadow-xl">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <Heart className="w-8 h-8 text-white/80" />
//               <Badge className="bg-white/20 text-white border-white/30 font-medium">
//                 Ovulation
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-white">
//               <p className="text-3xl font-bold">
//                 {daysUntilOvulation !== null 
//                   ? daysUntilOvulation > 0 
//                     ? `${daysUntilOvulation} days`
//                     : daysUntilOvulation === 0
//                     ? 'Today'
//                     : 'Passed'
//                   : 'Unknown'
//                 }
//               </p>
//               <p className="text-purple-100 text-sm mt-1">
//                 {nextOvulation ? format(nextOvulation, 'MMM d, yyyy') : 'Fertile window estimate'}
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-400 to-indigo-600 border-0 shadow-xl">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <Activity className="w-8 h-8 text-white/80" />
//               <Badge className="bg-white/20 text-white border-white/30 font-medium">
//                 Symptoms
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-white">
//               <p className="text-3xl font-bold">{recentSymptoms.length}</p>
//               <p className="text-indigo-100 text-sm mt-1">Logged this week</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="relative overflow-hidden bg-gradient-to-br from-violet-400 to-violet-600 border-0 shadow-xl">
//           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between">
//               <Pill className="w-8 h-8 text-white/80" />
//               <Badge className="bg-white/20 text-white border-white/30 font-medium">
//                 Medications
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-white">
//               <p className="text-3xl font-bold">{medications.length}</p>
//               <p className="text-violet-100 text-sm mt-1">Active reminders</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <CardTitle className="text-lg text-gray-800">Track Period</CardTitle>
//                 <p className="text-sm text-gray-500">Log your current cycle</p>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Link to={createPageUrl("PeriodTracker")}>
//               <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 font-medium">
//                 Open Tracker
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Activity className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <CardTitle className="text-lg text-gray-800">Log Symptoms</CardTitle>
//                 <p className="text-sm text-gray-500">Track how you feel today</p>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Link to={createPageUrl("Symptoms")}>
//               <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 font-medium">
//                 Add Symptoms
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
//           <CardHeader className="pb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <MessageCircle className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <CardTitle className="text-lg text-gray-800">Join Community</CardTitle>
//                 <p className="text-sm text-gray-500">Connect with others</p>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Link to={createPageUrl("Community")}>
//               <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 font-medium">
//                 Browse Posts
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity & Insights */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-xl">
//               <TrendingUp className="w-5 h-5 text-purple-600" />
//               Recent Symptoms
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {recentSymptoms.length > 0 ? (
//               <div className="space-y-3">
//                 {recentSymptoms.slice(0, 5).map((symptom) => (
//                   <div key={symptom.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
//                     <div>
//                       <p className="font-medium text-gray-800 capitalize">
//                         {symptom.symptom_type.replace(/_/g, ' ')}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {format(parseISO(symptom.date), 'MMM d, yyyy')}
//                       </p>
//                     </div>
//                     <Badge variant="secondary" className="bg-purple-100 text-purple-700">
//                       {symptom.severity}/10
//                     </Badge>
//                   </div>
//                 ))}
//                 <Link to={createPageUrl("Symptoms")} className="block">
//                   <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-600 hover:bg-purple-50">
//                     View All Symptoms
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No symptoms logged yet</p>
//                 <Link to={createPageUrl("Symptoms")}>
//                   <Button className="mt-3 bg-purple-500 hover:bg-purple-600">
//                     Start Tracking
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-xl">
//               <MessageCircle className="w-5 h-5 text-pink-600" />
//               Community Highlights
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {communityPosts.length > 0 ? (
//               <div className="space-y-3">
//                 {communityPosts.slice(0, 3).map((post) => (
//                   <div key={post.id} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
//                     <h4 className="font-medium text-gray-800 line-clamp-1">{post.title}</h4>
//                     <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
//                     <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Heart className="w-3 h-3" />
//                         {post.likes_count}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <MessageCircle className="w-3 h-3" />
//                         {post.comments_count}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//                 <Link to={createPageUrl("Community")} className="block">
//                   <Button variant="outline" className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50">
//                     Join Discussions
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No community posts yet</p>
//                 <Link to={createPageUrl("Community")}>
//                   <Button className="mt-3 bg-pink-500 hover:bg-pink-600">
//                     Start Exploring
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import {
  Calendar,
  Activity,
  Pill,
  MessageCircle,
  Heart,
  Droplet,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../Components/ui/badge";
import { format, addDays, differenceInDays, parseISO } from "date-fns";

const safeFormatDate = (date) => {
  if (!date) return "N/A";
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch (error) {
    return "Invalid date";
  }
};

export default function Dashboard() {
  const [cycles, setCycles] = useState([]);
  const [recentSymptoms, setRecentSymptoms] = useState([]);
  const [medications, setMedications] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = "http://localhost:5001/api";

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const [cycleRes, symptomRes, medicationRes, postRes] = await Promise.all([
        fetch(`${API_BASE}/cycles`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/symptoms`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/medications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [cycleData, symptomData, medicationData, postData] = await Promise.all([
        cycleRes.json(),
        symptomRes.json(),
        medicationRes.json(),
        postRes.json(),
      ]);

      setCycles(Array.isArray(cycleData) ? cycleData : []);
      setRecentSymptoms(Array.isArray(symptomData) ? symptomData : []);
      setMedications(Array.isArray(medicationData) ? medicationData : []);
      setCommunityPosts(Array.isArray(postData) ? postData : []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNextPeriod = () => {
    if (cycles.length === 0) return null;
    const lastCycle = cycles[0];
    const avgCycleLength = cycles.length > 1
      ? cycles.slice(0, 3).reduce((sum, c) => sum + (c.cycle_length || 28), 0) / Math.min(3, cycles.length)
      : 28;
    return addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength));
  };

  const calculateOvulation = () => {
    if (cycles.length === 0) return null;
    const lastCycle = cycles[0];
    const avgCycleLength = cycles.length > 1
      ? cycles.slice(0, 3).reduce((sum, c) => sum + (c.cycle_length || 28), 0) / Math.min(3, cycles.length)
      : 28;
    return addDays(parseISO(lastCycle.start_date), Math.round(avgCycleLength - 14));
  };

  const getDaysUntilNext = (date) => {
    if (!date) return null;
    const today = new Date();
    return differenceInDays(date, today);
  };

  const nextPeriod = calculateNextPeriod();
  const nextOvulation = calculateOvulation();
  const daysUntilPeriod = getDaysUntilNext(nextPeriod);
  const daysUntilOvulation = getDaysUntilNext(nextOvulation);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Your Health Journey
        </h1>
        <p className="text-gray-600 text-lg">
          Stay connected with your body and well-being
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600 border-0 shadow-xl">
          {/* <div className="pointer-events-none">
            <div className="absolute -top-4 -right-6 w-16 h-16 rounded-full bg-pink-200/70 border border-white/40" />
            <div className="absolute top-8 -right-10 w-24 h-24 rounded-full bg-rose-300/60 border border-white/40" />
            <div className="absolute -bottom-10 -left-8 w-24 h-24 rounded-full bg-pink-300/70 border border-white/40" />
          </div> */}
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

          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Droplet className="w-8 h-8 text-white/80" />
              <Badge className="bg-white/20 text-white border-white/30 font-medium">
                Next Period
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white">
              <p className="text-3xl font-bold">
                {daysUntilPeriod !== null
                  ? daysUntilPeriod > 0
                    ? `${daysUntilPeriod} days`
                    : daysUntilPeriod === 0
                      ? "Today"
                      : "Overdue"
                  : "Unknown"}
              </p>
              <p className="text-pink-100 text-sm mt-1">
                {safeFormatDate(nextPeriod, "MMM d, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 border-0 shadow-xl">
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
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Heart className="w-8 h-8 text-white/80" />
              <Badge className="bg-white/20 text-white border-white/30 font-medium">
                Ovulation
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white">
              <p className="text-3xl font-bold">
                {daysUntilOvulation !== null
                  ? daysUntilOvulation > 0
                    ? `${daysUntilOvulation} days`
                    : daysUntilOvulation === 0
                      ? "Today"
                      : "Passed"
                  : "Unknown"}
              </p>
              <p className="text-purple-100 text-sm mt-1">
                {safeFormatDate(nextOvulation, "MMM d, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-400 to-indigo-600 border-0 shadow-xl">
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
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Activity className="w-8 h-8 text-white/80" />
              <Badge className="bg-white/20 text-white border-white/30 font-medium">
                Symptoms
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white">
              <p className="text-3xl font-bold">{recentSymptoms.length}</p>
              <p className="text-indigo-100 text-sm mt-1">Logged this week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-violet-400 to-violet-600 border-0 shadow-xl">
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
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Pill className="w-8 h-8 text-white/80" />
              <Badge className="bg-white/20 text-white border-white/30 font-medium">
                Medications
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white">
              <p className="text-3xl font-bold">{medications.length}</p>
              <p className="text-violet-100 text-sm mt-1">Active reminders</p>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Period Tracker */}
        <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-800">Track Period</CardTitle>
                <p className="text-sm text-gray-500">Log your current cycle</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link to={createPageUrl("PeriodTracker")}>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 border-0 font-medium">
                Open Tracker
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Log Symptoms */}
        <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-800">Log Symptoms</CardTitle>
                <p className="text-sm text-gray-500">Track how you feel today</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link to={createPageUrl("Symptoms")}>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 font-medium">
                Add Symptoms
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Community */}
        <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-800">Join Community</CardTitle>
                <p className="text-sm text-gray-500">Connect with others</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link to={createPageUrl("Community")}>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 font-medium">
                Browse Posts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Insights */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Symptoms */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Recent Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSymptoms.length > 0 ? (
              <div className="space-y-3">
                {recentSymptoms.slice(0, 5).map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800 capitalize">
                        {symptom.symptom_type.replace(/_/g, ' ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(parseISO(symptom.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {symptom.severity}/10
                    </Badge>
                  </div>
                ))}
                <Link to={createPageUrl("Symptoms")} className="block">
                  <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-600 hover:bg-purple-50">
                    View All Symptoms
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No symptoms logged yet</p>
                <Link to={createPageUrl("Symptoms")}>
                  <Button className="mt-3 bg-purple-500 hover:bg-purple-600">
                    Start Tracking
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Community Highlights */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageCircle className="w-5 h-5 text-pink-600" />
              Community Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {communityPosts.length > 0 ? (
              <div className="space-y-3">
                {communityPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
                    <h4 className="font-medium text-gray-800 line-clamp-1">{post.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments_count}
                      </span>
                    </div>
                  </div>
                ))}
                <Link to={createPageUrl("Community")} className="block">
                  <Button variant="outline" className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50">
                    Join Discussions
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No community posts yet</p>
                <Link to={createPageUrl("Community")}>
                  <Button className="mt-3 bg-pink-500 hover:bg-pink-600">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
