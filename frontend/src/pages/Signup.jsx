import { Heading } from "../components/HeadingComponent"
import { Button } from "../components/ButtonComponent"
import { BottomWarning } from "../components/BottomWarningComponent"
import { InputBox } from "../components/InputBoxComponent"
import { SubHeading } from "../components/SubHeadingComponent"

export const SignupComponent = () => {
    return <>
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                <Heading label='Sign Up' />
                <SubHeading label='Enter your information to create your account' />
                <InputBox placeholder="John" label={"First Name"} />
                <InputBox placeholder="Doe" label={"Last Name"} />
                <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
                <InputBox placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button label='Sign Up' />
                </div>
                <BottomWarning label='Already have an account?' buttonText='Sign In' to='/signin'/>
            </div>
        </div>
    </div>
    </>
}