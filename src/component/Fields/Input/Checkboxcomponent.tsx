import React, { memo } from "react";
import { RadioTheme, CheckboxTheme, RadioGroupTheme } from "./inputconstants";

export interface RadioCheckOption {
    label: string;
    value: string;
}

interface CheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    disabled?: boolean;
}

const CheckboxBase: React.FC<CheckboxProps> = ({
    label,
    name,
    checked,
    onChange,
    error,
    required,
    hint,
    disabled = false,
}) => {
    return (
        <div className={RadioTheme.DIV}>
            <label className={RadioTheme.LABEL}>
                {label}
                {required && <span className={RadioTheme.REQUIRED}>*</span>}
            </label>
            <div className={RadioTheme.DIV2}>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    className={RadioTheme.INPUTBOX}
                />
                {hint && !error && <p className={RadioTheme.HINT}>{hint}</p>}
            </div>
            {error && <p className={RadioTheme.ERROR}>{error}</p>}
        </div>
    );
};

function areCheckboxPropsEqual(prev: CheckboxProps, next: CheckboxProps): boolean {
    return (
        prev.checked === next.checked &&
        prev.error === next.error &&
        prev.onChange === next.onChange &&
        prev.disabled === next.disabled &&
        prev.label === next.label &&
        prev.required === next.required &&
        prev.hint === next.hint
    );
}

export const Checkbox = memo(CheckboxBase, areCheckboxPropsEqual);
 

interface CheckboxGroupProps {
    label: string;
    name: string;
    value: string[];
    options: RadioCheckOption[];
    onChange: (selected: string[]) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    disabled?: boolean;
}

const CheckboxGroupBase: React.FC<CheckboxGroupProps> = ({
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
    const toggle = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter((v) => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    };

    return (
        <div className={CheckboxTheme.DIV}>
            <label className={CheckboxTheme.LABEL}>
                {label}
                {required && <span className={CheckboxTheme.REQUIRED}>*</span>}
            </label>
            <div className={CheckboxTheme.DIV2}>
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className={`${CheckboxTheme.LABEL2} ${
                            disabled ? CheckboxTheme.LABEL3 : ""
                        }`}
                    >
                        <input
                            type="checkbox"
                            name={name}
                            value={opt.value}
                            checked={value.includes(opt.value)}
                            onChange={() => toggle(opt.value)}
                            disabled={disabled}
                            className={CheckboxTheme.INPUTBOX}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {hint && !error && <p className={CheckboxTheme.HINT}>{hint}</p>}
            {error && <p className={CheckboxTheme.ERROR}>{error}</p>}
        </div>
    );
};

function areCheckboxGroupPropsEqual(prev: CheckboxGroupProps, next: CheckboxGroupProps): boolean {
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

export const CheckboxGroup = memo(CheckboxGroupBase, areCheckboxGroupPropsEqual);
 

interface RadioGroupProps {
    label: string;
    name: string;
    value: string;
    options: RadioCheckOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    disabled?: boolean;
}

const RadioGroupBase: React.FC<RadioGroupProps> = ({
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
    return (
        <div className={RadioGroupTheme.DIV}>
            <label className={RadioGroupTheme.LABEL}>
                {label}
                {required && <span className={RadioGroupTheme.REQUIRED}>*</span>}
            </label>
            <div className={RadioGroupTheme.DIV2}>
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className={`${RadioGroupTheme.LABEL2} ${
                            disabled ? RadioGroupTheme.DISABLED : ""
                        }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={onChange}
                            disabled={disabled}
                            className={RadioGroupTheme.INPUTBOX}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            {hint && !error && <p className={RadioGroupTheme.HINT}>{hint}</p>}
            {error && <p className={RadioGroupTheme.ERROR}>{error}</p>}
        </div>
    );
};

function areRadioGroupPropsEqual(prev: RadioGroupProps, next: RadioGroupProps): boolean {
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

export const RadioGroup = memo(RadioGroupBase, areRadioGroupPropsEqual);