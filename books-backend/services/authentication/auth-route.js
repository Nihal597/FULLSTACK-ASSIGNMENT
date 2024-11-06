import { Router } from "express";

import {
  register,
  login,
  passwordRecovery,
  passwordReset,
  checkPasswordResetDetail,
} from "./auth-controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/password-recovery", passwordRecovery);

router.post("/reset-password", passwordReset);

router.post("/check-password-recovery", checkPasswordResetDetail);

export default router;
