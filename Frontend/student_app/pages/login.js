import Layout from "../layouts/Layout";
import React from 'react';
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import AuthUser from "./AuthUser";
import toast from "../components/Toast/index";

const Login = () => {

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  
    const {http, setToken, getToken} = AuthUser();

    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //const [tkn, setTkn] = useState();
    
    

    useEffect(() =>{
      if(getToken())
      {
          router.push('/dashboard');
      }
    },[]);


    const submit = () =>{
        http.post('/login',{email,password}).then((res)=>{
          console.log(res)
            setToken(res.data.user,res.data.access_token);
        })
        .catch((e)=>{
          const msg = e.response;
          console.log(msg)
          if(msg?.data.msg){
              notify("error", `${msg?.data.msg}`);
          }
        });
      }
    // }   

    return ( 
        <Layout>
          <div className="card" style={{width: "30%",textAlign: "center", margin: "0 auto"}}>
          <div className="card-body">
          <h1 className='h3 mb-3 fw-normal'>Please Sign in to my app</h1>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

          <button className='w-100 btn btn-lg btn-primary' onClick={submit} type='submit'>Sign in</button>
          </div>
          </div>
        </Layout>
      
     );
}
 
export default Login;