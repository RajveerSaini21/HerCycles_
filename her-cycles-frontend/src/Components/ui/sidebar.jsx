import * as React from "react";

// Sidebar container
export function Sidebar({ children, className = "" }) {
  return (
    <aside
      className={`flex flex-col w-72 bg-white border-r border-gray-200 ${className}`}
    >
      {children}
    </aside>
  );
}

// Header
export function SidebarHeader({ children, className = "" }) {
  return (
    <div className={`px-6 py-5 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

// Content
export function SidebarContent({ children, className = "" }) {
  return (
    <div className={`flex-1 overflow-y-auto px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}

// Footer
export function SidebarFooter({ children, className = "" }) {
  return (
    <div className={`px-6 py-5 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

// Group wrapper
export function SidebarGroup({ children, className = "" }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

export function SidebarGroupContent({ children, className = "" }) {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
}

// Menu list
export function SidebarMenu({ children, className = "" }) {
  return <ul className={`space-y-2 ${className}`}>{children}</ul>;
}

// Menu item
export function SidebarMenuItem({ children, className = "" }) {
  return <li className={`py-1 ${className}`}>{children}</li>;
}

// Menu button
export function SidebarMenuButton({ children, className = "", asChild = false }) {
  if (asChild) return children;
  return (
    <button
      className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 transition ${className}`}
    >
      {children}
    </button>
  );
}

// Provider + Trigger for mobile toggle
export function SidebarProvider({ children }) {
  return <>{children}</>;
}

export function SidebarTrigger({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-lg border border-gray-300 bg-white shadow-md md:hidden"
    >
      {isOpen ? "Close" : "Menu"}
    </button>
  );
}
