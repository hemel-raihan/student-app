import Head from 'next/head'
import { useEffect } from 'react'
import { useState } from 'react';
import Layout from '../layouts/Layout'
import { useRouter } from "next/router";
import AuthUser from './AuthUser';

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const {getToken} = AuthUser();
  useEffect(() =>{
    (
      async () => {
        const tokenString = localStorage.getItem('token');
      if(!tokenString)
      {
        router.push('login');
      }
      else
      {
        try{
          const response = await fetch('http://localhost:8000/api/me',{
            method: "POST",
            body: {token: tokenString}
            //credentials: 'include'
          })
          .then(response => response.json())
                .then(data => {
                    if (!data) {
                        setMessage('Someting went wrong!');
                        //return;
                    }
                    setMessage(`Hi ${data.data.name}`);
                });
          // const content = await response.json();
          // setMessage(`Hi ${content.name}`);
          // setAuth(true);
        }catch(e){
          //setMessage('You are not logged in');
          await router.push('login');
          setAuth(false);
        }
      }
        
        
      }
    )();
  },[]);

  return (
  <>
    <Layout auth={auth}>
      <h1>{message}</h1>
    </Layout>
  </>
  )
}
