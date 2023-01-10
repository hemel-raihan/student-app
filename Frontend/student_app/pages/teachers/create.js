import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import AuthUser from '../AuthUser';
import Layout from '../../layouts/Layout';
import { Link } from 'next/link';
import { Button, Form } from "react-bootstrap";
import Select from 'react-select';
import toast from "../../components/Toast/index";

const AddTeacher = () => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const router = useRouter();
    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();

    const [name, setName] = useState();
    const [department, setDepartment] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    
    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        setAuth(true);
    },[]);


    async function submitForm(e) {
        e.preventDefault();
        await http.post(`/teacher/create`,{name, department, phone, email})
        .then((res)=>{
            // console.log(res)
            router.push(`/teachers`);
        })
        .catch((e)=>{
            // console.log(e)
            const msg = e.response;
            console.log(msg)
            if(msg?.data.msg){
                notify("error", `${msg?.data.msg}`);
            }
            if(msg?.data.name){
                notify("error", `${msg?.data.name}`);
            }
            if(msg?.data.department){
                notify("error", `${msg?.data.department}`);
            }
            if(msg?.data.phone){
                notify("error", `${msg?.data.phone}`);
            }
            if(msg?.data.email){
                notify("error", `${msg?.data.email}`);
            }
        });
    }

    return(
        <Layout auth={auth}>
          <>
          <div className="card" style={{width: "50%",textAlign: "center", margin: "0 auto"}}>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <h1 className='h3 mb-3 fw-normal'>Add Teacher</h1>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                    <input type="text" className="form-control" onChange={(e) => setDepartment(e.target.value)} placeholder="Department"/>
                    <input type="number" className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>

                    <button className='w-100 btn btn-lg btn-success' type='submit'>Create</button>
                </form>
            </div>
          </div>
            </>
        </Layout>
    )
}
 
export default AddTeacher;