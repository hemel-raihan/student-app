import { useRouter } from "next/router";
import {useState } from "react";
import Layout from "../layouts/Layout";

const Post = () => {

    const router = useRouter();

    const [name, setName] = useState();

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/post',{
            credentials: 'include',
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name
            })
        });
        
        console.log('insert successfully');

        //await router.push('post');

    }

    return ( 
      
        <Layout>
        <form onSubmit={submit}>
          <h1 className='h3 mb-3 fw-normal'>Please Post your name</h1>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>

          <button className='w-100 btn btn-lg btn-primary' type='submit'>POST</button>
        </form>
        </Layout>
      
     );
}
 
export default Post;