import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border-2 border-[#1F4E5F] text-[#1F4E5F] bg-white hover:bg-[#1F4E5F] hover:text-white shadow-sm",
        secondary: "bg-white border border-[#E5E7EB] text-[#1F2937] hover:bg-[#F3F4F6] shadow-sm",
        ghost: "text-[#1F2937] hover:bg-[#F3F4F6]",
        link: "text-[#1F4E5F] underline-offset-4 hover:underline",
        cta: "bg-cta-gradient text-white shadow-md hover:shadow-lg hover:brightness-110",
        brand: "bg-[#1F4E5F] text-white hover:bg-[#243447] shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-12 px-5 py-3",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-12 w-12",
        iconSm: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
