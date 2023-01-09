import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


const AddHoliday = () => {

    // const {http} = Axios();
    const router = useRouter();

    const [student, setStudent] = useState({
        name:"",
        class:"",
        age:null,
        phone:null,
        address:""
    })

    const handleChange =(e)=>{
        setStudent(prev=>({
          ...prev, [e.target.name]:e.target.value
        }))
      }

    const [teachers, setTeachers] = useState([])

  const [inputVal, setInputVal] = useState([]);
  const [ind, setInd] = useState()

  function addTeacher()
  {   
    setInd(()=> ind+1)

    setInputVal([...inputVal, 
      {
        id: ind,
        input: InputForm(ind)
      }
    ])
  }

  const InputForm = (no) =>{
    return (
      <>
      <div>
      <label >Select Teacher : </label>
      <select name="teachers[]" onChange={handleChange}>
        <option value="">Select Teacher</option>
            {teachers &&
            teachers?.map((teacher,ind)=>(
            <>
              <option value={teacher.id}>{teacher.name}</option>
            </>
            ))
        }
      </select>
      <input type="text" name="course" onChange={handleChange} placeholder="enter course" />
      </div>
      </>
    )
  }

//     useEffect(()=>{
//     const controller = new AbortController();
//       async function getAllTeachers(){
//           await http.get(`http://localhost:8000/api/teacher/list`)
//           .then((res)=>{
//             console.log(res)
//             setTeachers(res?.data?.data);
//           });
//         }
//         getAllTeachers()
//         return ()=> controller.abort();

//   },[])

//     async function submitForm(e) {
//       e.preventDefault();
//       await http.post(`http://localhost:8000/api/student/create`,{student})
//       .then((res)=>{
//          console.log("successfully Added!");
//         //  router.push('/modules/hr/holidays');
//       }).catch((e)=>{
//         console.log(e)
//         const msg = e.response.data.response;

        
//       });
//      }

    return ( 

      <>
      <div className="container-fluid ">
        <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Add Student</h4>
                </div>

                <form >
                  <div className="card-body">

                <div>
                <label >Name : </label>
                <input type="text" name="name" onChange={handleChange} placeholder="enter name" />
                </div>
                  
                  <div>
                  <label >Class : </label>
                  <input type="text" name="class" onChange={handleChange} placeholder="enter class" />
                  </div>
                  
                  <div>
                  <label >Age : </label>
                  <input type="number" name="age" onChange={handleChange} placeholder="enter age" />
                  </div>

                <div>
                <label >Phone : </label>
                <input type="number" name="phone" onChange={handleChange} placeholder="enter phone number" />
                </div>

                <div>
                <label >Address : </label>
                <input type="text" name="address" onChange={handleChange} placeholder="enter address" />
                </div>

                <button  style={{ marginTop: "5px" }} type="button" onClick={addTeacher} block>
                  Add Teacher
                </button>
                  
                <div>
                {inputVal.map((v,i)=>(
                  <>
                  {v.input}
                  </>
                ))}
                </div>

                  </div>
                  <div className="p-3 border-top">
                    <div className="text-end">
                      <button className="btn-info">
                        Save
                      </button>
                      <button className="btn-dark">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
      </>
     );
}
 
export default AddHoliday;