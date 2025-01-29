 import  {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

 const userRouter = Router();


// userRouter.post("/register",  userController.registerUser);
userRouter.route("/register").post( 
     upload.fields([
          {
               name: "avatar",
               maxCount: 1
          },
          {
              name:"coverImage",   
              maxCount: 1
          }
          
     ]),
     userController.registerUser);


//userRouter.post("/login", userController.loginUser);
userRouter.route("/login").post(userController.loginUser);

//userRouter.get("/me", userController.getMe);
userRouter.route("/logout").post(verifyJWT, userController.logoutUser);

userRouter.route("refresh-token").post(userController.refreshAccessToken)






export default userRouter;