import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-heading font-bold rounded-full transition-all duration-300 cursor-pointer uppercase tracking-wider";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]",
    secondary:
      "bg-secondary text-white hover:bg-secondary-light shadow-md hover:shadow-lg hover:scale-[1.03]",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-[1.03]",
    white:
      "bg-white text-primary hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-[1.03]",
    ghost:
      "bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-primary hover:scale-[1.03]",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} style={style}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      style={style}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
