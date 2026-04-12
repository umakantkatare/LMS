import cookieOptions from "../configs/cookie.config.js";
import {
  editProfileService,
  forgotPasswordService,
  getProfileService,
  loginService,
  registerService,
} from "../services/user.service.js";

const register = async (req, res, next) => {
  try {
    const { user, token } = await registerService({
      ...req.body,
      file: req.file,
    });
    console.log("file_controller", req.file);

    res.cookie("token", token, cookieOptions);
    console.log("user", user);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await loginService(req.body);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      ...cookieOptions,
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await getProfileService(req.user.id);

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = await forgotPasswordService(req.body);
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      email,
    });
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    const user = await editProfileService({
      userId: req.params.id,
      fullName,
      email,
      file: req.file,
    });
    return res.status(200).json({
      success: true,
      message: "user profile update successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export { register, login, logout, getProfile, forgotPassword, editProfile };
