import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export const getDaydata =async()=>{
    const url=`http://192.168.0.7:3002/home/1`
    //const url=`http://192.168.50.57:3002/home/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getmainhomedata =async()=>{
    const url=`http://192.168.0.7:3002/mainhome/1`
    //const url=`http://192.168.50.57:3002/mainhome/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getMicropowerdata =async()=>{
   const url=`http://192.168.0.7:3002/micropower/1`
     //const url=`http://192.168.50.57:3002/micropower/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getloadmanagedata =async()=>{
    const url=`http://192.168.0.7:3002/loadmanage/1`
   // const url=`http://192.168.50.57:3002/loadmanage/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getdispatchdata =async()=>{
    const url=`http://192.168.0.7:3002/dispatch/1`
    //const url=`http://192.168.50.57:3002/dispatch/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getgreenusedata =async()=>{
    const url=`http://192.168.0.7:3002/greenuse/1`
   // const url=`http://192.168.50.57:3002/greenuse/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getstoragemanagedata =async()=>{
    const url=`http://192.168.0.7:3002/storagemanage/1`
   // const url=`http://192.168.50.57:3002/storagemanage/1`
    try{
        const response = await(await fetch(url)).json()
        //console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getalarmdata =async()=>{
   const url=`http://192.168.0.7:3002/alarm`
    //const url=`http://192.168.50.57:3002/alarm`
    try{
        const response = await(await fetch(url)).json()
      //  console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getsecretdata =async()=>{
    //const url=`http://192.168.0.7:3002/alarm`
    const url=`http://192.168.0.7:8085/aes_example`
    try{
        const response = await(await fetch(url)).json()
       // console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}

export const getlogindata =async()=>{
    //const url=`http://192.168.0.7:3002/alarm`
    const url=`http://192.168.0.7:3002/login`
    try{
        const response = await(await fetch(url)).json()
       // console.log(response)
        if (response.code==200){
            return response.data
        }else{
            return ["1"]
        }
    }catch(error){
        console.log('Fetch Error:',error)
    }
}
const styles = StyleSheet.create({})
