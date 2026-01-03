import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold text-button transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-gold-300 text-white hover:bg-gold-400 hover:shadow-button focus-visible:ring-teal-500 active:scale-[0.97]',
        secondary: 'bg-transparent border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white focus-visible:ring-navy-500 active:scale-[0.97]',
        outline: 'bg-transparent border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-white focus-visible:ring-teal-500 active:scale-[0.97]',
        ghost: 'bg-transparent text-navy-500 hover:bg-gray-100 focus-visible:ring-teal-500',
        destructive: 'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500 active:scale-[0.97]',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-10 px-6 py-2 text-sm',
        lg: 'h-14 px-10 py-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

