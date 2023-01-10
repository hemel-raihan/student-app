
import Head from "next/head";
import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthUser from "../pages/AuthUser";

function Layout( props ) {

  let menu;

  const router = useRouter();
  const {token,logout} = AuthUser();

  const logoutUser = () =>{
    if(token !== undefined){
      logout();
    }
  }

  if(!props.auth)
  {
    menu = (
            <div className="navbar-nav">
              <Link href="/"><a className="nav-item nav-link active" >Home</a></Link>
              <Link href="/login"><a className="nav-item nav-link" >Login</a></Link>
              <Link href="/register"><a className="nav-item nav-link" >Registration</a></Link>
              <a className="nav-item nav-link" onClick={logoutUser} href="#">Logout</a>
            </div>
    )
  }
  else
  {
    menu = (
            <div className="navbar-nav">
              <Link href="/students"><a className="nav-item nav-link active" >Students</a></Link>
              <Link href="/teachers"><a className="nav-item nav-link active" >Teachers</a></Link>
              <a className="nav-item nav-link" onClick={logoutUser} href="#">Logout</a>
            </div>
    )
  }


  return (
    <>
    <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
    </Head>

    <Nav menu={menu} />

    <main style={{padding: "50px"}}>
      {props.children}
    </main>
   
  </>
  );
}

export default Layout;
