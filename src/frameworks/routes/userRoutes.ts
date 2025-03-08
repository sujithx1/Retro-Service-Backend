import express from "express";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";
import { serviceController, userChatController, userController, userWalletController } from "../dependency_injection/user.di";
import upload from "../../utils/helper/multer";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import { storeController } from "../dependency_injection/store.di";
import { productcontroller } from "../dependency_injection/product.di";
import { admincontroller } from "../dependency_injection/admin.di";
import { cartcontroller } from "../dependency_injection/cart.di";
import { checkoutController } from "../dependency_injection/checkout";
import { wishlistcontroller } from "../dependency_injection/wishlist.di";







const userRouter = express.Router();

userRouter.post("/refresh-token", (req, res) => {
  createAccessToken(req, res, "user");
  
});
userRouter.post("/signup", (req, res) => userController.signUp(req, res));
userRouter.post("/signup/otp", (req, res) =>
  userController.OtpChecking(req, res)
);
userRouter.post("/signup/resendotp", (req, res) =>
  userController.signUp(req, res)
);
userRouter.post("/login", (req, res) => userController.userlogin(req, res));
userRouter.get("/logout", (req, res, next) =>
  userController.User_get_Logout_controll(req, res, next)
);
userRouter.post("/google", (req, res, next) =>
  userController.User_Google_Auth(req, res, next)
);

userRouter.post(
  "/profile/image/:id",
  upload.single("image"),
  (req, res, next) => {
    console.log(req.file);

    Authentication(req, res, next);
    userController.User_put_image_controll(req, res, next);
  }
);

userRouter.put("/profile/:id", Authentication, (req, res, next) => {
  userController.User_Put_controll(req, res, next);
});

userRouter.get(
  "/jobs",

  Authentication,
  (req, res, next) => {
    userController.user_get_allJobs(req, res, next);
  }
);

userRouter.get("/employees", Authentication, (req, res, next) => {
  userController.user_get_allEmplooyees(req, res, next);
});

userRouter.post("/service-booking", Authentication, (req, res, next) => {
  userController.user_post_service_Booking_controll(req, res, next);
});

userRouter.get("/service-booking/:id", Authentication, (req, res, next) => {
  userController.User_get_service_Booking_controll(req, res, next);
});

userRouter.post("/report-feedBack", Authentication, (req, res, next) => {
  userController.User_post_report_feedBack_employee_controll(req, res, next);
});

userRouter.post("/forgot-password/otp", (req, res, next) => {
  userController.User_Post_forgot_password_controll(req, res, next);
});
userRouter.post("/forgot-password/check", (req, res, next) => {
  userController.user_post_forgot_password_otpcheckcontroll(req, res, next);
});
userRouter.post("/forgot-password", (req, res, next) => {
  userController.user_post_newpassword(req, res, next);
});

userRouter.post("/req-services", Authentication, (req, res, next) => {
  serviceController.reqserviceEmployee(req, res, next); 
});

userRouter
  .route("/req-service/:id")
  .all(Authentication) // Apply middleware for both routes
  
  .get((req, res, next) => {
    console.log("GET request");
    serviceController.get_reqServicecontrolle(req, res, next);
  })
  .put((req, res, next) => {
    console.log("PUT request");
    serviceController.userService_PutReqservecontroll(req, res, next);
  });


userRouter.post(
  "/service/payment/razorpay",

  // Authentication,
  (req, res, next) => {
    console.log("payment razorpay");

    serviceController.userServiceRazorpaypayment_Controll(req, res, next);
  }
);
userRouter.post(
"/service/payment/razorpay/confirm/:id",
Authentication,
  (req, res, next) => {
 serviceController.userServiceRazorpaypayment_Confirm_Controll(req,res,next);
  }
);
userRouter.get(
"/booking-history/:id",
Authentication,
  (req, res, next) => {
 serviceController.userService_Bookin_history_Controll(req,res,next);
  }
);


userRouter.get('/service-payment/:id',Authentication,(req,res,next)=>{
  serviceController.userService_GETservicePayment(req,res,next)
})
// userRouter.get('/chats-userId/:id',Authentication,(req,res,next)=>{
//   userChatController.user_getChats(req,res,next)
// })


