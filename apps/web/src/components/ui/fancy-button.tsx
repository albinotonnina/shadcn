import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fancyButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        gradient:
          "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl",
        ocean:
          "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl",
        sunset:
          "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl",
        forest:
          "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl",
        neon:
          "bg-black text-white border-2 border-transparent bg-clip-padding hover:border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "gradient",
      size: "md",
    },
  }
);

export interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fancyButtonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(fancyButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
FancyButton.displayName = "FancyButton";

export { FancyButton, fancyButtonVariants };
