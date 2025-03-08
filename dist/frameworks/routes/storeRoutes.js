"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_di_1 = require("../dependency_injection/store.di");
const userAuthentication_1 = require("../../interfaces/middleware/userside/userAuthentication");
const admin_di_1 = require("../dependency_injection/admin.di");
const jwt_auth_token_1 = require("../../interfaces/jwt/jwt_auth_token");
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_auth_token_1.createAccessToken)(req, res, "store");
});
router.post('/register', (req, res, next) => {
    store_di_1.storeController.signUp(req, res, next);
});
router.route('/otp')
    .post((req, res, next) => {
    store_di_1.storeController.Otp_checkingController(req, res, next);
})
    .put((req, res, next) => {
    store_di_1.storeController.signUp(req, res, next);
});
router.post('/login', (req, res, next) => {
    store_di_1.storeController.login(req, res, next);
});
router.get('/categories', userAuthentication_1.Authentication, (req, res, next) => {
    admin_di_1.admincontroller.Admin_get_categories_controll(req, res, next);
});
router.post('/product', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController.Add_product(req, res, next);
});
router.get('/products/:id?', userAuthentication_1.Authentication, (req, res, next) => {
    if (req.params.id) {
        store_di_1.storeController.getProductsByStore(req, res, next);
    }
    else {
        store_di_1.storeController.getAllproducts(req, res, next);
    }
});
router.put('/location/:id', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController.putlocation(req, res, next);
});
router.get('/logout', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController.storeLogout(req, res, next);
});
router.route('/product/:id')
    .all(userAuthentication_1.Authentication)
    .get((req, res, next) => {
    store_di_1.storeController.getStoreProduct(req, res, next);
})
    .put((req, res, next) => {
    store_di_1.storeController.putStoreProduct(req, res, next);
});
router.get('/orders/:id', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController._getordersbyStoreIdcontroll(req, res, next);
});
router.put('/order/:id', userAuthentication_1.Authentication, (req, res, next) => {
    store_di_1.storeController._putOrdercompletecontroll(req, res, next);
});
exports.default = router;
