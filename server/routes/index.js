const Router = require("express")
const router = Router();
const users = require("../controller/userController")
const product = require("../controller/productController")



const auth = require("../middleware/auth")


router.post("/signup", users.signUp);

router.post('/login', users.login);

router.post('/createProduct', auth.auth, product.createProduct);
router.get('/findProductById/:id', auth.auth, product.findProductById);
router.get('/findProductList', auth.auth, product.findProductList);
router.put('/updateProduct/:id', auth.auth, product.updateProduct);
router.delete('/deleteProductById/:id', auth.auth, product.deleteProductById);




module.exports = router;

