import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";

interface SidebarProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItem {
  name: string;
  path: string;
  icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: FiCalendar,
  },
  {
    name: "Availability",
    path: "/availability",
    icon: FiClock,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: FiUsers,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open = true, setOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-40
          h-screen
          w-64
          bg-white
          border-r
          transition-transform
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}

        <div className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-bold text-blue-600">ScheduleAI</h1>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Menu */}

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                  `
                }
              >
                <Icon size={20} />

                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
