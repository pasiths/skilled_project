import express from "express";
import {
  loginCompany,
  loginUser,
  registerCompany,
  registerUser,
  resendVerificationToken,
  testAPI,
  verifyToken,
} from "../controllers/authContoller.js";
import { userValidation } from "../validations/userValidation.js";
import {
  loginValidation,
  tokenValidation,
} from "../validations/authValidation.js";
import { companyValidation } from "../validations/companyValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//test API
router.get("/", (req, res) => {
  res.send("Auth route test API");
});
router.post("/testapi", testAPI);

//registerUser API
router.post("/registerUser", userValidation, registerUser);

//loginUser API
router.post("/loginUser", loginValidation, loginUser);

//companyRegister API
router.post("/registerCompany", companyValidation, registerCompany);

//companyLogin API
router.post("/loginCompany", loginValidation, loginCompany);

//verifyAccount API
router.put("/verifyAccount", tokenValidation, authMiddleware, verifyToken);

//resendVerification API
router.put("/resendVerification", authMiddleware, resendVerificationToken);

export default router;
