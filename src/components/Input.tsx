import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  className?: string;
  error?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold ">{label}</label>
        <input
          className={`p-3 border-2 rounded-xl focus:outline-none focus:ring-1 text-md font-medium text-black`}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />

        {error && (
          <span className="text-red-600 text-xs mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  },
);
