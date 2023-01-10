import Layout from '../layouts/Layout'
import '../styles/globals.css';
import AuthUser from './AuthUser';
import { useRouter } from "next/router";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // const {getToken} = AuthUser();
  // if(!getToken())
  // {
  //   return 'asd';
  // }
  
  return (
      <>
      <Component {...pageProps} />
       <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
          transition={Slide}
        />
      </>
  )
}

export default MyApp
