import { TProps } from "./input"

const Date = ({ data, formVal, setFormVal }: TProps) => {
    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.required && "* "}
            </span></label>
            <input type={data.type} placeholder={data.placeholder} required={data.required} value={formVal} onChange={(e) => setFormVal(e.target.value)} className="field " />
        </div>
    )
}

export default Date
