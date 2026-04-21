export const VALIDATION_TYPES = {
    NUMERIC: "numeric",
    ALPHABETIC: "alphabetic",
    ALPHANUMERIC: "alphanumeric",
    EMAIL: "email",
    PASSWORD: "password",
    PHONE: "phone",
    DECIMAL: "decimal",
    CUSTOM_ID: "custom_id",
    URL: "url",
    DATE: "date",
    TIME: "time",
    MONTH: "month",
    WEEK: "week",
    COLOR: "color",
    SEARCH: "search",
    FILE: "file",
    RANGE: "range",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    SELECT: "select",
    MULTI_SELECT: "multi_select",
};

export const REGEX = {
    NUMERIC: /^[0-9]+$/,
    ALPHABETIC: /^[A-Za-z]+$/,
    ALPHANUMERIC: /^[A-Za-z0-9]+$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[0-9]{10}$/,
    DECIMAL: /^[0-9]+(\.[0-9]+)?$/,
    CUSTOM_ID: /^[A-Za-z0-9_-]+$/,
    URL: /^https?:\/\/.+\..+/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
    TIME: /^\d{2}:\d{2}(:\d{2})?$/,
    MONTH: /^\d{4}-\d{2}$/,
    WEEK: /^\d{4}-W\d{2}$/,
    COLOR: /^#[0-9A-Fa-f]{6}$/,
    SEARCH: /^.+$/,
};

export const VALIDATION_MESSAGES = {
    REQUIRED: "This field is required",
    NUMERIC: "Only numbers allowed",
    ALPHABETIC: "Only letters allowed",
    ALPHANUMERIC: "Only letters & numbers allowed",
    EMAIL: "Invalid email format",
    PASSWORD: "Password must be strong",
    PHONE: "Phone must be 10 digits",
    DECIMAL: "Invalid amount",
    CUSTOM_ID: "Invalid ID format",
    URL: "Invalid URL format (must start with http:// or https://)",
    DATE: "Invalid date",
    TIME: "Invalid time",
    MONTH: "Invalid month",
    WEEK: "Invalid week",
    COLOR: "Invalid color",
    SEARCH: "Search field cannot be empty",
    FILE: "Please select a file",
    RANGE: "Invalid range value",
    CHECKBOX: "Please check this field",
    RADIO: "Please select an option",
    SELECT: "Please select an option",
    MULTI_SELECT: "Please select at least one option",
};

export const InputTheme = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    INPUTBOXERROR: "border-red-500 focus:ring-1 focus:ring-red-400",
    INPUTBOXLAYOUT: "border-[#aab7b8] focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]",
    PRIMARY: "border rounded-md px-3 py-1.5 text-[13px] text-[#16191f] outline-none transition-all",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
};

export const RangeTheme = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    SPAN: "ml-2 text-[#0073bb] font-semibold",
    INPUTBOXLAYOUT: "w-full accent-[#0073bb] cursor-pointer",
    Range: "flex justify-between text-[10px] text-[#545b64]",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
}

export const Color = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    BOXLAYOUT: "flex items-center gap-3",
    INPUT: "w-10 h-9 rounded-md border border-[#aab7b8] cursor-pointer p-0.5",
    SPAN: "text-[13px] text-[#16191f] font-mono",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
}

export const File = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    BOXLAYOUT: "flex items-center gap-3",
    INPUT: "w-10 h-9 rounded-md border border-[#aab7b8] cursor-pointer p-0.5",
    PRIMARY: "border rounded-md px-3 py-1.5 text-[13px] text-[#16191f] outline-none transition-all",
    INPUTBOXERROR: "border-red-500 focus:ring-1 focus:ring-red-400",
    INPUTBOXLAYOUT: "border-[#aab7b8] focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]",
    SPAN: "text-[13px] text-[#16191f] font-mono",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
}

export const Drop = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    INPUTBOXERROR: "border-red-500 focus:ring-1 focus:ring-red-400",
    INPUTBOXLAYOUT: "border-[#aab7b8] focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]",
    PRIMARY: "border rounded-md px-3 py-1.5 text-[13px] text-[#16191f] outline-none transition-all",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
    Cursor: "bg-white cursor-pointer appearance-none"
}

export const Multi = {
    DIV: "flex flex-col gap-1 w-full",  
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    INPUTBOXERROR: "border-red-500",
    INPUTBOXERROR2: "border-[#aab7b8]",
    INPUTBOXLAYOUT: "border rounded-md p-1.5 flex flex-col gap-0.5 bg-white",
    DISABLED: "opacity-50 pointer-events-none",
    PRIMARY: "flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-[13px] transition-colors",
    SECONDARY: "bg-[#e8f4fb] text-[#0073bb] font-medium",
    THIRD: "text-[#16191f] hover:bg-[#f0f4f8]",
    INPUT: "w-3.5 h-3.5 accent-[#0073bb]",
    DIV2: "flex flex-wrap gap-1 mt-0.5",
    SPAN: "inline-flex items-center gap-1 bg-[#0073bb] text-white text-[11px] px-2 py-0.5 rounded-full",
    BUTTON: "hover:opacity-70 leading-none",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
}

