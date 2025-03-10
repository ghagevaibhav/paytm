
export function InputBox ({label, placeholder, onChange}) {
    return <div>
        <div className="text-1xl font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-1 py-1 border rounded border-slate-200" required />
        </div>
}