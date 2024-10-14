import { Link }  from 'react-router-dom'

export function BottomWarning({label, buttonText, to}) {
    return <div className='text-base py-2 flex justify-center'>
        <div>
            {label}
        </div>
        <Link className='text-sky-800 pointer underline pl-1 cursor-pointer' to={to} >
            {buttonText}
        </Link>
    </div>
}