export const RadioTheme = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    DIV2: "flex items-center gap-2",
    INPUTBOX: "w-4 h-4 accent-[#0073bb] cursor-pointer",
    INPUTBOXERROR: "border-red-500 focus:ring-1 focus:ring-red-400",
    INPUTBOXLAYOUT: "border-[#aab7b8] focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]",
    PRIMARY: "border rounded-md px-3 py-1.5 text-[13px] text-[#16191f] outline-none transition-all",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
};

export const RadioGroupTheme = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    DIV2: "flex flex-col gap-1.5",
    LABEL2: "flex items-center gap-2 text-[13px] text-[#16191f] cursor-pointer",
    DISABLED: "opacity-50 pointer-events-none",
    INPUTBOX: "w-4 h-4 accent-[#0073bb] cursor-pointer",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
};

export const CheckboxTheme = {
    DIV: "flex flex-col gap-1 w-full",
    LABEL: "text-[13px] font-medium text-[#16191f]",
    REQUIRED: "text-red-500 ml-1",
    DIV2: "flex flex-col gap-1.5",
    LABEL2: "flex items-center gap-2 text-[13px] text-[#16191f] cursor-pointer",
    LABEL3: "opacity-50 pointer-events-none",
    INPUTBOX: "w-4 h-4 accent-[#0073bb] cursor-pointer",
    INPUTBOXERROR: "border-red-500 focus:ring-1 focus:ring-red-400",
    INPUTBOXLAYOUT: "border-[#aab7b8] focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]",
    PRIMARY: "border rounded-md px-3 py-1.5 text-[13px] text-[#16191f] outline-none transition-all",
    HINT: "text-[11px] text-[#545b64]",
    ERROR: "text-[11px] text-red-500",
};



export const validateField = (type: string, value: any): string => {
    const skipRequiredCheck = [
        VALIDATION_TYPES.CHECKBOX,
        VALIDATION_TYPES.RANGE,
        VALIDATION_TYPES.COLOR,
        VALIDATION_TYPES.FILE,
    ];

    if (!skipRequiredCheck.includes(type) && !value) return VALIDATION_MESSAGES.REQUIRED;

    switch (type) {
        case VALIDATION_TYPES.NUMERIC:
            return REGEX.NUMERIC.test(value) ? "" : VALIDATION_MESSAGES.NUMERIC;

        case VALIDATION_TYPES.ALPHABETIC:
            return REGEX.ALPHABETIC.test(value) ? "" : VALIDATION_MESSAGES.ALPHABETIC;

        case VALIDATION_TYPES.ALPHANUMERIC:
            return REGEX.ALPHANUMERIC.test(value) ? "" : VALIDATION_MESSAGES.ALPHANUMERIC;

        case VALIDATION_TYPES.EMAIL:
            return REGEX.EMAIL.test(value) ? "" : VALIDATION_MESSAGES.EMAIL;

        case VALIDATION_TYPES.PHONE:
            return REGEX.PHONE.test(value) ? "" : VALIDATION_MESSAGES.PHONE;

        case VALIDATION_TYPES.DECIMAL:
            return REGEX.DECIMAL.test(value) ? "" : VALIDATION_MESSAGES.DECIMAL;

        case VALIDATION_TYPES.CUSTOM_ID:
            return REGEX.CUSTOM_ID.test(value) ? "" : VALIDATION_MESSAGES.CUSTOM_ID;

        case VALIDATION_TYPES.URL:
            return REGEX.URL.test(value) ? "" : VALIDATION_MESSAGES.URL;

        case VALIDATION_TYPES.DATE:
            return value ? "" : VALIDATION_MESSAGES.DATE;

        case VALIDATION_TYPES.TIME:
            return value ? "" : VALIDATION_MESSAGES.TIME;

        case VALIDATION_TYPES.MONTH:
            return value ? "" : VALIDATION_MESSAGES.MONTH;

        case VALIDATION_TYPES.WEEK:
            return value ? "" : VALIDATION_MESSAGES.WEEK;

        case VALIDATION_TYPES.COLOR:
            return REGEX.COLOR.test(value) ? "" : VALIDATION_MESSAGES.COLOR;

        case VALIDATION_TYPES.SEARCH:
            return value.trim() ? "" : VALIDATION_MESSAGES.SEARCH;

        case VALIDATION_TYPES.FILE:
            return value ? "" : VALIDATION_MESSAGES.FILE;

        case VALIDATION_TYPES.RANGE:
            return value !== undefined && value !== "" ? "" : VALIDATION_MESSAGES.RANGE;

        case VALIDATION_TYPES.CHECKBOX:
            return value === true || value === "true" ? "" : VALIDATION_MESSAGES.CHECKBOX;

        case VALIDATION_TYPES.RADIO:
            return value ? "" : VALIDATION_MESSAGES.RADIO;

        case VALIDATION_TYPES.SELECT:
            return value ? "" : VALIDATION_MESSAGES.SELECT;

        case VALIDATION_TYPES.MULTI_SELECT:
            return Array.isArray(value) && value.length > 0 ? "" : VALIDATION_MESSAGES.MULTI_SELECT;
  
        default:
            return "";
    }
};