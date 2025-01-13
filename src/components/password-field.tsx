import { useState } from 'react'
import { TProps } from './input'

const Password = ({ data, formVal, setFormVal }: TProps) => {
    const [isVisible, setVisible] = useState(false)
    const togglePasswordVisibility = () => {
        setVisible(!isVisible)
    }
    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}
                <span className="text-red-500 ml-2">{data.required && "* "}
                </span>
            </label>
            <div className=" field relative ">

                <input
                    type={isVisible ? "text" : "password"}
                    name={data.name}
                    placeholder={data.placeholder}
                    value={formVal}
                    className="border-none outline-none  text-[16px]  w-full"
                    onChange={(e) => setFormVal(e.target.value)}
                    required={data.required}
                />
                <span
                    className="absolute text-xl  cursor-pointer right-2 top-4.5 pl-2"
                    onClick={togglePasswordVisibility}
                >
                    {isVisible ? "🔓" : "🔒"}
                </span>
            </div>
        </div>
    )
}

export default Password
