import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import AuthUser from '../../AuthUser';
import Layout from '../../../layouts/Layout';
import { Link } from 'next/link';
import { Button, Form } from "react-bootstrap";
import Select from 'react-select';
import toast from "../../../components/Toast/index";

const EditStudent = () => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);
      
    const router = useRouter();
    const { id } = router.query;

    const [auth, setAuth] = useState(false);
    const {http,getToken} = AuthUser();
    const [students,setStudents] = useState();

    const [name, setName] = useState();
    const [classes, setClasses] = useState();
    const [age, setAge] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    const [teachers, setTeachers] = useState([])

    const [ind, setInd] = useState(1)
    const [inputVal, setInputVal] = useState([]);
    const [addTeacher, setAddTeacher] = useState([]);
    const [deletedVouchers, setDeletedVouchers] = useState([]);
    console.log(addTeacher)
console.log(deletedVouchers)
    const teacherRef = React.useRef(null);
    const courseRef = React.useRef(null);
    const [selectedTeacher, setSelectedTeacher] = useState([])

    useEffect(() =>{
        if(!getToken())
        {
            router.push('/login');
        }
        fetchStudentDetail()
    },[id]);

    const fetchStudentDetail = () =>{
        http.post('/student/details',{id}).then((res)=>{
            setName(res?.data?.data?.name);
            setClasses(res?.data?.data?.class);
            setAge(res?.data?.data?.age);
            setPhone(res?.data?.data?.phone);
            setAddress(res?.data?.data?.address);
            setAddTeacher(res?.data?.courses)
            setAuth(true);
        })
    }

    useEffect(()=>{
    const controller = new AbortController();
      async function getAllTeachers(){
          await http.get(`/teacher/list`)
          .then((res)=>{
            setTeachers(res?.data?.data);
          });
        }
        getAllTeachers()
        return ()=> controller.abort();

   },[])

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
          {id: ind, teacher_id: teacherRef.current.value, course: courseRef.current.value}
        ])
        setInputVal([]);
    }

    const removeObjectFromArray = (id, index) =>{
        setDeletedVouchers([...deletedVouchers, 
            {id: ind, teacher_id: addTeacher[index]?.teacher_id, course: addTeacher[index]?.course}
        ])

        setInputVal(current =>
          current.filter(obj => {
            return obj.id !== id;
          }),
        );
        setAddTeacher(currentLevel =>
          currentLevel.filter(objLevel => {
            return objLevel.id !== id;
          }),
        );
    };

    const InputForm = (no) =>{
        return (
          <>
         
          <div>
          <h4>Teacher No: {no}</h4>
              
              <div className="row">
                <div className="col-md-6">
                <label >Select Teacher : </label>
                <select id="levelSelect" ref={teacherRef} name="teachers" className="form-select" aria-label="Default select example">
                    <option value="">Select Teacher</option>
                    {teachers &&
                    teachers?.map((teacher,ind)=>(
                    <>
                    <option value={teacher.id} data_name={teacher.name}>{teacher.name}</option>
                    </>
                    ))
                }
                </select>

                {/* <Select
                options={teachers?.map(({ id, name}) => ({ value: id, label: name}))}
                onChange={handleTeacherSelectChange}
                isClearable={true}
                /> */}
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
        await http.post(`/student/update`,{id, name, classes, age, phone, address, addTeacher, deletedVouchers})
        .then((res)=>{
            router.push(`/students`);
        })
        .catch((e)=>{
            const msg = e.response;
            console.log(msg)
            if(msg?.data.msg){
                notify("error", `${msg?.data.msg}`);
            }
            if(msg?.data.name){
                notify("error", `${msg?.data.name}`);
            }
            if(msg?.data.age){
                notify("error", `${msg?.data.age}`);
            }
            if(msg?.data.classes){
                notify("error", `${msg?.data.classes}`);
            }
            if(msg?.data.phone){
                notify("error", `${msg?.data.phone}`);
            }
            if(msg?.data.address){
                notify("error", `${msg?.data.address}`);
            }
        });
    }

    return(
        <Layout auth={auth}>
          <>
          <div className="card" style={{width: "50%",textAlign: "center", margin: "0 auto"}}>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <h1 className='h3 mb-3 fw-normal'>Update Student</h1>
                    <input type="text" defaultValue={name} className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                    <input type="text" defaultValue={classes} className="form-control" onChange={(e) => setClasses(e.target.value)} placeholder="Class"/>
                    <input type="number" defaultValue={age} className="form-control" onChange={(e) => setAge(e.target.value)} placeholder="Age"/>
                    <input type="number" defaultValue={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                    <input type="text" defaultValue={address} className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>

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
                                <td>{item.teacher_id}</td>
                                <td>{item.course}</td>
                                <td>
                                <ul className="action">
                                    <li>
                                        <a href="#" onClick={() => removeObjectFromArray(item.id, index)}>
                                          Delete
                                        </a>
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

                    <button className='w-100 btn btn-lg btn-success' type='submit'>Update</button>
                </form>
            </div>
          </div>
            </>
        </Layout>
    )
}
 
export default EditStudent;