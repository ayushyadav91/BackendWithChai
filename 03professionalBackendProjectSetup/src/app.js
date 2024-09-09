import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.get('/',async (res,res)=>{
     console.log(`Server is running`)
})

export {app}