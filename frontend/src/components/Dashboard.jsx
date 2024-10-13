
export const DashboardComponent = () => {
    return <>
    <div>
        <h1>Sign Up</h1>
        <p>Enter your information to create an account</p>

        <br /><br />

        <h3>First Name</h3>
        <input type="text" name="firstName" placeholder="John" id="" />

        <br /><br />

        <h3>Last Name</h3>
        <input type="text" name="lastName" placeholder="Doe" id="" />

        <br /><br />

        <h3>Email</h3>
        <input type="email" name="email" placeholder="john.doe@example.com" id="" />

        <br /><br />

        <h3>Password</h3>
        <input type="text" />
        <br />

        <button>Sign Up</button>

        <br /><br />

        <h4>Already Have an Account? <a href="/signin">Login</a> </h4>
    </div>

    </>
}