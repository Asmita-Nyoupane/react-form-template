import { useState } from "react";
import { TProps } from "./input";

const Checkbox = ({ data, formVal, setFormVal, error, setError }: TProps) => {


    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const updatedSelected = checked
            ? [...selected, value]
            : selected.filter((item) => item !== value);

        setSelected(updatedSelected);
        setFormVal({
            ...formVal,
            [data.name]: updatedSelected.join(","),
        });
        setError("");
    }

    const handleBlur = () => {
        if (data.validation?.required && selected.length === 0) {
            setError(`${data.label} is required`);
        }
    }
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
                            checked={selected.includes(option.value)}
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
