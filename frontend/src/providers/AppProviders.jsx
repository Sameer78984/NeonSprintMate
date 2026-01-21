import React from "react";
// Future imports for Toast containers or Query Clients would go here

export const AppProvider = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased">
      {/* DaisyUI Theme wrapper: 
          data-theme="light" or "dark" can be dynamically set here 
      */}
      <main className="relative flex flex-col">{children}</main>
    </div>
  );
};
