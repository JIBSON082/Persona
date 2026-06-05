import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none rounded-xl px-4 py-3.5 text-sm leading-relaxed",
        "bg-white/3 border border-white/7",
        "text-white/85 placeholder:text-white/20",
        "transition-all duration-300",
        "focus:outline-none focus:border-indigo-500/40 focus:bg-indigo-500/3 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.3)]",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

