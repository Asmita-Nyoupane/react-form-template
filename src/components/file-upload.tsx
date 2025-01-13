import { useRef } from "react"
import { TFields } from "../App"
type TProps = {
    data: TFields,
    formVal: File | null,
    setFormVal: (file: File | null) => void
}


const File = ({ data, formVal, setFormVal }: TProps) => {
    if (data.type !== 'file') return null
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormVal(file);
    };

    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.required && "* "}
            </span></label>
            <>
                <input type="file" ref={fileInputRef} className='hidden' accept={data.accept || "image/*"}

                    onChange={handleFileChange}
                />
                <button
                    className="w-full h-9 relative overflow-hidden  rounded shadow border text-white bg-blue-400 hover:bg-blue-600"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload

                </button>

            </>
            {formVal && typeof formVal === "object" && "name" in formVal && (
                <p className="text-sm mt-2 text-start text-green-500 font-semibold">Selected File: {formVal?.name}</p>
            )}
        </div>
    )
}

export default File
