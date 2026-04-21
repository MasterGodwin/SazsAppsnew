import { useState, useCallback, useReducer, useRef } from "react";
import { LucideEyeOff, LucideEye } from "lucide-react";
import InputField from "../../component/Fields/Input/Inputcomponent";
import { validateField, VALIDATION_TYPES } from "../../component/Fields/Input/inputconstants";

const initialForm = {
    email: "",
    phone: "",
    decimal: "",
    password: "",
    alphabetic: "",
    alphanumeric: "",
    numeric: "",
    customer_id: "",
    url: "",
    search: "",
    date: "",
    time: "",
    datetime_local: "",
    month: "",
    week: "",
    color: "#0073bb",
    range: "50",
    file: "",
    hidden: "token_abc123",
};

type FormState = typeof initialForm;
type FormAction = { name: string; value: string };

function formReducer(state: FormState, action: FormAction): FormState {
    return { ...state, [action.name]: action.value };
} 
const STATIC_FIELDS: {
    label: string;
    name: string;
    type: string;
    validationType: string;
    min?: number;
    max?: number;
    step?: number;
    accept?: string;
}[] = [
    { label: "Email",          name: "email",          type: "email",          validationType: VALIDATION_TYPES.EMAIL },
    { label: "Phone Number",   name: "phone",          type: "tel",            validationType: VALIDATION_TYPES.PHONE },
    { label: "Decimal Number", name: "decimal",        type: "number",         validationType: VALIDATION_TYPES.DECIMAL },
    { label: "Alphabetic",     name: "alphabetic",     type: "text",           validationType: VALIDATION_TYPES.ALPHABETIC },
    { label: "Alphanumeric",   name: "alphanumeric",   type: "text",           validationType: VALIDATION_TYPES.ALPHANUMERIC },
    { label: "Numeric",        name: "numeric",        type: "number",         validationType: VALIDATION_TYPES.NUMERIC },
    { label: "Customer ID",    name: "customer_id",    type: "text",           validationType: VALIDATION_TYPES.CUSTOM_ID },
    { label: "Search",         name: "search",         type: "search",         validationType: VALIDATION_TYPES.SEARCH },
    { label: "URL",            name: "url",            type: "url",            validationType: VALIDATION_TYPES.URL },
    { label: "Date",           name: "date",           type: "date",           validationType: VALIDATION_TYPES.DATE },
    { label: "Time",           name: "time",           type: "time",           validationType: VALIDATION_TYPES.TIME },
    { label: "Date & Time",    name: "datetime_local", type: "datetime-local", validationType: VALIDATION_TYPES.DATE },
    { label: "Month",          name: "month",          type: "month",          validationType: VALIDATION_TYPES.MONTH },
    { label: "Week",           name: "week",           type: "week",           validationType: VALIDATION_TYPES.WEEK },
    { label: "Range",          name: "range",          type: "range",          validationType: VALIDATION_TYPES.RANGE, min: 0, max: 100, step: 1 },
    { label: "Color",          name: "color",          type: "color",          validationType: VALIDATION_TYPES.COLOR },
    { label: "File Upload",    name: "file",           type: "file",           validationType: VALIDATION_TYPES.FILE, accept: "*/*" },
];

function InputFieldsPage() {
    const [form, dispatch] = useReducer(formReducer, initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);
 
    const handleChange = useCallback((name: string, value: string, validationType: string) => {
        dispatch({ name, value });
        const err = validateField(validationType, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
    }, []);
 
    const handlersRef = useRef<Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>>({});

    const getChangeHandler = useCallback(
        (name: string, validationType: string) => {
            const key = `${name}__${validationType}`;
            if (!handlersRef.current[key]) {
                handlersRef.current[key] = (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(name, e.target.value, validationType);
            }
            return handlersRef.current[key];
        },
        [handleChange]
    );
 
    const fileHandlersRef = useRef<Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>>({});

    const getFileHandler = useCallback(
        (name: string, validationType: string) => {
            if (!fileHandlersRef.current[name]) {
                fileHandlersRef.current[name] = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const fileName = e.target.files?.[0]?.name ?? "";
                    dispatch({ name, value: fileName });
                    const err = validateField(validationType, fileName);
                    setErrors((prev) => ({ ...prev, [name]: err }));
                };
            }
            return fileHandlersRef.current[name];
        },
        []
    );
 
    const passwordHandlerRef = useRef<((e: React.ChangeEvent<HTMLInputElement>) => void) | null>(null);
    if (!passwordHandlerRef.current) {
        passwordHandlerRef.current = (e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("password", e.target.value, VALIDATION_TYPES.PASSWORD);
    }

    const handleSubmit = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        let hasError = false;
 
        STATIC_FIELDS.forEach((field) => {
            const value = form[field.name as keyof FormState];
            const err = validateField(field.validationType, value);
            if (err) {
                hasError = true;
                newErrors[field.name] = err;
            }
        });
 
        const passwordErr = validateField(VALIDATION_TYPES.PASSWORD, form.password);
        if (passwordErr) {
            hasError = true;
            newErrors.password = passwordErr;
        }

        setErrors(newErrors);
        if (hasError) return;

        console.log("Form Submitted:", form);
    }, [form]);

    const handleReset = useCallback(() => {
        Object.keys(initialForm).forEach((key) => {
            dispatch({ name: key, value: initialForm[key as keyof FormState] });
        });
        setErrors({});
    }, []);

    return (
        <div className="p-6 max-w-lg">
            <h2 className="text-[18px] font-semibold mb-6">Input Fields</h2>
 
            {STATIC_FIELDS.map((field) => (
                <div key={field.name} className="mb-4">
                    {field.type === "file" ? (
                        <InputField
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={form[field.name as keyof FormState]}
                            onChange={getFileHandler(field.name, field.validationType)}
                            error={errors[field.name]}
                            required
                            accept={field.accept}
                        />
                    ) : (
                        <InputField
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={form[field.name as keyof FormState]}
                            placeholder={`Enter ${field.label}`}
                            onChange={getChangeHandler(field.name, field.validationType)}
                            error={errors[field.name]}
                            required
                            min={field.min}
                            max={field.max}
                            step={field.step}
                        />
                    )}
                </div>
            ))} 
            
            <div className="mb-4 relative">
                <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    placeholder="Enter Password"
                    onChange={passwordHandlerRef.current}
                    error={errors.password}
                    required
                />
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-7"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                </button>
            </div>

            <InputField
                label="Hidden"
                name="hidden"
                type="hidden"
                value={form.hidden}
                onChange={() => {}}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                Submit
            </button>

            <input
                type="reset"
                value="Reset"
                onClick={handleReset}
                className="mt-3 w-full border p-2"
            />
        </div>
    );
}

export default InputFieldsPage;