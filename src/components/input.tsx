
import { TFields } from "../types/global-types"

export type TProps = {
    data: TFields,
    formVal: { [key: string]: string },
    setFormVal: (val: { [key: string]: string }) => void
    className?: string,
    error?: string,
    setError: (error: string) => void

}


const Input = ({ data, formVal, setFormVal, error, setError }: TProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormVal({
            ...formVal, [data.name]: e.target.value
        });
        setError("")
    }


    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.validation?.required && "* "}
            </span></label>
            <input type={data.type} placeholder={data.placeholder} required={data.validation?.required} value={formVal[data.name] || ''} onChange={handleChange} className="field " onBlur={() => handleBlur(formVal, setError, data)} />
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default Input

// Handle blur event for validation
export const handleBlur = (formVal: { [key: string]: string | string[] }, setError: (error: string) => void, data: TFields) => {
    const value = Array.isArray(formVal[data.name]) ? formVal[data.name][0] : formVal[data.name] || "";


    if (data.validation?.required && !value) {
        setError(`${data.label} is required`);
        return;
    }

    // check for number
    if (data.type === "number") {
        const numberVal = parseInt(value as string, 10);
        if (data.validation?.min && numberVal < data.validation.min) {
            setError(`${data.label} must be at least ${data.validation.min}`);
            return;
        }
        if (data.validation?.max && numberVal > data.validation.max) {
            setError(`${data.label} must not exceed ${data.validation.max}`);
            return;
        }
    }
    // Check for minimum length
    if (data.validation?.min && value.length < data.validation.min) {
        setError(
            `${data.label} must be at least ${data.validation.min} characters`
        );
        return;
    }

    // Check for maximum length
    if (data.validation?.max && value.length > data.validation.max) {
        setError(
            `${data.label} must not exceed ${data.validation.max} characters`
        );
        return;
    }

    // Check for pattern 
    if (data.validation?.pattern && !new RegExp(data.validation.pattern).test(value as string)) {
        setError(
            `${data.label} is invalid`
        );
        return;
    }

    setError("");
};