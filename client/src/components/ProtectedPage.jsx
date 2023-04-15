import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {message} from 'antd'
import { GetLoggedInUser } from '../apicalls/user'

function ProtectedPage({children}) {
    const navigate =useNavigate()
    const [user,setUser]=useState(null)
    const getUser =async () =>{
        try{
            const response  =await GetLoggedInUser()
            if(response.sucess){
                setUser(response.data)
            }else {
                throw new Error(response.message)
            }

        }catch(error){
            message.error(error.message)
            localStorage.removeItem('token')
            navigate("/login")
        }
    }

    useEffect(() =>{
        getUser()

    })
  return (
    <div>
        <h1>Protected Page</h1>
        
        <h1>
            welcome {user?.firstName} {user?.lastName}
        </h1>
        {children}
    </div>
    
  )
}

export default ProtectedPage