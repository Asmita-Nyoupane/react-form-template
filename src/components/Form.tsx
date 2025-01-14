import React from 'react';
import Input from './input';
import Password from './password-field';
import TextArea from './textarea-field';
import Radio from './radio-field';
import Select from './select-field';
import Date from './date-field';
import File from './file-upload';

import Checkbox from './checkbox';
import Number from './number';
import { TFields } from '../types/global-types';
type TProps = {
    Schema: TFields[];
    formVal: Record<string, string | string[]>;
    fileInputs: Record<string, File | null>;
    updateFormValue: (name: string, value: string | string[]) => void;
    updateFileInput: (name: string, file: File | null) => void;
    onSubmit: () => void;
    errors: Record<string, string>
}

const Form = ({
    Schema,
    formVal,
    fileInputs,
    updateFormValue,
    updateFileInput,
    onSubmit,
    errors,
}: TProps) => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {Schema.map((field, i) => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Input
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'password':
                            return (
                                <Password
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'number':
                            return (
                                <Number
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'textarea':
                            return (
                                <TextArea
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'radio':
                            return (
                                <Radio
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'date':
                            return (
                                <Date
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'select':
                            return (
                                <Select
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'checkbox':
                            return (
                                <Checkbox
                                    key={i}
                                    data={field}
                                    formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)}
                                    error={errors[field.name]}
                                />
                            );
                        case 'file':
                            return (
                                <File
                                    key={i}
                                    data={field}
                                    formVal={fileInputs[field.name]}
                                    setFormVal={(file) => updateFileInput(field.name, file)}
                                    error={errors[field.name]}
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
