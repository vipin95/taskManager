import Style from "../../assets/style/signUp.module.css";

function SignUp({LoginPage, user, StateUpdate, userSignUp}) {
    
    return (
        <div className={Style.container}>
            <div className={Style.subContainer}>
                <header className={Style.pageHeading}>
                    <h2>Create an account</h2>
                    <span>Enter your details to create your work ticket manager account</span>
                </header>
                <form onSubmit={(e)=>{
                    userSignUp(e);
                }} className="SignUPForm" action="/post" method="post">
                    <label for="email">Email</label>
                    <input type="email" placeholder="name@example.com" name="email" id="email" onChange={(e)=>StateUpdate({"email":e.target.value})} value={user?.email} required />
                    <label for="password">Password</label>
                    <input type="password" value={user?.password} name="password" onChange={(e)=>StateUpdate({"password":e.target.value})} placeholder="Enter your password" id="password" required />
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" id="confirmPassword" />
                    <input className={Style.button} type="submit" value="Sign In" />
                    <p>Already have an account? <a onClick={()=>LoginPage()}>Sign In</a>.</p>
                </form>
            </div>
        </div>
    )
}
export default SignUp;