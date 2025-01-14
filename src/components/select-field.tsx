import { TProps } from "./input"






const Select = ({ data, formVal, setFormVal, error }: TProps) => {
    if (!data.options) return null


    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.validation?.required && "* "}
            </span></label>

            <select name={data.name} id={data.name} value={formVal} onChange={(e) => setFormVal(e.target.value)} required={data.validation?.required}


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
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default Select
