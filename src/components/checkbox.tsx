import { validateField } from "../lib/utility";
import { TFields } from "../types/global-types";

type TProps = {
    data: TFields,
    formVal: string[],
    setFormVal: (str: string[]) => void
    className?: string,
    error?: string,
    setError: (error: string) => void
}

const Checkbox = ({ data, formVal, setFormVal, error, setError }: TProps) => {

    // check if formVal is an array to assign it on selectedValues
    const selectedValues: string[] = Array.isArray(formVal) ? formVal : [];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const validationError = validateField(value, data);
        setError(validationError || "");
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((val) => val !== value)
            : [...selectedValues, value];
        setFormVal(newValues);
    };
    const handleBlur = () => {
        const validationError = validateField(formVal, data);
        setError(validationError || "");
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="label">
                {data.label}
                <span className="text-red-500 ml-2">{data.validation?.required && "* "}</span>
            </label>

            <div className=" grid grid-cols-2 md:grid-cols-4  gap-5">
                {data?.options?.map((option, i) => (
                    <div key={i} className="flex items-center ">
                        <input
                            type="checkbox"
                            id={option.value}
                            value={option.value}
                            checked={selectedValues.includes(option.value)}
                            onChange={handleChange}
                            className="mr-2   p-2 cursor-pointer"
                            onBlur={handleBlur}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
                ))}
            </div>
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    );
};

export default Checkbox;