userRouter.get('/home',Authentication,(req,res,next)=>{
  serviceController.userService_GETsearch(req,res,next)
})
userRouter.put('/location/:id',Authentication,(req,res,next)=>{
  userController.user_putaddlocation(req,res,next)
})
userRouter
  .route("/nearest-employees/:id?")
  .all(Authentication) 
  .get((req, res, next) => {
    serviceController.userService_GETNearestEmployees(req, res, next);
  })
  .put((req, res, next) => {
    serviceController.userService_putreqserviceSpesificEmployee(req, res, next);
  });

userRouter.post(
  "/advance-payment/confirm",

  Authentication,
  (req, res, next) => {

    serviceController.userService_postAdvancePayment(req, res, next);
  }
);

userRouter.get('/chats-userId/:id',Authentication,
  (req,res,next)=>{userChatController.user_getChats(req,res,next)}
)
userRouter.get("/employee/:id", Authentication, (req, res, next) => {
  userController.User_get_employeedetailsControl(req,res,next)
});
userRouter.get("/wallet/userId/:id", Authentication, (req, res, next) => {
  userWalletController.user_getwalletbyuserId_controller(req,res,next)
});
userRouter.post("/report", Authentication, (req, res, next) => {
  userController.User_post_report_feedBack_employee_controll(req,res,next)
});
userRouter.get("/transactions/:id", Authentication, (req, res, next) => {
  serviceController.userService_getTransacationhistory(req,res,next)
});
userRouter.get("/stores", Authentication, (req, res, next) => {
  storeController.getstores20kmUsersdie(req,res,next)
});
userRouter.get("/categories", Authentication, (req, res, next) => {
  admincontroller.Admin_get_categories_controll(req,res,next)
});



userRouter.get('/products/:id',Authentication,(req,res,next)=>{
  productcontroller.getProducts_storeId(req,res,next)
})
userRouter.get('/product/:id',Authentication,(req,res,next)=>{
  productcontroller._getProduct_Id(req,res,next)
})


userRouter
.route('/cart/:id?')
  .all(Authentication)
  .post((req,res,next)=>{
  cartcontroller.addToCart(req,res,next)
})
  .put((req,res,next)=>{
  cartcontroller.updateAddtocart(req,res,next)
})
// .delete((req,res,next)=>{
//   cartcontroller._deletecartId(req,res,next)
// })
  

userRouter.get('/cart-user/:userId',Authentication,(req,res,next)=>{
  cartcontroller.getcartbyUserId(req,res,next)
})

userRouter.put('/cart-remove/:id',Authentication,(req,res,next)=>{
  cartcontroller._deletecartId(req,res,next)


})
   
userRouter.get('/cart-product/:productId',Authentication,(req,res,next)=>{
  cartcontroller._getcartbyproductId(req,res,next)
})
userRouter.get('/store/:id',Authentication,(req,res,next)=>{
 storeController._getStorebyIdcontroll(req,res,next)
})

userRouter.post('/checkout/payment',Authentication,(req,res,next)=>{
 checkoutController._postCheckout(req,res,next)
})

userRouter.get('/order-histories/:id',Authentication,(req,res,next)=>{
 checkoutController._getOrdersbyUserId(req,res,next)
})



userRouter.get('/order-detail/:id',Authentication,(req,res,next)=>{
  checkoutController._getOrdersbyId(req,res,next)})
userRouter.put('/order-detail/:id',Authentication,(req,res,next)=>{
  checkoutController._putOrdercancellReject(req,res,next)})

// .all(Authentication)
// .get((req,res,next)=>{
//   checkoutController._getOrdersbyId(req,res,next)})
  // .post((req,res,next)=>{
  //   console.log('puttttt');
    
  //   checkoutController._putOrdercancellReject(req,res,next)})
  



  userRouter.post('/wishlist',Authentication,(req,res,next)=>{
    wishlistcontroller._postcreateWislist(req,res,next)
  })

 

  
  
  userRouter.get('/wishlist-userId/:id',Authentication,(req,res,next)=>{
    wishlistcontroller._getwishlistsbyUserId(req,res,next)
  })
  
  
  userRouter.delete('/wishlist/:id',Authentication,(req,res,next)=>{
    wishlistcontroller._deletewishlistsbyId(req,res,next)})

export default userRouter;
