
import { validateField } from "../lib/utility";
import { TProps } from "./input"



const Number = ({ data, formVal, setFormVal, error, setError }: TProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        const validationError = validateField(value, data);
        setError(validationError || "");
        setFormVal(value);
    }
    const handleBlur = () => {
        const validationError = validateField(formVal, data);
        setError(validationError || "");
    };
    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.validation?.required && "* "}
            </span></label>
            <input type={data.type} placeholder={data.placeholder} required={data.validation?.required} value={formVal || ''} onChange={handleChange} className="field " onBlur={handleBlur} />
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default Number
