type FormFieldProps = {
    type?: string
    title: string
    state: string
    placeholder: string
    isTextArea?: boolean
    setState: (value: string) => void
}

const FormField = ({ title, type, state, setState, placeholder, isTextArea }: FormFieldProps) => {
    return (
        <div className="flex justify-start items-center flex-col w-full gap-4">
            <label className="w-full text-[#3d3d4e]">
                {title}
            </label>
            {isTextArea ? (
                <textarea 
                    placeholder={placeholder}
                    value={state}
                    required
                    rows={5}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full outline-0 bg-[#F1F4F5] rounded-xl p-4"
                />
            ) : (
                <input 
                    type={type || 'text'}
                    placeholder={placeholder}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full outline-0 bg-[#F1F4F5] rounded-xl p-4"
                />
            )}
        </div>
    )
}

export default FormField