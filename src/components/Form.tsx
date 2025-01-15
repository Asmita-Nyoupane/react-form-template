import React, { useState } from "react";
import Input from "./input";
import File from "./file-upload";
import Checkbox from "./checkbox";
import Number from "./number";
import { TFields, TUserProfile } from "../types/global-types";
import Radio from "./radio-field";
import { validateField } from "../lib/utility";
type TProps = {
    Schema: TFields[];
    initialData: TUserProfile;
};

const Form = ({ Schema, initialData }: TProps) => {
    const initial = Schema.reduce((acc, field) => {
        acc[field.name] =
            (initialData as Record<string, any>)?.[field.name] || "";
        return acc;
    }, {} as Record<string, any>)
    const [formVal, setFormVal] = useState(initial);

    // State for errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // setter function
    const updateFormValue = (name: string, value: string | string[] | File) => {
        setFormVal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    //   handle form submission
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        let hasError = false;
        Schema.forEach((field) => {
            const error = validateField(formVal[field.name], field);
            if (error) {
                hasError = true;
                setErrors((prev) => ({ ...prev, [field.name]: error }));
            }
        });

        if (!hasError) {
            console.log("🚀 ~ handleFormSubmit ~ values:", formVal);
            alert("✅ Form Submitted Successfully");
            setErrors({});
            setFormVal(initial);
        }
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
                                    formVal={formVal[field.name]}
                                    setFormVal={(value: string) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        case "number":
                            return (
                                <Number
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value: string) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );

                        case "checkbox":
                            return (
                                <Checkbox
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value: string[]) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        case "radio":
                            return (
                                <Radio
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value: string) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                    setError={(error: string) => setErrors(prev => ({ ...prev, [field.name]: error }))}
                                />
                            );
                        case "file":
                            return (
                                <File
                                    key={i}
                                    data={field}
                                    formVal={formVal as File | null}
                                    setFormVal={(value: File) => updateFormValue(field.name, value)}
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
