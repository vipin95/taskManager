import Style from "../../assets/style/signUp.module.css";
import { useNavigate } from "react-router";

function SignUp() {
    const navigate = useNavigate();
    const LoginForm = ()=>{
        navigate("/login");
    }
    return (
        <div className={Style.container}>
            <div className={Style.subContainer}>
                <header className={Style.pageHeading}>
                    <h2>Create an account</h2>
                    <span>Enter your details to create your work ticket manager account</span>
                </header>
                <form className="SignUPForm" action="/post" method="post">
                    <label for="email">Email</label>
                    <input type="email" placeholder="name@example.com" name="email" id="email" required />
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" id="password" required />
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" id="confirmPassword" required />
                    <input className={Style.button} type="submit" value="Sign In" />
                    <p>Already have an account? <a onClick={()=>LoginForm()}>Sign In</a>.</p>
                </form>
            </div>
        </div>
    )
}
export default SignUp;