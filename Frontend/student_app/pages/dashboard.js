import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import AuthUser from "./AuthUser";
import { useRouter } from 'next/router';

export default function Dashboard()
{
    const router = useRouter();
    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();
    const [userDetails,setUserdetails] = useState();

        

    useEffect(() =>{

        if(!getToken())
        {
            router.push('/login');
        }
        
        fetchUserDetail();
        
    },[]);

        

    const fetchUserDetail = () =>{
        http.get('/dashboard').then((res)=>{
            setUserdetails(res.data);
            setAuth(true);
        })
    }

    function renderElement(){
        if(userDetails){
            return <div style={{textAlign: "center"}}>
                <h1>Dashboard Page</h1>
            <h4>Name</h4>
            <p>{userDetails.name}</p>
            <h4>Email</h4>
            <p>{userDetails.email}</p>
            </div>
        }
        else
        {
            return <p>Loading.....</p>
        }
    }

    return(
        <Layout auth={auth}>
          {renderElement()}
        </Layout>
    )
}