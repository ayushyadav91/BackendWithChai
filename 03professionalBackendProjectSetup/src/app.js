import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


//Middlewares 1
app.use(cors({
     origin:process.env.CORS_ORIGIN,
     credentials:true,
}));
//middleware 2 jo data aaraha hai json me kuch limit to rakhne padegi na varna server 
// crash nh hojayega to jo data aata jai uske leye aise bhi kaam karte hai 
// same aise he kuch POST CALL me padete time padhata tha tmne
app.use(express.json({limit:"16kb"}));

/*middleware 3 jaise jo data url me aata hai bhat exercises kari hai uspe to
 chezo ko configure karne ke leye aise middle ware lagate hai
*/
app.use(express.urlencoded({extended:true, limit:"16kb"}));//yaha pe limit  constant(static) pe le sata hu 

//middleware 4 koi file aai ya imanges aayi to mai mere server me story rakhna chata hu to ye bus vahi configuration hota hai
app.use(express.static("public"));

//middleware 5
app.use(cookieParser({}))


app.get('/',async (req,res)=>{
     console.log(`Server is running`)
})

export {app}