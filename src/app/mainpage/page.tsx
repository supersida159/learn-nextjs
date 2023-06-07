'use client'

import { useState,useEffect } from 'react'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { type } from 'os';


export default function Mainpage1(){
    const [datafetch, setData] = useState({});
    const [userdata,setuserdata] = useState({})
    const [refresh, setrefresh] = useState('');
    const rounter=useRouter()
    useEffect(() => {
        fetchData();
      }, []);
     
     
      interface ObjectDisplayProps {
        object: { [key: string]: any };
      }
      const ObjectDisplay: React.FC<ObjectDisplayProps> = ({ object }) => {
        return (
          <div>
            <h2>Object Display</h2>
            <ul>
              {Object.entries(object).map(([key, value]) => (
                <li key={key}>
                  {key}: {value.toString()}
                </li>
              ))}
            </ul>
          </div>
        );
      };  

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
                        setuserdata(xx.data)
                    }
                    else(rounter.push("./pages"))
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

        return (
            <div>
              <h1>My App</h1>
              <ObjectDisplay object={datafetch} />
              <ObjectDisplay object={userdata} />
            </div>
          );
    
    }