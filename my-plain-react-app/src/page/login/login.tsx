import Style from "../../assets/style/login.module.css";

function Login({GuestLoginAction, navigate, children, StateUpdate, user, userLogin}) {
    return (
        <div className={Style.container}>
            {children}
            <div className={Style.subContainer}>
                <header className={Style.pageHeading}>
                    <h2>Sign In - Work Manager</h2>
                    <span>Sign in to your account to manage your work tickets</span>
                </header>
                <form className="loginForm">
                    <label for="email">Email</label>
                    <input type="email" placeholder="name@example.com" name="email" id="email" onChange={(e)=>StateUpdate({"email": e.target.value})} value={user?.email} required />
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={(e)=>StateUpdate({"password": e.target.value})} value={user?.password} id="password" required />
                    <input className={Style.button} type="submit" onClick={(e)=>userLogin(e)} value="Sign In" />
                </form>
                <div className="guestLogin">
                    <div className={Style.line_with_text}>
                        <span>Or</span>
                    </div>
                    <button onClick={()=>GuestLoginAction()} className={Style.Guest_button}>Continue as Guest</button>
                    <p>Don't have an account?<span onClick={()=>navigate("/sign-up")}> Sign Up</span>.</p>
                </div>
            </div>
        </div>
    )
}
export default Login;