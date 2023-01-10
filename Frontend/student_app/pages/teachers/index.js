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
    const [teachers,setTeachers] = useState();

        
    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        fetchUserDetail();
    },[]);


    const fetchUserDetail = () =>{
        http.get('/teacher/list').then((res)=>{
            console.log(res)
            setTeachers(res.data.data);
            setAuth(true);
        })
    }

    return(
        <Layout auth={auth}>
          <>
          <Link href="/teachers/create"><button type="button" style={{float: "right"}} className="btn btn-primary">Add Teacher</button></Link>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Students</th>
                    <th scope="col">Department</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {teachers?.map((row,i)=>(
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{row.name}</td>
                        <td>{row.students_count}</td>
                        <td>{row.department}</td>
                        <td>{row.phone}</td>
                        <td>{row.email}</td>
                        <td>
                        <Link href={`/teachers/details/${row.id}`}>
                            <a className="btn btn-primary">
                                Details
                            </a>
                        </Link>|
                        <Link href={`/teachers/edit/${row.id}`}>
                            <a className="btn btn-danger">
                                Edit
                            </a>
                        </Link>
                        </td>
                    </tr>
                    ))}
                
                </tbody>
            </table>
            </>
        </Layout>
    )
}