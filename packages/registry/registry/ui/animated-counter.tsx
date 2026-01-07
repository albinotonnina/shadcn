"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** The target value to count to */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Number of decimal places to show */
  decimals?: number;
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string;
  /** Suffix to display after the number (e.g., "%") */
  suffix?: string;
  /** Whether to use locale formatting (e.g., 1,000) */
  useLocale?: boolean;
  /** Start counting when element is in viewport */
  startOnView?: boolean;
  /** Easing function for the animation */
  easing?: "linear" | "easeOut" | "easeInOut" | "spring";
}

const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

const AnimatedCounter = React.forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      value,
      duration = 2000,
      decimals = 0,
      prefix = "",
      suffix = "",
      useLocale = true,
      startOnView = true,
      easing = "easeOut",
      className,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const [hasStarted, setHasStarted] = React.useState(!startOnView);
    const elementRef = React.useRef<HTMLSpanElement>(null);
    const combinedRef = useCombinedRefs(ref, elementRef);

    // Intersection Observer for startOnView
    React.useEffect(() => {
      if (!startOnView || !elementRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(elementRef.current);

      return () => observer.disconnect();
    }, [startOnView]);

    // Animation effect
    React.useEffect(() => {
      if (!hasStarted) return;

      let startTime: number | null = null;
      let animationFrame: number;
      const startValue = displayValue;
      const easingFn = easingFunctions[easing];

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);

        const currentValue = startValue + (value - startValue) * easedProgress;
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [value, duration, hasStarted, easing]);

    const formattedValue = React.useMemo(() => {
      const rounded =
        Math.round(displayValue * Math.pow(10, decimals)) /
        Math.pow(10, decimals);
      if (useLocale) {
        return rounded.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
      return rounded.toFixed(decimals);
    }, [displayValue, decimals, useLocale]);

    return (
      <span
        ref={combinedRef}
        className={cn(
          "tabular-nums font-bold text-4xl tracking-tight",
          className
        )}
        {...props}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </span>
    );
  }
);
AnimatedCounter.displayName = "AnimatedCounter";

// Utility hook to combine refs
function useCombinedRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
}

export { AnimatedCounter };
