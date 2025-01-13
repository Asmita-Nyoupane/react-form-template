import { TProps } from "./input"





const Select = ({ data, formVal, setFormVal }: TProps) => {
    if (!data.options) return null


    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.required && "* "}
            </span></label>

            <select name={data.name} id={data.name} value={formVal} onChange={(e) => setFormVal(e.target.value)} required={data.required}


                className="field">
                {data.placeholder && (
                    <option value="" disabled>
                        {data.placeholder}
                    </option>
                )}
                {
                    data?.options?.map((option, i) => (

                        <option value={option.value} key={i}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select
