import 'dotenv/config'
import express from 'express'
const sever=express()
sever.listen(process.env.PORT,()=>{
    console.log(`Auth-server listening at ${process.env.PORT}`)
})