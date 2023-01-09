import Layout from '../layouts/Layout'
import '../styles/globals.css';
import AuthUser from './AuthUser';
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // const {getToken} = AuthUser();
  // if(!getToken())
  // {
  //   return 'asd';
  // }
  
  return (
    
       <Component {...pageProps} />
  
  )
}

export default MyApp
