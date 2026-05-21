import * as React from "react";

// Wrapper
export function Accordion({ children, className = "" }) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

// Item
export function AccordionItem({ children, className = "" }) {
  return <div className={`border rounded-md ${className}`}>{children}</div>;
}

// Trigger (the clickable header)
export function AccordionTrigger({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200 rounded-t-md ${className}`}
    >
      {children}
    </button>
  );
}

// Content (shown/hidden)
export function AccordionContent({ children, isOpen, className = "" }) {
  return (
    <div
      className={`px-4 py-2 text-sm text-gray-700 transition-all duration-200 ${
        isOpen ? "block" : "hidden"
      } ${className}`}
    >
      {children}
    </div>
  );
}
