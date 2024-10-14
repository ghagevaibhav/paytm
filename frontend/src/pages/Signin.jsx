import { Heading } from "../components/Heading"
import { BottomWarning } from "../components/BottomWarning"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"


export const SigninComponent = () => {
    return <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4"   >
                    <Heading label={'Sign In'} />
                    <SubHeading label={'Enter your PayTM login credentials'} />
                    <InputBox placeholder={'testuser@gmail.com'} label={'Email'} />
                    <InputBox placeholder={'12345678'} label={'Password'} type={'password'} />
                    <div className="pt-4">
                        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={'/signup'} />
                    </div>
                </div>
            </div>
        </div>
    </>
}