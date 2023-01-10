import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AuthUser from '../../AuthUser';
import Layout from '../../../layouts/Layout';
import Link from "next/link";

export default function Details()
{
    const router = useRouter();
    const { id } = router.query;

    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();
    const [teacher,setTeacher] = useState();
    console.log(teacher)
        
    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        fetchTeacherDetail();
    },[id]);

    const fetchTeacherDetail = () =>{
        http.post('/teacher/details',{id}).then((res)=>{
            setTeacher(res.data.data);
            setAuth(true);
        })
    }

    return(
        <Layout auth={auth}>
        <>
        <div className="container-fluid ">
        <div className="row">
           
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
            
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Teacher Basic Info</h3>
                            <div className="table-responsive">
                                <table className="table">
                                <tbody>
                                    <tr>
                                        <td width={390}>Name</td>
                                        <td>{teacher?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>
                                            {teacher?.department}
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Phone</td>
                                    <td>
                                        {teacher?.phone}
                                    </td>
                                    </tr>

                                    <tr>
                                    <td>Email</td>
                                    <td>
                                        {teacher?.email}
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Students under this teacher</h3>
                            <div className="table-responsive">
                            <table
                                id="multi_col_order"
                                className="table table-striped table-bordered display"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                teacher?.students.map((student, index) => (
                                <tr key={index}>
                                    <th>{student?.name}</th>
                                    <td>{student?.class}</td>
                                    <td>{student?.phone}</td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                
                <div className="card">
                <div className="border-bottom title-part-padding">
                    <h4 className="card-title mb-0">Course under this teacher</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table
                        id="multi_col_order"
                        className="table table-striped table-bordered display"
                        style={{ width: "100%" }}
                    >
                        <thead>
                        <tr>
                            <th>Course Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        teacher?.courses.map((course, index) => (
                          <tr key={index}>
                            <th>{course?.name}</th>
                          </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>

            </div>
            
        </div>
    </div>
        </>
        </Layout>
    )
}