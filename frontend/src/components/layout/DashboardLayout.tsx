import React, { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar open={open} setOpen={setOpen} /> */}

      <div
        className="
          
          flex
          min-h-screen
          flex-col
        "
      >
        <Navbar setOpen={setOpen} />

        <main
          className="
            flex-1
            p-6
          "
        >
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
