
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  Calendar, 
  Activity, 
  Pill, 
  MessageCircle, 
  HelpCircle, 
  BarChart3,
  Heart,
  Menu,
  X,
  ClipboardCheck
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "./Components/ui/sidebar";

// --- Navigation items (urls lowercase for consistency) ---
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
    gradient: "from-pink-400 to-pink-600"
  },
  {
    title: "Period Tracker",
    url: "/periodtracker",
    icon: Calendar,
    gradient: "from-rose-400 to-rose-600"
  },
  {
    title: "Symptoms",
    url: "/symptoms",
    icon: Activity,
    gradient: "from-purple-400 to-purple-600"
  },
  {
    title: "Symptom Analyzer",
    url: "/symptomanalyzer",
    icon: ClipboardCheck,
    gradient: "from-sky-400 to-sky-600"
  },
  {
    title: "Medications",
    url: "/medication",
    icon: Pill,
    gradient: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Community",
    url: "/community",
    icon: MessageCircle,
    gradient: "from-violet-400 to-violet-600"
  },
  {
    title: "Q&A Hub",
    url: "/qahub",
    icon: HelpCircle,
    gradient: "from-cyan-400 to-cyan-600"
  }
];

export default function Layout() {
    const { user } = useContext(AuthContext);

  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <style>{`
        :root {
          --primary: #ec4899;
          --primary-foreground: white;
          --secondary: #f3e8ff;
          --secondary-foreground: #6b21a8;
          --accent: #fce7f3;
          --accent-foreground: #be185d;
          --background: #ffffff;
          --foreground: #0f172a;
          --muted: #f8fafc;
          --muted-foreground: #64748b;
          --border: #e2e8f0;
          --input: #ffffff;
          --ring: #ec4899;
        }
      `}</style>
      
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar
  className="hidden md:flex fixed left-4 top-4 h-[96vh] w-64 rounded-2xl border-r-0 bg-white/80 backdrop-blur-xl shadow-xl z-40"
>


            <SidebarHeader className="p-6 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Her Cycles
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">Your Health Companion</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:scale-105 ${
                            location.pathname === item.url 
                              ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg' 
                              : 'hover:bg-pink-50 text-gray-700'
                          }`}
                        >
                          <Link
  key={item.title}
  to={item.url}
  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
    location.pathname === item.url
      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
      : 'hover:bg-pink-50 text-gray-700'
  }`}
>
  <item.icon
    className={`w-5 h-5 ${
      location.pathname === item.url ? 'text-white' : 'text-gray-500'
    }`}
  />
  <span
    className={`font-medium ${
      location.pathname === item.url ? 'text-white' : 'text-gray-700'
    }`}
  >
    {item.title}
  </span>
</Link>

                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-pink-100">
  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </span>
      </div>

      <div className="flex-1">
        <p className="font-semibold text-gray-900 text-sm">
          {user?.name || "Guest"}
        </p>
        <p className="text-xs text-gray-600">
          {user ? "Welcome back!" : "Not logged in"}
        </p>
      </div>
    </div>

    {/* ✅ Logout Button */}
    {user && (
      <button
        onClick={() => {
          localStorage.removeItem("token"); // remove stored token
          window.location.href = "/login";  // redirect to login page
        }}
        className="mt-3 w-full text-xs font-medium text-red-600 hover:text-red-700 transition"
      >
        Logout
      </button>
    )}
  </div>
</SidebarFooter>



          </Sidebar>

          {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-4 left-4 z-50">


            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-pink-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl p-6 flex flex-col overflow-y-auto">

                <div className="flex items-center gap-3 mb-8 mt-12">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Her Cycles
                    </h2>
                    <p className="text-xs text-gray-500">Your Health Companion</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        location.pathname === item.url 
                          ? 'bg-gradient-to-r ' + item.gradient + ' text-white' 
                          : 'hover:bg-pink-50 text-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  ))}
                </nav>
                {/* Mobile User Footer */}
<div className="mt-20 border-t border-pink-100 pt-4">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-sm">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </span>
    </div>

    <div className="flex-1">
      <p className="font-semibold text-gray-900 text-sm">
        {user?.name || "Guest"}
      </p>
      <p className="text-xs text-gray-600">
        {user ? "Welcome back!" : "Not logged in"}
      </p>
    </div>
  </div>

  {user && (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
      className="mt-3 w-full text-xs font-medium text-red-600 hover:text-red-700 transition"
    >
      Logout
    </button>
  )}
</div>

              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto pt-16 px-4 md:pt-0 md:px-0 md:ml-72 md:mt-2 md:mb-2">


            <div className="p-4 md:p-8">
            

              <Outlet />   {/* 👈 renders active route here */}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
