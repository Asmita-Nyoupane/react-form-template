import React, { useState } from "react";
import Input from "./input";
import File from "./file-upload";
import Checkbox from "./checkbox";
import Number from "./number";
import { TFields, TUserProfile } from "../types/global-types";
type TProps = {
    Schema: TFields[];
    initialData: TUserProfile;
};

const Form = ({ Schema, initialData }: TProps) => {
    const initial = Schema.reduce((acc, field) => {
        acc[field.name] =
            (initialData as Record<string, any>)?.[field.name] || "";
        return acc;
    }, {} as Record<string, string>)
    const [formVal, setFormVal] = useState(initial);
    const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});
    // State for errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    //   handle form submission
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const values = { ...formVal, ...fileInputs };
        // Validate all fields before submission
        const newErrors: Record<string, string> = {};
        Schema.forEach(field => {
            if (field.validation?.required && !values[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("🚀 ~ handleFormSubmit ~ values:", values);
        alert("✅ Form Submitted Successfully");
        setErrors({});
        setErrors(initial)
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {Schema.map((field, i) => {
                    switch (field.type) {
                        case "text":
                            return (
                                <Input
                                    key={i}
                                    data={field}
                                    formVal={formVal}
                                    setFormVal={setFormVal}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        case "number":
                            return (
                                <Number
                                    key={i}
                                    data={field}
                                    formVal={formVal}
                                    setFormVal={setFormVal}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );

                        case "checkbox":
                            return (
                                <Checkbox
                                    key={i}
                                    data={field}
                                    formVal={formVal}
                                    setFormVal={setFormVal}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        case "file":
                            return (
                                <File
                                    key={i}
                                    data={field}
                                    formVal={fileInputs}
                                    setFormVal={setFileInputs}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
            <div className="flex items-start mt-10">
                <button
                    type="submit"
                    className="rounded   shadow py-2 px-12 bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Form;
