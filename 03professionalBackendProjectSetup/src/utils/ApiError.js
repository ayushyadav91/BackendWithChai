class ApiError extends Error {
     constructor(
          statusCode,
          message = "Something went wrong",
          errors= [],
          stack = "",
     ){
          super(message)
          this.statusCode = statusCode
          this.data = null
          this.message = message
          this.success = false
          this.errors = errors


          //ye stack me errors ko dekhne ke leye use karte hai taki pata chale kii kiss kiss file me error aarahi hai
          // ye production me haata bhi dete hai isse
          if(stack){
               this.stack = stack
          } else {
               Error.captureStackTrace(this, this.constructor)
          }

     }
}

export {ApiError};