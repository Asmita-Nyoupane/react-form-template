
import { validateField } from '../lib/utility';
import { TProps } from './input'

const Radio = ({ data, formVal, setFormVal, error, setError }: TProps) => {
    if (!data.options) return null


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormVal(value);
        const validationError = validateField(value, data);
        setError(validationError || "");
    };
    const handleBlur = () => {
        const validationError = validateField(formVal, data);
        setError(validationError || "");
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-start flex-col">
                <label className='label'>{data.label}
                    <span className="text-red-500 ml-2">{data.validation?.required && "* "}
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
                                checked={formVal === option.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <label htmlFor={option.value} className="">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default Radio
