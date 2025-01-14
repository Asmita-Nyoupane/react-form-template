import { useState } from "react";
import { TProps } from "./input";

const Checkbox = ({ data, formVal, setFormVal, error }: TProps) => {


    const [selected, setSelected] = useState<string[]>(Array.isArray(formVal) ? formVal : formVal ? formVal.split(",") : []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        const newSelected = isChecked
            ? [...selected, value]
            : selected.filter((item) => item !== value);

        setSelected(newSelected);
        setFormVal(newSelected.join(","));
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
                            checked={selected.includes(option.value)}
                            onChange={handleChange}
                            className="mr-2   p-2 cursor-pointer"
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
