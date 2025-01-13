import { TFields } from "../App"

export type TProps = {
    data: TFields,
    formVal: string | string[],
    setFormVal: (str: string) => void
    className?: string
}


const Input = ({ data, formVal, setFormVal }: TProps) => {
    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.required && "* "}
            </span></label>
            <input type={data.type == 'email' ? "email" : (data.type === "tel" ? "tel" : "text")} placeholder={data.placeholder} required={data.required} value={formVal} onChange={(e) => setFormVal(e.target.value)} className="field " />
        </div>
    )
}

export default Input
