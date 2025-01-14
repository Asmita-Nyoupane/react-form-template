import { TProps } from "./input"



const Number = ({ data, formVal, setFormVal, error }: TProps) => {

    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.validation?.required && "* "}
            </span></label>
            <input type={data.type} placeholder={data.placeholder} required={data.validation?.required} value={formVal} onChange={(e) => setFormVal(e.target.value)} className="field " />
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default Number
