import { useRef } from "react"
import { TFields } from "../types/global-types"

type TProps = {
    data: TFields,
    formVal: Record<string, File | null>,
    setFormVal: React.Dispatch<React.SetStateAction<Record<string, File | null>>>,
    error?: string,
    setError: (error: string) => void
}


const File = ({ data, formVal, setFormVal, error, setError }: TProps) => {

    if (data.type !== 'file') return null
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 5 * 1024 * 1024) { // Example: Max 5MB
            setError("File size exceeds the limit of 5MB.");
            return;
        }
        setError("");
        setFormVal({
            ...formVal, [data.name]: file
        });
    };

    return (
        <div className=' flex flex-col gap-2 flex-start'>
            <label className='label'>{data.label}  <span className="text-red-500 ml-2">{data.validation?.required && "* "}
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
            {formVal && formVal[data.name] && (
                <p className="text-sm mt-2 text-start text-green-500 font-semibold">Selected File: {formVal[data.name]?.name}</p>
            )}
            {error && <p className="text-sm text-start text-red-500 font-semibold">{error}</p>}
        </div>
    )
}

export default File
