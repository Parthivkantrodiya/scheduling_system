import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="
        border-t
        bg-white
        px-6
        py-4
        text-center
        text-sm
        text-gray-500
      "
    >
      © {new Date().getFullYear()} ScheduleAI. All rights reserved.
    </footer>
  );
};

export default Footer;
