import { stat } from "fs/promises";
import { useContext, useState } from "react";
import { FALSE } from "sass";
import { GlobalContext } from "../context/Provider";
import { contactUs } from "../interfaces";
import henceforthApi from "../utils/henceforthApi";

const Contact=()=>{
    const { Toast,loading,setLoading } = useContext(GlobalContext)
    const [state,setState]=useState({}as contactUs)

    const onSubmit=async()=>{
        setLoading(false)
        const item={
           name:state.name,
           email:state.email,
           phone:state.phone,
           message:state.message
        }
        if(!state.name.trim()){ 
            Toast.error("Plase Enter name")
        }if(!state.email.trim()){
            Toast.error("Please Enter email")
        }if(!state.phone){
           Toast.error("Please Enter Phone")
        }if(!state.message.trim()){
            Toast.error("Plase Enter message")
        }
        try{
         let apiRes=await henceforthApi.Common.contact_us(item)
         Toast.success(apiRes.message)
        }catch(error){
          Toast.error(error)
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
            <h1>Contact us</h1>
        </>
    )
}
export default Contact;