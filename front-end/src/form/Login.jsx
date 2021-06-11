import React, {useContext} from 'react'
import {UserContext} from '../component/UserContextApi'
import Layout from './../core/Layout'
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

axios.defaults.withCredentials = true

function Login(props) {
  const { setAuth} = useContext(UserContext);
  
  

  const initialState = {
    email: '',
    password:''
  }

  const [dataLogin,setDataLogin] = React.useState(initialState)
  
  const handelChange = (e)=>{
    setDataLogin({...dataLogin,[e.target.name] : e.target.value})
  }
  const handelSubmit = async (e)=>{
    //const jwt = localStorage.getItem('jwt_info');
  
    
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:3001/api/login',dataLogin,{
        withCredentials:true
      })
      if(res){
        toastr.success (' authenticated Successfully', 'Welcome')
        setAuth(res.data)
       
        if(res.data.isAuth){
          localStorage.setItem('jwt_info', JSON.stringify(res.data))

          if (res.data.type === 'admin'){
            
            props.history.push('/admin')

          }else if (res.data.type === 'technician'){
            props.history.push('/tech')
          }else if (res.data.type === 'employer'){
            props.history.push('/employer')
          }
        }
        
      }
    }
    catch (error) {
      toastr.warning(error , 'Server Error ')
      if(error) console.log(error.response);
    }

  }


  const Login = () => (
    <form onSubmit={handelSubmit}>
         <div className="form-group">
             <label htmlFor="email" className="text-muted">Email</label>
             <input onChange={handelChange}  type="text" className="form-control" name="email"/>
         </div>
         <div className="form-group">
             <label htmlFor="password" className="text-muted">Password</label>
             <input onChange={handelChange}  type="password" className="form-control" name="password"/>
         </div>
         <button className="btn btn-lg btn-block btn-outline-info">Login</button>
        </form>
 )
 return (
     <div>
        <Layout title="Login">
            <div className="row">
                <div className="col-md-6 mx-auto">

                  { Login() }
                </div>
             </div>
            

        </Layout>
     </div>
 )
}

export default Login
