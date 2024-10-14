
export const DashboardComponent = () => {
    return <>
    <div className="flex flex-col min-h-screen justify-center items-center border-solid border-2 border-b-slate-950">
        <div className="flex flex-col justify-center items-center">
            <h1 className="bold" >Sign Up</h1>
            <p>Enter your information to create an account</p>
        </div>

        <br /><br />

        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
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

        <div>Sign Up</div>

        <br /><br />

        <h4>Already Have an Account? <a href="/signin">Login</a> </h4>
    </div>

    </>
}