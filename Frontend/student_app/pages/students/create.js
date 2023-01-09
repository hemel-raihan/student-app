import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import AuthUser from '../AuthUser';
import Layout from '../../layouts/Layout';
import { Link } from 'next/link';
import { Button, Form } from "react-bootstrap";
import Select from 'react-select';

const AddStudent = () => {
    const router = useRouter();
    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();
    const [students,setStudents] = useState();

    const [name, setName] = useState();
    const [classes, setClasses] = useState();
    const [age, setAge] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    const [teachers, setTeachers] = useState([])

    const teacherRef = React.useRef(null);
    const courseRef = React.useRef(null);
    const [selectedTeacher, setSelectedTeacher] = useState([])

    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
    },[]);

    useEffect(()=>{
    const controller = new AbortController();
      async function getAllTeachers(){
          await http.get(`/teacher/list`)
          .then((res)=>{
            console.log(res)
            setTeachers(res?.data?.data);
          });
        }
        getAllTeachers()
        return ()=> controller.abort();

   },[])

    const [ind, setInd] = useState(1)
    const [inputVal, setInputVal] = useState([]);
    const [addTeacher, setAddTeacher] = useState([]);
    console.log(addTeacher)
    function variantChange()
    {   
        setInd(()=> ind+1)

        setInputVal([...inputVal, 
        {
            id: ind,
            input: InputForm(ind)
        }
        ])
    }

    const handleTeacherSelectChange =(e)=>{
        setSelectedTeacher(prev=>({
            ...prev, id : e?.value, name : e?.label
        }))
      }

    const handleSave = (e) => {
        
        setAddTeacher([...addTeacher, 
          {id: ind, name: selectedTeacher.name, course: courseRef.current.value}
        ])
        setInputVal([]);
    }

    const InputForm = (no) =>{
        return (
          <>
         
          <div>
          <h4>Teacher No: {no}</h4>
              
              <div className="row">
                <div className="col-md-6">
                <label >Select Teacher : </label>
                {/* <select ref={teacherRef} name="teachers" className="form-select" aria-label="Default select example">
                    <option value="">Select Teacher</option>
                    {teachers &&
                    teachers?.map((teacher,ind)=>(
                    <>
                    <option value={teacher.id} dataName={teacher.name}>{teacher.name}</option>
                    </>
                    ))
                }
                </select> */}
                <Select
                options={teachers?.map(({ id, name}) => ({ value: id, label: name}))}
                onChange={handleTeacherSelectChange}
                isClearable={true}
                // ref={teacherRef}
                />
                </div>
                <div className="col-md-6">
                <label>Course Name : </label>
                    <input ref={courseRef} type="text" className="form-control"  placeholder="Course Name"/>
                </div>
              </div>
                
            <a style={{marginTop: "10px", marginBottom: "10px"}} className="btn btn-primary" onClick={handleSave}>
                Add
            </a>
          </div>
          </>
        )
      }


    async function submitForm(e) {
        e.preventDefault();
        await http.post(`/student/create`,{name, classes, age, phone, address})
        .then((res)=>{
            console.log(res)
            router.push(`/students`);
        })
        .catch((e)=>{
            console.log(e)
            // const msg = e.response;
        });
    }

    return(
        <Layout auth={auth}>
          <>
          <div className="card" style={{width: "50%",textAlign: "center", margin: "0 auto"}}>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <h1 className='h3 mb-3 fw-normal'>Create Student</h1>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                    <input type="text" className="form-control" onChange={(e) => setClasses(e.target.value)} placeholder="Class"/>
                    <input type="number" className="form-control" onChange={(e) => setAge(e.target.value)} placeholder="Age"/>
                    <input type="number" className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>

                    {addTeacher != "" &&
                    <>
                    <div className="border-bottom title-part-padding">
                        <h4 className="card-title mb-0">Teachers</h4>
                    </div>
                    <table
                        id="multi_col_order"
                        className="table table-striped table-bordered display"
                        style={{ width: "100%" }}
                    >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {addTeacher?.map((item, index)=>(
                            <>                                                 
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                <ul className="action">
                                    <li>
                                    {/* <Link href='#'>
                                        <a onClick={() => removeObjectFromArray(item.id, index)}>
                                        Delete
                                        </a>
                                    </Link> */}
                                    </li>
                                </ul>
                                </td>
                            </tr>
                            </>
                        ))}
                        
                        </tbody> 
                    </table>
                    </>
                    }

                    <button variant="primary" className="shadow rounded mb-3" style={{ marginTop: "5px" }} type="button" onClick={variantChange} block>
                        {addTeacher.length >= 1 ? 'Add More Teacher' : 'Add Teacher'}
                    </button>

                    <div id="dd_handle">
                        {inputVal.map((v,i)=>(
                        <>
                        {v.input}
                        </>
                        ))}
                    </div>

                    <button className='w-100 btn btn-lg btn-success' type='submit'>Create</button>
                </form>
            </div>
          </div>
            </>
        </Layout>
    )
}
 
export default AddStudent;