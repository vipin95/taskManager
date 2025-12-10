import Login from "./login.tsx";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import { Get, Post } from "../../service/getRequest.tsx";

function LoginController() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(()=>{
        const match = document.cookie.match(/token=([^;]+)/);
        let token = match?.[1];
        if(token){
            navigate("/list");
        }
    },[user]);
    
    const GuestLogin = async ()=>{
        try {
            const loginGuestResponse = await Get("/auth/guest-login");
        if(loginGuestResponse.message === "Login successfully."){
            localStorage.setItem("login","true");
            navigate("/list");
        }
        setUser({"username":"Guest", "id":`guest_ ${Math.random().toString(36).substr(2, 9)}` });
        } catch (error) {
            throw error;
        }
    }
    const StateUpdate = (obj)=>{
        setUser({...user, ...obj});
    }
    const userLogin = async (event)=>{
        event.preventDefault();
        await Post("/auth/login", {
            "email" : user.email,
            "password": user.password
            }
        );
        setUser({...user, "login":"true"});
    }
    const googleLogin = async ()=>{
        window.location.href = "http://localhost:4000/auth/google";
    }
    return(
        <Login GuestLoginAction={GuestLogin} redirect={navigate} StateUpdate={StateUpdate} user={user} userLogin={userLogin}>
            <button onClick={()=>googleLogin()}>Login With Google</button>
        </Login>
    )
}

export default LoginController;