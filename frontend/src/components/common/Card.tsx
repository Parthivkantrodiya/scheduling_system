import React from "react";
import type { ReactNode } from "react";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  className?: string;
  padding?: CardPadding;
}

const Card: React.FC<CardProps> = ({
  children,
  title = "",
  subtitle,
  headerAction,
  footer,
  className = "",
  padding = "md",
}) => {
  const paddings: Record<CardPadding, string> = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>

          {headerAction}
        </div>
      )}

      <div className={paddings[padding]}>{children}</div>

      {footer && (
        <div className="border-t border-gray-100 px-6 py-4">{footer}</div>
      )}
    </div>
  );
};

export default Card;
