import Style from "../../assets/style/login.module.css";
import { useNavigate } from "react-router";

function Login({GuestLoginAction, children}) {
    const navigate = useNavigate();
    const SignUp = ()=>{
        navigate("/sign-up");
    }
    return (
        <div className={Style.container}>
            {children}
            <div className={Style.subContainer}>
                <header className={Style.pageHeading}>
                    <h2>Sign In - Work Manager</h2>
                    <span>Sign in to your account to manage your work tickets</span>
                </header>
                <form className="loginForm" action="/post" method="post">
                    <label for="email">Email</label>
                    <input type="email" placeholder="name@example.com" name="email" id="email" required />
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" id="password" required />
                    <input className={Style.button} type="submit" value="Sign In" />
                </form>
                <div className="guestLogin">
                    <div className={Style.line_with_text}>
                        <span>Or</span>
                    </div>
                    <button onClick={()=>GuestLoginAction()} className={Style.Guest_button}>Continue as Guest</button>
                    <p>Don't have an account?<span onClick={()=>SignUp()}> Sign Up</span>.</p>
                </div>
            </div>
        </div>
    )
}
export default Login;