'use client'

import { useState,useEffect } from 'react'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { type } from 'os';


export default function Mainpage1(){
    const [data, setData] = useState({});
    const [refresh, setrefresh] = useState('');
    const rounter=useRouter()
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async() => {
        const tokenValue = Cookies.get('token');
        const refreshToken = Cookies.get('refreshToken');
        if(tokenValue){
            try{
                const respone=await fetch("http://localhost:3003/refresh",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: tokenValue
                    },
                    body: JSON.stringify({"refreshToken": refreshToken})
                }
                )
                const qqq= await respone.json();
                setrefresh(qqq)
                if({qqq}){
                    const responseinfor= await fetch("http://localhost:3003/GetUserInfo",{
                    method: "GET",
                    headers:{
                    Authorization: tokenValue
                        }
                    })
                    const xx=await responseinfor.json()
                    console.log(typeof xx)
                    console.log(xx)
                    if(xx.notification=="Get user info successful."){
                        setData(xx);
                    }
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            rounter.push('./pages');
        }
    }
    const objectData=Object.entries(data);
    return(
        <div>
            <h1>user info</h1>
        </div>
    )
}