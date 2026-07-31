import React from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
  return (
    <header
      className="
        h-16
        border-b
        bg-white
        flex
        items-center
        justify-between
        px-6
      "
    >
      {/* Left */}

      <button className="lg:hidden" onClick={() => setOpen(true)}>
        <FiMenu size={24} />
      </button>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >
        <button>
          <FiBell size={20} />
        </button>

        <div
          className="
            flex
            items-center
            gap-2
            cursor-pointer
          "
        >
          <div
            className="
              h-9
              w-9
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
            "
          >
            <FiUser />
          </div>

          <span
            className="
              hidden
              md:block
              text-sm
              font-medium
            "
          >
            Parthiv
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
