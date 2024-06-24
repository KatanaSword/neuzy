export const DB_NAME = "Neuzy";

export const options = {
  httpOnly: true,
  secret: true,
};

export const userRole = {
  USER: "USER",
  SUBSCRIBER: "SUBSCRIBER",
  AUTHOR: "AUTHOR",
  ADMIN: "ADMIN",
};

export const availableUserRole = Object.values(userRole);

export const userSubscription = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
};

export const availableUserSubscription = Object.values(userSubscription);

export const paymentMethod = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
};

export const availablePaymentMethod = Object.values(paymentMethod);

export const USER_TEMPORARY_TOKEN_EXPIRY = 10 * 60 * 1000;
