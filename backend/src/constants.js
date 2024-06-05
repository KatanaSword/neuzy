export const DB_NAME = "Neuzy";

export const userRole = {
  USER: "USER",
  SUBSCRIBER: "SUBSCRIBER",
  AUTHOR: AUTHOR,
  ADMIN: "ADMIN",
};

export const availableUserRole = Object.values(userRole);

export const USER_TEMPORARY_TOKEN_EXPIRY = 10 * 60 * 1000;
