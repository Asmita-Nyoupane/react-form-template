import { useState } from "react"
import { TFields } from "../App"
import Input from "./input"
import Password from "./password-field"
import TextArea from "./textarea-filed"
import Radio from "./radio.filed"
import Select from "./select-field"
import Date from "./date-field"
import MultipleSelect from "./multiple-select"
import File from "./file-upload"




const Form = ({ Schema }: {
    Schema: TFields[]
}) => {
    const [formVal, setFormVal] = useState(
        Schema.reduce((acc, field) => {
            acc[field.name] = field.type === 'select' && field.multiple ? [] : "";
            return acc;
        }, {} as Record<string, string | string[]>)
    );
    const [loading, setLoading] = useState(false)
    const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});
    const updateFormValue = (name: string, value: string | string[]) => {
        setFormVal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const updateFileInput = (name: string, file: File | null) => {
        setFileInputs((prev) => ({
            ...prev,
            [name]: file,
        }));
    };
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();
        // Combine formVal and fileInputs before submitting
        const finalValues = { ...formVal, ...fileInputs };

        setTimeout(() => {
            console.log(finalValues);
            setLoading(false);
        }, 2000);
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="  py-10  grid grid-cols-1 lg:grid-cols-2 gap-10">

                {Schema?.map((field, i) =>
                    (field.type === 'text' || field.type === 'email' || field.type === 'tel') ? (
                        <Input data={field} key={i} formVal={formVal[field.name]} setFormVal={(value) => updateFormValue(field.name, value)} />
                    ) : (
                        field.type === 'password' ? <Password data={field} key={i} formVal={formVal[field.name]}
                            setFormVal={(value) => updateFormValue(field.name, value)} /> : (
                            field.type === 'textarea' ? <TextArea data={field} key={i} formVal={formVal[field.name]}
                                setFormVal={(value) => updateFormValue(field.name, value)} className="col-span-2 " /> : (
                                field.type === 'radio' ? <Radio data={field} key={i} formVal={formVal[field.name]}
                                    setFormVal={(value) => updateFormValue(field.name, value)} /> : (
                                    field.type === 'date' ? <Date data={field} key={i} formVal={formVal[field.name]}
                                        setFormVal={(value) => updateFormValue(field.name, value)} /> :
                                        ((field.type === 'select' && field.multiple) ? <MultipleSelect data={field}
                                            key={i}
                                            formVal={formVal[field.name]}
                                            setFormVal={(value) => updateFormValue(field.name, value)} />
                                            : (
                                                field.type === 'select' ? <Select data={field} key={i} formVal={formVal[field.name]}
                                                    setFormVal={(value) => updateFormValue(field.name, value)} /> : (field.type === 'file' ? <File
                                                        key={i}
                                                        data={field}
                                                        formVal={fileInputs[field.name]}
                                                        setFormVal={(file) => updateFileInput(field.name, file)}
                                                    /> : null)
                                            ))
                                )
                            )
                        )
                    )
                )
                }
            </div>

            <div className="flex items-start">

                <button disabled={loading} type="submit" className=" rounded shadow py-3 px-6  bg-blue-500 hover:bg-blue-600 text-white">{
                    loading ? "Submiting.." : "Submit"}</button>
            </div>
        </form>
    )
}

export default Form
