/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

const SelectCtx = React.createContext(null);

const items = [];
export function Select({ value, onValueChange, children, className = "" }) {
  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type === SelectContent) {
      React.Children.forEach(child.props.children, (grand) => {
        if (!grand) return;
        if (grand.type === SelectItem) {
          items.push({ value: grand.props.value, label: grand.props.children });
        }
      });
    }
  });

  const ctx = React.useMemo(() => ({ value, onValueChange, items }), [value, onValueChange, items]);

  return (
    <SelectCtx.Provider value={ctx}>
      <div className={className}>{children}</div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ className = "", children }) {
  const ctx = React.useContext(SelectCtx);
  if (!ctx) return null;
  return (
    <div className={`relative ${className}`}>
      <select
        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={ctx.value}
        onChange={(e) => ctx.onValueChange?.(e.target.value)}
      >
        {ctx.items.map((it) => (
          <option key={it.value} value={it.value}>
            {it.label}
          </option>
        ))}
      </select>
      {/* simple chevron */}
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
      {/* Keep children (e.g., <SelectValue/>) to match API, though it’s not needed for this shim */}
      <span className="sr-only">{children}</span>
    </div>
  );
}

export function SelectValue() {
  // No-op; value is shown by the native <select>
  return null;
}

export function SelectContent({ className = "", children }) {
  // No-op container; items are parsed by <Select>
  return <div className={`hidden ${className}`}>{children}</div>;
}

export function SelectItem({ value, children }) {
  // No-op: actual <option> is built by SelectTrigger from collected items
  return <div data-select-item={value} className="hidden">{children}</div>;
}
