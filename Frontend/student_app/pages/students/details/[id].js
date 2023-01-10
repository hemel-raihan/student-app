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
    const [student,setStudent] = useState();
    console.log(student)
        
    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        fetchStudentDetail();
    },[id]);

    const fetchStudentDetail = () =>{
        http.post('/student/details',{id}).then((res)=>{
            setStudent(res.data.data);
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
                            <h3 className="box-title mt-5">Students Basic Info</h3>
                            <div className="table-responsive">
                                <table className="table">
                                <tbody>
                                    <tr>
                                        <td width={390}>Name</td>
                                        <td>{student?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Class</td>
                                        <td>
                                            {student?.class}
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>Adress</td>
                                    <td>
                                        {student?.address}
                                    </td>
                                    </tr>
                                    
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Student Course Info</h3>
                            <div className="table-responsive">
                            <table
                                id="multi_col_order"
                                className="table table-striped table-bordered display"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                <tr>
                                    <th>Couse Name</th>
                                    <th>Teacher Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                student?.courses.map((course, index) => (
                                <tr key={index}>
                                    <th>{course?.name}</th>
                                    <td>{course?.teacher.name}</td>
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
                    <h4 className="card-title mb-0">Teachers under this student</h4>
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
                            <th>Name</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Email</th>
                            {/* <th>Course</th> */}
                        
                        </tr>
                        </thead>
                        <tbody>
                        {
                        student?.teachers.map((teacher, index) => (
                          <tr key={index}>
                            <th>{teacher?.name}</th>
                            <td>{teacher?.department}</td>
                            <td>{teacher?.phone}</td>
                            <td>{teacher?.email}</td>
                            {/* <td>{employee?.creator.name}</td> */}
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