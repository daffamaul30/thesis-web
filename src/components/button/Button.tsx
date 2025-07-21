import React from "react";

type Variant = "primary" | "secondary" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "reset" | "button" | "submit" | undefined;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-950 text-white hover:bg-blue-800",
  secondary: "bg-blue-300 text-white hover:bg-gray-200 hover:text-gray-800",
  danger: "bg-red-600 text-white hover:bg-red-800",
  outline:
    "border-2 border-blue-950 text-blue-950 font-semibold hover:bg-blue-950 hover:text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 h-10 py-2",
  md: "text-base px-4 h-14 py-2",
  lg: "text-lg px-5 h-16 py-3",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      leftIcon,
      rightIcon,
      onClick,
      type,
      ...props
    },
    ref
  ) => {
    const baseClass =
      "inline-flex shadow-lg whitespace-nowrap items-center cursor-pointer justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const classes = `${baseClass} ${variantStyles[variant]} ${
      sizeStyles[size]
    } ${fullWidth ? "w-full" : ""} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
        onClick={onClick}
        type={type || "button"}
      >
        {loading ? (
          <svg
            className="animate-spin mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}

        {children}

        {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

// CARA PENGGUNAAN
{
  /* <div className="space-y-4">
  <Button>Simpan</Button>
  <Button variant="secondary" size="md">
    Kembali
  </Button>
  <Button variant="danger" fullWidth>
    Hapus
  </Button>
  <Button loading>Loading...</Button>
  <Button rightIcon={<span>➡️</span>}>Selanjutnya</Button>
</div>; */
}
