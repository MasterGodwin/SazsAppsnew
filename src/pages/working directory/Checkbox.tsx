import { useState, useCallback, useRef } from "react";
import {
    Checkbox,
    CheckboxGroup,
    RadioGroup,
} from "../../component/Fields/Input/Checkboxcomponent";
import { validateField, VALIDATION_TYPES } from "../../component/Fields/Input/inputconstants";
 
const interestOptions = [
    { label: "Frontend Development", value: "frontend" },
    { label: "Backend Development",  value: "backend" },
    { label: "UI/UX Design",         value: "design" },
    { label: "DevOps / Cloud",       value: "devops" },
    { label: "Data & ML",            value: "data" },
];

const notifyOptions = [
    { label: "Email",  value: "email" },
    { label: "SMS",    value: "sms" },
    { label: "In-App", value: "inapp" },
    { label: "Push",   value: "push" },
];

const genderOptions = [
    { label: "Male",              value: "male" },
    { label: "Female",            value: "female" },
    { label: "Prefer not to say", value: "other" },
];

const experienceOptions = [
    { label: "Beginner (0-1 yr)",     value: "beginner" },
    { label: "Intermediate (1-3 yr)", value: "intermediate" },
    { label: "Senior (3-5 yr)",       value: "senior" },
    { label: "Expert (5+ yr)",        value: "expert" },
];

const initialForm = {
    terms: false,
    newsletter: false,
    gender: "",
    experience: "",
    interests: [] as string[],
    notify: [] as string[],
};

type FormState = typeof initialForm;

function CheckboxPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
    const checkboxHandlersRef = useRef<Record<string, (checked: boolean) => void>>({});

    const getCheckboxHandler = useCallback((name: string, required = false) => {
        const key = `${name}_${required}`;
        if (!checkboxHandlersRef.current[key]) {
            checkboxHandlersRef.current[key] = (checked: boolean) => {
                setForm((prev) => ({ ...prev, [name]: checked }));
                if (required) {
                    const err = validateField(VALIDATION_TYPES.CHECKBOX, checked);
                    setErrors((prev) => ({ ...prev, [name]: err }));
                }
            };
        }
        return checkboxHandlersRef.current[key];
    }, []); 

    const radioHandlersRef = useRef<Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>>({});

    const getRadioHandler = useCallback((name: string) => {
        if (!radioHandlersRef.current[name]) {
            radioHandlersRef.current[name] = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setForm((prev) => ({ ...prev, [name]: value }));
                const err = validateField(VALIDATION_TYPES.RADIO, value);
                setErrors((prev) => ({ ...prev, [name]: err }));
            };
        }
        return radioHandlersRef.current[name];
    }, []);
 
    const groupHandlersRef = useRef<Record<string, (value: string[]) => void>>({});

    const getGroupHandler = useCallback((name: string) => {
        if (!groupHandlersRef.current[name]) {
            groupHandlersRef.current[name] = (value: string[]) => {
                setForm((prev) => ({ ...prev, [name]: value }));
            };
        }
        return groupHandlersRef.current[name];
    }, []);

    const handleSubmit = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        let hasError = false;

        const termsErr = validateField(VALIDATION_TYPES.CHECKBOX, form.terms);
        if (termsErr) { hasError = true; newErrors["terms"] = termsErr; }

        const genderErr = validateField(VALIDATION_TYPES.RADIO, form.gender);
        if (genderErr) { hasError = true; newErrors["gender"] = genderErr; }

        const expErr = validateField(VALIDATION_TYPES.RADIO, form.experience);
        if (expErr) { hasError = true; newErrors["experience"] = expErr; }

        setErrors(newErrors);
        if (hasError) { console.log("Validation failed"); return; }
        console.log("Form Submitted:", form);
    }, [form]);

    const handleReset = useCallback(() => {
        setForm(initialForm);
        setErrors({});
    }, []);

    return (
        <div className="p-6 max-w-lg">
            <h2 className="text-[18px] font-semibold text-[#16191f] mb-6">Checkbox & Radio</h2>

            <div className="mb-4">
                <Checkbox
                    label="Accept Terms & Conditions"
                    name="terms"
                    checked={form.terms}
                    onChange={getCheckboxHandler("terms", true)}
                    error={errors["terms"]}
                    required
                    hint="You must accept to proceed"
                />
            </div>

            <div className="mb-4">
                <Checkbox
                    label="Subscribe to Newsletter"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={getCheckboxHandler("newsletter")}
                    hint="We'll send you updates occasionally"
                />
            </div>

            <div className="mb-4">
                <Checkbox
                    label="Disabled Checkbox"
                    name="disabled_demo"
                    checked={false}
                    onChange={getCheckboxHandler("disabled_demo")}
                    disabled
                    hint="This option is not available"
                />
            </div>

            <div className="mb-4">
                <CheckboxGroup
                    label="Areas of Interest"
                    name="interests"
                    value={form.interests}
                    options={interestOptions}
                    onChange={getGroupHandler("interests")}
                    hint="Select all that apply (optional)"
                />
            </div>

            <div className="mb-4">
                <CheckboxGroup
                    label="Notification Preferences"
                    name="notify"
                    value={form.notify}
                    options={notifyOptions}
                    onChange={getGroupHandler("notify")}
                    error={errors["notify"]}
                />
            </div>

            <div className="mb-4">
                <RadioGroup
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    options={genderOptions}
                    onChange={getRadioHandler("gender")}
                    error={errors["gender"]}
                    required
                />
            </div>

            <div className="mb-4">
                <RadioGroup
                    label="Experience Level"
                    name="experience"
                    value={form.experience}
                    options={experienceOptions}
                    onChange={getRadioHandler("experience")}
                    error={errors["experience"]}
                    required
                />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
            >
                Submit
            </button>

            <div className="flex gap-3 mt-3">
                <input
                    type="reset"
                    value="Reset"
                    onClick={handleReset}
                    className="flex-1 border border-red-300 rounded-md px-3 py-1.5 text-[13px] text-red-500 cursor-pointer hover:bg-red-50"
                />
            </div>
        </div>
    );
}

export default CheckboxPage;