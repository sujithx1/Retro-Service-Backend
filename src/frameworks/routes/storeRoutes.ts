import express from "express";
import { storeController } from "../dependency_injection/store.di";
import { Authentication } from "../../interfaces/middleware/userside/userAuthentication";
import { admincontroller } from "../dependency_injection/admin.di";
import { createAccessToken } from "../../interfaces/jwt/jwt_auth_token";




const router=express.Router();

router.post("/refresh-token", (req, res) => {
  createAccessToken(req, res, "store");
  
});
router.post("/register",(req,res,next)=>{
    storeController.signUp(req,res,next);
});


router.route("/otp")
.post((req,res,next)=>{
    storeController.Otp_checkingController(req,res,next);

})
.put((req,res,next)=>{
    storeController.signUp(req,res,next);
});



router.post("/login",(req,res,next)=>{
    storeController.login(req,res,next);

});

router.get("/categories",Authentication,(req,res,next)=>{
    admincontroller.Admin_get_categories_controll(req,res,next);

});
router.post("/product",Authentication,(req,res,next)=>{
    storeController.Add_product(req,res,next);

});



router.get("/products/:id?", Authentication, (req, res, next) => {
    if (req.params.id) {
        storeController.getProductsByStore(req, res, next);
    } else {
        storeController.getAllproducts(req, res, next);
    }
});

router.put("/location/:id",Authentication,(req,res,next)=>{
    storeController.putlocation(req,res,next);
});
router.get("/logout",Authentication,(req,res,next)=>{
    storeController.storeLogout(req,res,next);
});



router.route("/product/:id")
.all(Authentication)
.get((req,res,next)=>{
    storeController.getStoreProduct(req,res,next);
})
.put((req,res,next)=>{

 storeController.putStoreProduct(req,res,next);
});


router.get("/orders/:id",Authentication,(req,res,next)=>{
    storeController._getordersbyStoreIdcontroll(req,res,next);

});

router.route("/order/:id")
.all(Authentication)
.put((req,res,next)=>{
    storeController._putOrdercompletecontroll(req,res,next);
    
})
.get((req,res,next)=>{
    storeController._getOrderDetailcontroll(req,res,next);
});

export default router;
router.get("/wallet/:id",Authentication,(req,res,next)=>{
    storeController._getWalletsbyStoreIdcontroller(req,res,next);

});