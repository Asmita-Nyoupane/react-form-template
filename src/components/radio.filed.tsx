
import { TProps } from './input'

const Radio = ({ data, formVal, setFormVal }: TProps) => {
    if (!data.options) return null
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-start flex-col">
                <label className='label'>{data.label}
                    <span className="text-red-500 ml-2">{data.required && "* "}
                    </span>
                </label>
                <div
                    className="grid grid-cols-4 text-xs sm:text-base
                     sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 "
                >
                    {data?.options.map((option) => (
                        <div key={option.value} className="flex">
                            <input
                                className="mr-2"
                                type="radio"
                                id={option.value}
                                name={data.name}
                                value={option.value}
                                required={data.required}
                                checked={formVal === option.value}
                                onChange={(e) => setFormVal(e.target.value)}
                            />

                            <label htmlFor={option.value} className="">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Radio
