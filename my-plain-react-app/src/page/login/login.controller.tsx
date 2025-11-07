import Login from "./login.tsx";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Get } from "../../service/getRequest.tsx";

function LoginController() {
    const navigate = useNavigate();
    const fetch = async ()=>{
        console.log(document.cookie);
    }
    const [user, setUser] = useState({});
    useEffect(()=>{
        const cookiesObject =document.cookie.split("; ").reduce((result, keyValue)=>{
            let array = keyValue.split("=");
            return {...result ,[array[0]]:array[1]};
        },{});
        if(cookiesObject.username && cookiesObject.id){
            navigate("/list");
        }
    },[user]);
    
    const GuestLogin = async ()=>{
        // document.cookie = "username=Guest";
        // document.cookie = "id=guest_" + Math.random().toString(36).substr(2, 9);
        await Get("/set-cookie");
        setUser({"username":"Guest", "id":`guest_ ${Math.random().toString(36).substr(2, 9)}` });
    }

    return(
        <Login GuestLoginAction={GuestLogin}>
            <button onClick={()=>{fetch()}}>Fetch cookie</button>
        </Login>
    )
}

export default LoginController;