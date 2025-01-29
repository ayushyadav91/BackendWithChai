const asyncHandler = (requestHandler) =>{
    return  (req, res, next)=>{
          Promise.resolve(requestHandler(req, res, next)).catch((error)=> next(error));
     }  
}

export {asyncHandler}   


//Higher order function 
/* const asyncHandler = () => {}
const asyncHandler = (func) => ()=>{}
const asyncHandler = (func) => async ()=> {}

 */

// const asyncHandler = (fn)=> (req, res, next) => {
//      try{
//        await fn(req, res, next)
//      } catch(error){
//           res.status(err.code || 500).json({
//                success:false,
//                message:err.message,
//           })
//      }
// } 