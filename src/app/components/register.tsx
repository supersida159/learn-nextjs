'use client'
import { useState } from 'react';
import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword,setconfirmpassword]=useState('')
    const rounter=useRouter()
    const [matchpass,setmatchpass] = useState('')
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
          username: username,
          password: password
        };
    
        if(password==confirmpassword){
          try {
          const response = await fetch('http://localhost:3003/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
            const responseData = await response.json();
            console.log(responseData.notification)
          if(responseData.notification=="User is not exist!"){
          try{
            const response= await fetch("http://localhost:3003/register",{
                method: "POST",
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const xx=await response.json()
            console.log(xx.notification)

            if(xx.notification=="Create user successful."){
              setmatchpass(xx.notification);
              const timeout = setTimeout(()=>rounter.push('./'), 2000);
            }
          }
          catch(error){
            console.error(error);
          }
        }
        else setmatchpass('user name is exist, pleas choose other')
          // Perform any additional actions or show a success message to the user
        } catch (error) {
          console.error(error);
          // Show an error message to the user or retry the request
        }}
        else setmatchpass('Password not match with confirmpassword')
      };
    // const rounter=useRouter()




    return(
      <div className={styles.inputform}>
      <h3>{matchpass}</h3>
       <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder='Enter Your Username' onChange={(event)=>setUsername(event.target.value)}/>
        <br />
        <input type="Password" name='password' placeholder='Enter Your Password' onChange={(event)=>setPassword(event.target.value)} />
        <br />
        <input type="Password" name='confirmpassword' placeholder='confirm Your Password' onChange={(event)=>setconfirmpassword(event.target.value)} />
        <br />
        <div className={styles["center-button"]}>
        <span>
        <button type='submit'>Submit</button>
        </span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
       </form>
    </div>
    )
}

// changea sdfads