"use client";
import  React from 'react';
import axios from 'axios';
import { useState} from 'react';
import * as XLSX from 'xlsx';



export default function Home() {

    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const[load,setLoad]=useState('hidden');

    const [form,setForm]=useState({
        email:"",
        name:"",
        ins:"",
        Wnumber:"",
        events:[],
        elist:'',
        //elist:[],
        participants:"",
        coaches:"",
       /* url:[],
        transactionid:""*/
    })
    const [error,setError]=useState('');
    const [submitdisable,setSubmitdisable]=useState(false);  
    const [success,setSuccess]=useState(true);
    

    const handle = async (e) => {
        setLoad('flex')
        
        e.preventDefault();
        const formData1 = new FormData();
        //const formData2 = new FormData();
        formData1.append('file', file1);
        //formData2.append('file', file2);
        formData1.append('upload_preset','vriddhi');
        //formData2.append('upload_preset','vriddhi');
        
            //const list=[]
            const response1 = await fetch(
              'https://api.cloudinary.com/v1_1/dlt7pwi85/image/upload',
              {
                method:'POST',
                body:formData1
              }
            ).then(r=>r.json())
           
           // list.push(response1.secure_url)
           

            /*const response2 = await fetch(
                'https://api.cloudinary.com/v1_1/dlt7pwi85/image/upload',
                {
                  method:'POST',
                  body:formData2
                }
              ).then(r=>r.json())
             list.push(response2.secure_url)*/
      
if ( !form.email || !form.name || form.events.length==0 || !form.elist || !form.ins || !form.Wnumber  || !form.participants || !form.coaches || !response1.secure_url /* || !form.transactionid || form.url.length==0*/  ){
         
    setError("Fill All Fields Please")
    setLoad('hidden')
          return ;
      }
        
    
      setError("");
      setSubmitdisable(true);
      setSuccess(false);
      const data =JSON.stringify({
        email:form.email,
        name:form.name,
        ins:form.ins,
        events:form.events,
        elist:form.elist,
        Wnumber:form.Wnumber,
        participants:form.participants,
        logo:response1.secure_url,
        coaches:form.coaches,
     
       // transactionid:form.transactionid
        
    })
  
   

      try{
        await fetch('api/user',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:data
        })
      } catch(error){
        console.log(error)
      }
    }
      
  return (<div className=' w-[100%] r:h-[100%] h-[100%] bg-[#111A21] pt-[70px]'>
        <div className='h-[80vh] w-[100%] '>
            <div className='font-nidus text-center h-[100%] w-[100%] md:text-3xl text-xl pt-[25vh]'>Registrations for Vriddhi 2023 has concluded<br/>See you next year<br/><br/>
            <a href="https://www.instagram.com/vriddhi.nitr/?hl=en"><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-xl">
  Keep me updated
</button></a>
            </div>
        </div>
      

   </div>
  )
}
