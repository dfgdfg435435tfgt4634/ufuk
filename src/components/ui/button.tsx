import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
          {
            "bg-primary hover:bg-primary-dark text-black shadow-lg": variant === "primary",
            "border border-primary text-primary hover:bg-primary hover:text-black": variant === "secondary",
            "border border-border text-text-primary hover:border-primary hover:text-primary": variant === "outline",
            "text-text-primary hover:text-primary": variant === "ghost",
          },
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-12 px-8 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }