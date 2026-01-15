import SignUp from "./signUp.tsx";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import { Get, Post } from "../../service/request.tsx";

function LoginController() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const LoginPage = ()=>{
        navigate("/login");
    }
    const StateUpdate = (obj)=>{
        setUser({...user, ...obj});
    }
    const userSignUp = async (event)=>{
        event.preventDefault();
        await Post("/auth/sign-up", {
            "email" : user.email,
            "password": user.password
            }
        );
        LoginPage();
    }
    return(
        <SignUp user={user} LoginPage={LoginPage} StateUpdate={StateUpdate} userSignUp={userSignUp}> 
        </SignUp>
    )
}

export default LoginController;