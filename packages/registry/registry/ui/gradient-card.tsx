import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gradientCardVariants = cva(
  "relative rounded-xl p-[2px] transition-all duration-300",
  {
    variants: {
      gradient: {
        rainbow:
          "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
        sunset: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500",
        ocean: "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500",
        forest: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600",
        fire: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600",
        aurora:
          "bg-gradient-to-r from-green-400 via-cyan-500 via-blue-500 to-purple-600",
      },
      animated: {
        true: "animate-gradient-x bg-[length:200%_200%]",
        false: "",
      },
      hover: {
        glow: "hover:shadow-lg hover:shadow-current/25",
        scale: "hover:scale-[1.02]",
        both: "hover:shadow-lg hover:shadow-current/25 hover:scale-[1.02]",
        none: "",
      },
    },
    defaultVariants: {
      gradient: "rainbow",
      animated: false,
      hover: "none",
    },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientCardVariants> {
  /** Content wrapper class for the inner card */
  innerClassName?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      innerClassName,
      gradient,
      animated,
      hover,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          gradientCardVariants({ gradient, animated, hover }),
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "rounded-[10px] bg-background p-6 h-full",
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
GradientCard.displayName = "GradientCard";

// Card subcomponents for better composition
const GradientCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
GradientCardHeader.displayName = "GradientCardHeader";

const GradientCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
GradientCardTitle.displayName = "GradientCardTitle";

const GradientCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
GradientCardDescription.displayName = "GradientCardDescription";

const GradientCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-2", className)} {...props} />
));
GradientCardContent.displayName = "GradientCardContent";

const GradientCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
GradientCardFooter.displayName = "GradientCardFooter";

export {
  GradientCard,
  GradientCardHeader,
  GradientCardTitle,
  GradientCardDescription,
  GradientCardContent,
  GradientCardFooter,
  gradientCardVariants,
};
