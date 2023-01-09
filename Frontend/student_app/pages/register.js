import { useRouter } from "next/router";
import {useState } from "react";
import Layout from "../layouts/Layout";
import AuthUser from './AuthUser';

const Register = () => {

    const router = useRouter();
    const {http, setToken, getToken} = AuthUser();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

      async function submitForm(e) {
        e.preventDefault();
        await http.post(`/register`,{name, email, password})
        .then((res)=>{
            console.log(res)
            setToken(res.data.user,res.data.access_token);
        })
        .catch((e)=>{
            console.log(e)
            // const msg = e.response;
        });
       }

    return ( 
      
        <Layout>
        <div className="card" style={{width: "30%",textAlign: "center", margin: "0 auto"}}>
          <div className="card-body">
          <form onSubmit={submitForm}>
          <h1 className='h3 mb-3 fw-normal'>Please Register</h1>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>Sign in</button>
        </form>
          </div>
        </div>
        </Layout>
      
     );
}
 
export default Register;