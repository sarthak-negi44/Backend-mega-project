import {Router} from 'express';
import {upload} from "../src/middlewares/multer.middlewares.js";
import {registerUser} from "../src/controllers/user.controllers.js";
const router = Router();
router.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]), registerUser);
export default router;