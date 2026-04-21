import { useState, useCallback, useRef } from "react";
import { Dropdown, MultiSelect } from "../../component/Fields/Input/Dropdowncomponent";
import { validateField, VALIDATION_TYPES } from "../../component/Fields/Input/inputconstants";
 
const countryOptions = [
    { label: "India",          value: "in" },
    { label: "United States",  value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Germany",        value: "de" },
    { label: "Australia",      value: "au" },
];

const roleOptions = [
    { label: "Admin",     value: "admin" },
    { label: "Editor",    value: "editor" },
    { label: "Viewer",    value: "viewer" },
    { label: "Developer", value: "developer" },
    { label: "Manager",   value: "manager" },
];

const skillOptions = [
    { label: "React",      value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "Node.js",    value: "nodejs" },
    { label: "Python",     value: "python" },
    { label: "GraphQL",    value: "graphql" },
    { label: "AWS",        value: "aws" },
];

const languageOptions = [
    { label: "English", value: "en" },
    { label: "Tamil",   value: "ta" },
    { label: "Hindi",   value: "hi" },
    { label: "French",  value: "fr" },
];

const initialForm = {
    country: "",
    role: "",
    skills: [] as string[],
    languages: [] as string[],
};

type FormState = typeof initialForm;

function DropdownPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
    const selectHandlersRef = useRef<Record<string, (e: React.ChangeEvent<HTMLSelectElement>) => void>>({});

    const getSelectHandler = useCallback((name: string) => {
        if (!selectHandlersRef.current[name]) {
            selectHandlersRef.current[name] = (e: React.ChangeEvent<HTMLSelectElement>) => {
                const value = e.target.value;
                setForm((prev) => ({ ...prev, [name]: value }));
                const err = validateField(VALIDATION_TYPES.SELECT, value);
                setErrors((prev) => ({ ...prev, [name]: err }));
            };
        }
        return selectHandlersRef.current[name];
    }, []);
 
    const multiHandlersRef = useRef<Record<string, (selected: string[]) => void>>({});

    const getMultiSelectHandler = useCallback((name: string) => {
        if (!multiHandlersRef.current[name]) {
            multiHandlersRef.current[name] = (value: string[]) => {
                setForm((prev) => ({ ...prev, [name]: value }));
                const err = validateField(VALIDATION_TYPES.MULTI_SELECT, value);
                setErrors((prev) => ({ ...prev, [name]: err }));
            };
        }
        return multiHandlersRef.current[name];
    }, []);

    const handleSubmit = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        let hasError = false;

        const countryErr = validateField(VALIDATION_TYPES.SELECT, form.country);
        if (countryErr) { hasError = true; newErrors["country"] = countryErr; }

        const roleErr = validateField(VALIDATION_TYPES.SELECT, form.role);
        if (roleErr) { hasError = true; newErrors["role"] = roleErr; }

        const skillsErr = validateField(VALIDATION_TYPES.MULTI_SELECT, form.skills);
        if (skillsErr) { hasError = true; newErrors["skills"] = skillsErr; }

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
            <h2 className="text-[18px] font-semibold text-[#16191f] mb-6">Dropdown & Select</h2>

            <div className="mb-4">
                <Dropdown
                    label="Country"
                    name="country"
                    value={form.country}
                    options={countryOptions}
                    onChange={getSelectHandler("country")}
                    error={errors["country"]}
                    required
                    hint="Select your country of residence"
                />
            </div>

            <div className="mb-4">
                <Dropdown
                    label="Role"
                    name="role"
                    value={form.role}
                    options={roleOptions}
                    onChange={getSelectHandler("role")}
                    error={errors["role"]}
                    required
                    placeholder="Choose a role"
                />
            </div>

            <div className="mb-4">
                <Dropdown
                    label="Disabled Dropdown"
                    name="disabled_demo"
                    value=""
                    options={countryOptions}
                    onChange={getSelectHandler("disabled_demo")}
                    disabled
                    hint="This dropdown is disabled"
                />
            </div>

            <div className="mb-4">
                <MultiSelect
                    label="Skills"
                    name="skills"
                    value={form.skills}
                    options={skillOptions}
                    onChange={getMultiSelectHandler("skills")}
                    error={errors["skills"]}
                    required
                    hint="Select all that apply"
                />
            </div>

            <div className="mb-4">
                <MultiSelect
                    label="Preferred Languages (optional)"
                    name="languages"
                    value={form.languages}
                    options={languageOptions}
                    onChange={getMultiSelectHandler("languages")}
                    error={errors["languages"]}
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

export default DropdownPage;