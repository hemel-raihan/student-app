import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AuthUser from '../AuthUser';
import Layout from '../../layouts/Layout';
import Link from "next/link";

export default function List()
{
    const router = useRouter();
    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();
    const [students,setStudents] = useState();

        
    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        fetchUserDetail();
    },[]);


    const fetchUserDetail = () =>{
        http.get('/student/list').then((res)=>{
            console.log(res)
            setStudents(res.data.data);
            setAuth(true);
        })
    }

    return(
        <Layout auth={auth}>
          <>
          <Link href="/students/create"><button type="button" style={{float: "right"}} className="btn btn-primary">Add Student</button></Link>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Age</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {students?.map((row,i)=>(
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{row.name}</td>
                        <td>{row.class}</td>
                        <td>{row.age}</td>
                        <td>{row.phone}</td>
                        <td>{row.address}</td>
                        <td>{row.address}</td>
                    </tr>
                    ))}
                
                </tbody>
            </table>
            </>
        </Layout>
    )
}