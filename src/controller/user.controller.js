import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import {
  getAccessToken,
  getEncryptedPassword,
  getRefreshToken,
  getHashedRefreshToken,
} from "../utils/generateToken.js";

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All feilds are rquired" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exits" });
    }
    const hashPassword = await getEncryptedPassword(password);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    res.status(200).json({
      status: true,
      data: { name: newUser.name, email: newUser.email },
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = getAccessToken(user._id);
    // const refreshToken = getRefreshToken(user._id);
    // const hashedRefreshToken = getHashedRefreshToken(refreshToken);

    // user.refreshToken = hashedRefreshToken;

    await user.save();

    // commented because using for mobile app

    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "strict",
    // });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "strict",
    // });

    res.status(200).json({
      accessToken: accessToken,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};
