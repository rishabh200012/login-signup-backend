import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const getEncryptedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const getHashedRefreshToken = (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

export const getAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SecretKeyAccess, {
    expiresIn: "30d",
  });
  return token;
};

export const getRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SecretKeyRefresh, {
    expiresIn: "30d",
  });
  return token;
};
