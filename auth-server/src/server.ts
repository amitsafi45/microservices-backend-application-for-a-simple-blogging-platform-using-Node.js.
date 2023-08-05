import 'dotenv/config'
import express from 'express'
import { prisma } from './config/database.config'
const sever=express()



async function main() {
 // const y=await prisma.user.create({data:{username:"lll",email:"ddd@g.com",password:"Admin@123"}})
  // ... you will write your Prisma Client queries here
  //console.log(y)
  sever.listen(process.env.PORT,()=>{
    console.log(`Auth-server listening at ${process.env.PORT}`)
})
}

main()
  .then(async () => {
   
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
