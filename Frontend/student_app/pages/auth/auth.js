import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Auth = ({children}) => {

    const [session, setSession] = useState();
    const router = useRouter();

    useEffect(() =>{
        
        if(!!localStorage.getItem('token'))
        {
            setSession(localStorage.getItem('token'));
            router.push('/');
        }
        else
        {
            setSession(localStorage.getItem('token'));
            router.push('/login');
        }
    })

    return ( 
       <></>
     );
}
 
export default Auth;