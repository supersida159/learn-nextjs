'use client'
import { useState } from 'react';
import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const rounter=useRouter()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
          username: username,
          password: password
        };
    
        try {
          const response = await fetch('http://localhost:3003/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
            const responseData = await response.json();
            console.log(responseData)
            Cookies.set('token', "Bearer "+responseData.data.accessToken, {expires: 7, });
            Cookies.set('refreshToken', responseData.data.refreshToken, {expires: 7, });
          if(responseData.notification=="Login successful."){
          try{
            const response= await fetch("http://localhost:3003/GetUserInfo",{
                method: "GET",
                headers:{
                    Authorization: "Bearer "+responseData.data.accessToken
                }
            })
            const xx=await response.json()
            console.log(xx.notification)
            if(xx.notification=="Get user info successful."){
                rounter.push('/')
            }
          }
          catch(error){
            console.error(error);
          }
        }
        else console.log("send token to server fail")
          // Perform any additional actions or show a success message to the user
        } catch (error) {
          console.error(error);
          // Show an error message to the user or retry the request
        }
      };
    // const rounter=useRouter()
    const [accestoken,setaccesstoken]=useState("")
    async function loginfetch(url="",data1={}) {
        const response= await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data1)
        })
        const xx=await response.json()
        setaccesstoken(xx.data.accessToken)
        console.log(xx.data.accessToken)
    } 
    return(
        <div className={styles.inputform}>
           <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='Enter Your Username' onChange={(event)=>setUsername(event.target.value)}/>
            <br />
            <input type="Password" name='password' placeholder='Enter Your Password' onChange={(event)=>setPassword(event.target.value)} />
            <br />
            <div className={styles["center-button"]}>
            <span>
            <button type='submit'>Submit</button>
            </span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            {/* <button onClick={()=>Getinfor("http://localhost:3003/GetUserInfo",accestoken)} type='submit'>Get infor</button> */}
           </form>
           <button onClick={()=>rounter.push('./register')} >register</button>
        </div>
    )
}

// changea sdfads