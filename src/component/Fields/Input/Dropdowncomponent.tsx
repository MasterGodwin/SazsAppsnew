import React, { memo } from "react";
import { Drop } from "./inputconstants";
import { Multi } from "./inputconstants";

export interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    label: string;
    name: string;
    value: string;
    options: DropdownOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    placeholder?: string;
    disabled?: boolean;
}

const DropdownBase: React.FC<DropdownProps> = ({
    label,
    name,
    value,
    options,
    onChange,
    error,
    required,
    hint,
    placeholder = "Select an option",
    disabled = false,
}) => {
    return (
        <div className={Drop.DIV}>
            <label className={Drop.LABEL}>
                {label}
                {required && <span className={Drop.REQUIRED}>*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${Drop.PRIMARY} ${error ? Drop.INPUTBOXERROR : Drop.INPUTBOXLAYOUT} ${Drop.Cursor}`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {hint && !error && <p className={Drop.HINT}>{hint}</p>}
            {error && <p className={Drop.ERROR}>{error}</p>}
        </div>
    );
};
 
function areDropdownPropsEqual(prev: DropdownProps, next: DropdownProps): boolean {
    return (
        prev.value === next.value &&
        prev.error === next.error &&
        prev.onChange === next.onChange &&
        prev.options === next.options &&
        prev.disabled === next.disabled &&
        prev.label === next.label &&
        prev.placeholder === next.placeholder &&
        prev.required === next.required &&
        prev.hint === next.hint
    );
}

export const Dropdown = memo(DropdownBase, areDropdownPropsEqual); 

interface MultiSelectProps {
    label: string;
    name: string;
    value: string[];
    options: DropdownOption[];
    onChange: (selected: string[]) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    disabled?: boolean;
}

const MultiSelectBase: React.FC<MultiSelectProps> = ({
    label,
    name,
    value,
    options,
    onChange,
    error,
    required,
    hint,
    disabled = false,
}) => {
    const toggleOption = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    };

    return (
        <div className={Multi.DIV}>
            <label className={Multi.LABEL}>
                {label}
                {required && <span className={Multi.REQUIRED}>*</span>}
            </label>

            <input type="hidden" name={name} value={value.join(",")} />

            <div
                className={`${Multi.INPUTBOXLAYOUT} ${
                    error ? Multi.INPUTBOXERROR : Multi.INPUTBOXERROR2
                } ${disabled ? Multi.DISABLED : ""}`}
            >
                {options.map((opt) => {
                    const isSelected = value.includes(opt.value);
                    return (
                        <label
                            key={opt.value}
                            className={`${Multi.PRIMARY} ${
                                isSelected ? Multi.SECONDARY : Multi.THIRD
                            }`}
                        >
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={isSelected}
                                onChange={() => toggleOption(opt.value)}
                                className={Multi.INPUT}
                            />
                            {opt.label}
                        </label>
                    );
                })}
            </div>

            {value.length > 0 && (
                <div className={Multi.DIV2}>
                    {value.map((v) => {
                        const optLabel = options.find((o) => o.value === v)?.label ?? v;
                        return (
                            <span key={v} className={Multi.SPAN}>
                                {optLabel}
                                <button
                                    type="button"
                                    onClick={() => toggleOption(v)}
                                    className={Multi.BUTTON}
                                >
                                    ×
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            {hint && !error && <p className={Multi.HINT}>{hint}</p>}
            {error && <p className={Multi.ERROR}>{error}</p>}
        </div>
    );
};

function areMultiSelectPropsEqual(prev: MultiSelectProps, next: MultiSelectProps): boolean {
    return (
        prev.value === next.value &&
        prev.error === next.error &&
        prev.onChange === next.onChange &&
        prev.options === next.options &&
        prev.disabled === next.disabled &&
        prev.label === next.label &&
        prev.required === next.required &&
        prev.hint === next.hint
    );
}

export const MultiSelect = memo(MultiSelectBase, areMultiSelectPropsEqual);