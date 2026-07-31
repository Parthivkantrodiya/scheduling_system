import React from "react";

type LoaderSize = "sm" | "md" | "lg" | "xl";

type LoaderColor = "primary" | "secondary" | "success" | "danger" | "white";

interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  text = "",
  className = "",
}) => {
  const sizes: Record<LoaderSize, string> = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const colors: Record<LoaderColor, string> = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    success: "border-green-600",
    danger: "border-red-600",
    white: "border-white",
  };

  const loader = (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div
        className={`
          animate-spin
          rounded-full
          border-t-transparent
          ${sizes[size]}
          ${colors[color]}
        `}
      />

      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
