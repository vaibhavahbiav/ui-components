import React, { useState } from "react";

export interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    loading?: boolean;
    type?: "text" | "password";
    variant?: "filled" | "outlined" | "ghost";
    size?: "sm" | "md" | "lg";
}

// option are here but I have implemented a general style. but can be used and changed accordingly
const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
};

const variantClasses = {
    filled: "bg-gray-200 dark:bg-gray-800 border border-transparent",
    outlined: "border border-gray-400 dark:border-gray-600",
    ghost: "bg-transparent border border-transparent",
};


const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    loading,
    type = "text",
    variant = "outlined",
    size = "md",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    return (
        <div className="mb-4">
            {label && <label className="block mb-2 text-xl font-thin tracking-wider">{label}</label>}
            <div className="relative ">
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={isPassword && !showPassword ? "password" : "text"}
                    className={`w-full rounded-sm outline-none border-none outline-[1px] outline-gray-950 dark:outline-gray-50 px-3 py-2 text-amber-500 dark:text-purple-800 tracking-wider focus:outline focus:outline-amber-500 dark:focus:outline-purple-500 ${invalid ? "outline-red-500 outline-4" : ""
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${loading ? "cursor-not-allowed bg-amber-500" : ""} ${sizeClasses[size]} ${variantClasses[variant]}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 dark:text-purple-800 tracking-wider hover:underline hover:underline-offset-4"
                    >
                        {showPassword ? 'hide' : 'show'}
                    </button>
                )}
            </div>
            {helperText && !invalid && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-right tracking-wider">{loading ? 'loading...' : helperText}</p>
            )}
            {invalid && errorMessage && (
                <p className="text-sm text-red-500 mt-2 text-right tracking-wider">{errorMessage}</p>
            )}
        </div>
    );
};

export default InputField;
