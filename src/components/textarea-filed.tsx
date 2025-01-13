
import { twMerge } from 'tailwind-merge'
import { TProps } from './input'


const TextArea = ({ data, formVal, setFormVal, className }: TProps) => {

    return (
        <div className={twMerge("flex flex-col gap-2 flex-start", className)}>
            <label className='label'>{data.label} <span className="text-red-500 ml-2">{data.required && "* "}
            </span> </label>
            <textarea placeholder={data.placeholder} rows={6} required={data.required} value={formVal} onChange={(e) => setFormVal(e.target.value)} className=" field resize-none " />
        </div>
    )
}

export default TextArea
