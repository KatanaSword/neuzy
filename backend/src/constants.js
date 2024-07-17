export const DB_NAME = "Neuzy";

export const options = {
  httpOnly: true,
  secure: true,
};

export const userRole = {
  USER: "USER",
  SUBSCRIBER: "SUBSCRIBER",
  ADMIN: "ADMIN",
};

export const availableUserRole = Object.values(userRole);

export const article = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
};

export const availableArticle = Object.values(article);

export const paymentMethod = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
};

export const availablePaymentMethod = Object.values(paymentMethod);

export const USER_TEMPORARY_TOKEN_EXPIRY = 10 * 60 * 1000;
