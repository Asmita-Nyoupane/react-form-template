import { useState } from "react";
import { TProps } from "./input";

const MultipleSelect = ({ data, formVal, setFormVal }: TProps) => {
    const [isVisible, setVisible] = useState(false)

    const [selected, setSelected] = useState<string[]>(Array.isArray(formVal) ? formVal : formVal ? formVal.split(",") : []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        const newSelected = isChecked
            ? [...selected, value]
            : selected.filter((item) => item !== value); // remove value if unchecked

        setSelected(newSelected);
        setFormVal(newSelected.join(","));
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="label">
                {data.label}
                <span className="text-red-500 ml-2">{data.required && "* "}</span>
            </label>
            <input type="text" placeholder={data.placeholder} value={formVal} className="field" onClick={() => setVisible(true)} />

            {isVisible && <div className="flex flex-col gap-1 border p-2 overflow-y-scroll h-20">
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
            </div>}
        </div>
    );
};

export default MultipleSelect;
