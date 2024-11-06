import {
  regsiterUser,
  loginUser,
  triggerPwdRecoveryMail,
  resetPassword,
  checkPasswordReset,
} from "./auth-service.js";

export const login = async (req, res) => {
  const [data, error] = await loginUser(req.body);

  if (error) {
    res.status(400).json({
      message: "Could not sign in user",
      error,
    });
    return;
  }

  res.json(data);
};

export const register = async (req, res) => {
  const user = req.body;

  const [data, error] = await regsiterUser(user);

  if (error) {
    res.status(400).json({
      message: "Could not register user",
      error,
    });
    return;
  }

  res.status(201).json({
    successful: true,
    message: "User created successfully",
  });
};

export const passwordRecovery = async (req, res) => {
  const email = req.body.email;
  const [data, error] = await triggerPwdRecoveryMail(email);
  if (error) {
    res.status(500).json({ error });
    return;
  }
  res.status(201).json(data);
};

export const passwordReset = async (req, res) => {
  const { id, code, password } = req.body;
  const [data, error] = await resetPassword(id, code, password);
  if (error) {
    res.status(500).json({ error });
    return;
  }
  res.status(201).json(data);
};

export const checkPasswordResetDetail = async (req, res) => {
  const { id } = req.body;
  const [isAvailable, error] = await checkPasswordReset(id);
  res.status(201).json({ isAvailable });
};
