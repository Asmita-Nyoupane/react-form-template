
import { twMerge } from 'tailwind-merge'
import { TProps } from './input'


const TextArea = ({ data, formVal, setFormVal, className, error }: TProps) => {

    return (
        <div className={twMerge("flex flex-col gap-2 flex-start", className)}>
            <label className='label'>{data.label} <span className="text-red-500 ml-2">{data.validation?.required && "* "}
            </span> </label>
            <textarea placeholder={data.placeholder} rows={6} required={data.validation?.required} value={formVal} onChange={(e) => setFormVal(e.target.value)} className=" field resize-none " />
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default TextArea
