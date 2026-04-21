import React, { memo } from "react";
import { InputTheme, RangeTheme, Color, File } from "./inputconstants";

interface InputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    hint?: string;
    min?: number;
    max?: number;
    step?: number;
    accept?: string;
}

const InputField: React.FC<InputProps> = ({
    label,
    name,
    type,
    value,
    placeholder,
    onChange,
    error,
    required,
    hint,
    min,
    max,
    step,
    accept,
}) => {

    if (type === "range") {
        return (
            <div className={RangeTheme.DIV}>
                <label className={RangeTheme.LABEL}>
                    {label}
                    {required && <span className={RangeTheme.REQUIRED}>*</span>}
                    <span className={RangeTheme.SPAN}>{value}</span>
                </label>
                <input
                    type="range"
                    name={name}
                    value={value}
                    min={min ?? 0}
                    max={max ?? 100}
                    step={step ?? 1}
                    onChange={onChange}
                    className={RangeTheme.INPUTBOXLAYOUT}
                />
                <div className={RangeTheme.Range}>
                    <span>{min ?? 0}</span>
                    <span>{max ?? 100}</span>
                </div>
                {hint && !error && <p className={RangeTheme.HINT}>{hint}</p>}
                {error && <p className={RangeTheme.ERROR}>{error}</p>}
            </div>
        );
    }

    if (type === "color") {
        return (
            <div className={Color.DIV}>
                <label className={Color.LABEL}>
                    {label}
                    {required && <span className={Color.REQUIRED}>*</span>}
                </label>
                <div className={Color.BOXLAYOUT}>
                    <input
                        type="color"
                        name={name}
                        value={value || "#0073bb"}
                        onChange={onChange}
                        className={Color.INPUT}
                    />
                    <span className={Color.SPAN}>{value || "#0073bb"}</span>
                </div>
                {hint && !error && <p className={Color.HINT}>{hint}</p>}
                {error && <p className={Color.ERROR}>{error}</p>}
            </div>
        );
    }

    if (type === "file") {
        return (
            <div className={File.DIV}>
                <label className={File.LABEL}>
                    {label}
                    {required && <span className={File.REQUIRED}>*</span>}
                </label>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onChange}
                    className={`${File.PRIMARY} ${
                        error ? File.INPUTBOXERROR : File.INPUTBOXLAYOUT
                    } file:mr-3 file:py-0.5 file:px-3 file:rounded file:border-0 file:text-[12px] file:bg-[#f0f4f8] file:text-[#16191f] cursor-pointer`}
                />
                {hint && !error && <p className={File.HINT}>{hint}</p>}
                {error && <p className={File.ERROR}>{error}</p>}
            </div>
        );
    }

    if (type === "hidden") {
        return <input type="hidden" name={name} value={value} />;
    }

    return (
        <div className={InputTheme.DIV}>
            <label className={InputTheme.LABEL}>
                {label}
                {required && <span className={InputTheme.REQUIRED}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                className={`${InputTheme.PRIMARY} ${
                    error ? InputTheme.INPUTBOXERROR : InputTheme.INPUTBOXLAYOUT
                }`}
            />
            {hint && !error && <p className={InputTheme.HINT}>{hint}</p>}
            {error && <p className={InputTheme.ERROR}>{error}</p>}
        </div>
    );
};
 
function arePropsEqual(prev: InputProps, next: InputProps): boolean {
    return (
        prev.value === next.value &&
        prev.error === next.error &&
        prev.type === next.type &&
        prev.onChange === next.onChange &&
        prev.label === next.label &&
        prev.placeholder === next.placeholder &&
        prev.required === next.required &&
        prev.hint === next.hint &&
        prev.min === next.min &&
        prev.max === next.max &&
        prev.step === next.step &&
        prev.accept === next.accept
    );
}

export default memo(InputField, arePropsEqual);