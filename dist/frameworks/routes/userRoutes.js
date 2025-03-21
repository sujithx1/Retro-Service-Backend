"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const user_di_1 = require("../dependency_injection/user.di");
const multer_1 = __importDefault(require("../../utils/helper/multer"));
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const store_di_1 = require("../dependency_injection/store.di");
const product_di_1 = require("../dependency_injection/product.di");
const admin_di_1 = require("../dependency_injection/admin.di");
const cart_di_1 = require("../dependency_injection/cart.di");
const checkout_1 = require("../dependency_injection/checkout");
const wishlist_di_1 = require("../dependency_injection/wishlist.di");
const userRouter = express_1.default.Router();
userRouter.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "user");
});
userRouter.post("/signup", (req, res) => user_di_1.userController.signUp(req, res));
userRouter.post("/signup/otp", (req, res) => user_di_1.userController.OtpChecking(req, res));
userRouter.post("/signup/resendotp", (req, res) => user_di_1.userController.signUp(req, res));
userRouter.post("/login", (req, res) => user_di_1.userController.userlogin(req, res));
userRouter.get("/logout", (req, res, next) => user_di_1.userController.User_get_Logout_controll(req, res, next));
userRouter.post("/google", (req, res, next) => user_di_1.userController.User_Google_Auth(req, res, next));
userRouter.post("/profile/image/:id", multer_1.default.single("image"), (req, res, next) => {
    console.log(req.file);
    (0, userAuthentication_1.Authentication)(req, res, next);
    user_di_1.userController.User_put_image_controll(req, res, next);
});
userRouter.put("/profile/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.User_Put_controll(req, res, next);
});
userRouter.get("/jobs", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.user_get_allJobs(req, res, next);
});
userRouter.get("/employees", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.user_get_allEmplooyees(req, res, next);
});
userRouter.post("/service-booking", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.user_post_service_Booking_controll(req, res, next);
});
userRouter.get("/service-booking/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.User_get_service_Booking_controll(req, res, next);
});
userRouter.post("/report-feedBack", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.User_post_report_feedBack_employee_controll(req, res, next);
});
userRouter.post("/forgot-password/otp", (req, res, next) => {
    user_di_1.userController.User_Post_forgot_password_controll(req, res, next);
});
userRouter.post("/forgot-password/check", (req, res, next) => {
    user_di_1.userController.user_post_forgot_password_otpcheckcontroll(req, res, next);
});
userRouter.post("/forgot-password", (req, res, next) => {
    user_di_1.userController.user_post_newpassword(req, res, next);
});
userRouter.post("/req-services", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.reqserviceEmployee(req, res, next);
});
userRouter
    .route("/req-service/:id")
    .all(userAuthentication_1.Authentication) // Apply middleware for both routes
    .get((req, res, next) => {
    console.log("GET request");
    user_di_1.serviceController.get_reqServicecontrolle(req, res, next);
})
    .put((req, res, next) => {
    console.log("PUT request");
    user_di_1.serviceController.userService_PutReqservecontroll(req, res, next);
});
userRouter.post("/service/payment/razorpay", 
// Authentication,
(req, res, next) => {
    console.log("payment razorpay");
    user_di_1.serviceController.userServiceRazorpaypayment_Controll(req, res, next);
});
userRouter.post("/service/payment/razorpay/confirm/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userServiceRazorpaypayment_Confirm_Controll(req, res, next);
});
userRouter.get("/booking-history/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userService_Bookin_history_Controll(req, res, next);
});
userRouter.get('/service-payment/:id', userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userService_GETservicePayment(req, res, next);
});
// userRouter.get('/chats-userId/:id',Authentication,(req,res,next)=>{
//   userChatController.user_getChats(req,res,next)
// })
userRouter.get('/home', userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userService_GETsearch(req, res, next);
});
userRouter.put('/location/:id', userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.user_putaddlocation(req, res, next);
});
userRouter
    .route("/nearest-employees/:id?")
    .all(userAuthentication_1.Authentication)
    .get((req, res, next) => {
    user_di_1.serviceController.userService_GETNearestEmployees(req, res, next);
})
    .put((req, res, next) => {
    user_di_1.serviceController.userService_putreqserviceSpesificEmployee(req, res, next);
});
userRouter.post("/advance-payment/confirm", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userService_postAdvancePayment(req, res, next);
});
userRouter.get('/chats-userId/:id', userAuthentication_1.Authentication, (req, res, next) => { user_di_1.userChatController.user_getChats(req, res, next); });
userRouter.get("/employee/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.User_get_employeedetailsControl(req, res, next);
});
userRouter.get("/wallet/userId/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userWalletController.user_getwalletbyuserId_controller(req, res, next);
});
userRouter.post("/report", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.User_post_report_feedBack_employee_controll(req, res, next);
});
userRouter.get("/transactions/:id", userAuthentication_1.Authentication, (req, res, next) => {
    user_di_1.serviceController.userService_getTransacationhistory(req, res, next);
});
userRouter.get("/stores", userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController.getstores20kmUsersdie(req, res, next);
});
userRouter.get("/categories", userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_categories_controll(req, res, next);
});
userRouter.get('/products/:id', userAuthentication_1.Authentication, (req, res, next) => {
    product_di_1.productcontroller.getProducts_storeId(req, res, next);
});
userRouter.get('/product/:id', userAuthentication_1.Authentication, (req, res, next) => {
    product_di_1.productcontroller._getProduct_Id(req, res, next);
});
userRouter
    .route('/cart/:id?')
    .all(userAuthentication_1.Authentication)
    .get((req, res, next) => {
    cart_di_1.cartcontroller._getBycartId(req, res, next);
})
    .post((req, res, next) => {
    cart_di_1.cartcontroller.addToCart(req, res, next);
})
    .put((req, res, next) => {
    cart_di_1.cartcontroller.updateAddtocart(req, res, next);
});
// .delete((req,res,next)=>{
//   cartcontroller._deletecartId(req,res,next)
// })
userRouter.get('/cart-user/:userId', userAuthentication_1.Authentication, (req, res, next) => {
    cart_di_1.cartcontroller.getcartbyUserId(req, res, next);
});
userRouter.put('/cart-remove/:id', userAuthentication_1.Authentication, (req, res, next) => {
    cart_di_1.cartcontroller._deletecartId(req, res, next);
});
userRouter.get('/cart-product/:productId', userAuthentication_1.Authentication, (req, res, next) => {
    cart_di_1.cartcontroller._getcartbyproductId(req, res, next);
});
userRouter.get('/store/:id', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController._getStorebyIdcontroll(req, res, next);
});
userRouter.post('/checkout/payment', userAuthentication_1.Authentication, (req, res, next) => {
    checkout_1.checkoutController._postCheckout(req, res, next);
});
userRouter.get('/order-histories/:id', userAuthentication_1.Authentication, (req, res, next) => {
    checkout_1.checkoutController._getOrdersbyUserId(req, res, next);
});
userRouter.get('/order-detail/:id', userAuthentication_1.Authentication, (req, res, next) => {
    checkout_1.checkoutController._getOrdersbyId(req, res, next);
});
userRouter.put('/order-detail/:id', userAuthentication_1.Authentication, (req, res, next) => {
    checkout_1.checkoutController._putOrdercancellReject(req, res, next);
});
// .all(Authentication)
// .get((req,res,next)=>{
//   checkoutController._getOrdersbyId(req,res,next)})
// .post((req,res,next)=>{
//   console.log('puttttt');
//   checkoutController._putOrdercancellReject(req,res,next)})
userRouter.post('/wishlist', userAuthentication_1.Authentication, (req, res, next) => {
    wishlist_di_1.wishlistcontroller._postcreateWislist(req, res, next);
});
userRouter.get('/wishlist-userId/:id', userAuthentication_1.Authentication, (req, res, next) => {
    wishlist_di_1.wishlistcontroller._getwishlistsbyUserId(req, res, next);
});
userRouter.delete('/wishlist/:id', userAuthentication_1.Authentication, (req, res, next) => {
    wishlist_di_1.wishlistcontroller._deletewishlistsbyId(req, res, next);
});
userRouter.get('/product', userAuthentication_1.Authentication, (req, res, next) => {
    product_di_1.productcontroller._getProductByearch(req, res, next);
});
exports.default = userRouter;
