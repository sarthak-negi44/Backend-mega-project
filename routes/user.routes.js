import {Router} from 'express';
import {upload} from "../src/middlewares/multer.middlewares.js";
import {registerUser,loginUser, logoutUser} from "../src/controllers/user.controllers.js";
import {verifyJWT} from "../src/middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]), registerUser)
router.route("/login").post(loginUser)

// secured route for logout

router.route("/logout").post(verifyJWT, logoutUser)
export default router;