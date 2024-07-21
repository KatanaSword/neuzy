import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from "nanoid";
import { Subscription } from "../models/subscription.models.js";
import { paymentMethod, userSubscription } from "../constants.js";
import crypto from "crypto";

let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
} catch (error) {
  console.log("RAZORPAY ERROR:", error);
}

const orderFulfillmentHelper = async (orderPaymentId) => {
  const subscription = await Subscription.findOneAndUpdate(
    {
      paymentId: orderPaymentId,
    },
    {
      $set: {
        isPaymentDone: true,
      },
    },
    { new: true }
  );

  return subscription;
};

const generateRazorpayOrder = asyncHandler(async (req, res) => {
  if (!razorpayInstance) {
    console.log("RAZORPAY ERROR `key_id` is mandatory");
    throw new ApiError(500, "Internet server error");
  }

  const orderOptions = {
    amount: parseInt(730) * 100,
    currency: "INR",
    receipt: nanoid(10),
  };

  razorpayInstance.orders.create(
    orderOptions,
    async function (err, razorpayOrder) {
      if (!razorpayOrder || (err && err.error)) {
        return res
          .status(err.statusCode)
          .json(
            new ApiResponse(
              err.statusCode,
              null,
              err.error.reason ||
                "Something went wrong while initialising the razorpay order."
            )
          );
      }
      const unpaidOrder = await Subscription.create({
        subscriber: req.user?._id,
        subscriptionPrice: orderOptions.amount ?? 0,
        plan: userSubscription.PREMIUM,
        paymentProvider: paymentMethod.RAZORPAY,
        paymentId: razorpayOrder.id,
      });

      if (unpaidOrder) {
        return res
          .status(200)
          .json(new ApiResponse(200, razorpayOrder, "Razorpay order generate"));
      } else {
        return res
          .status(500)
          .json(
            new ApiResponse(
              500,
              null,
              "Something went wrong while initialising the razorpay order."
            )
          );
      }
    }
  );
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const subscription = await orderFulfillmentHelper(razorpay_payment_id);
    return res
      .status(200)
      .json(new ApiResponse(201, subscription, "Order place successfully"));
  } else {
    throw new ApiError(400, "Invalid razorpay signature");
  }
});

const getSubscriptionById = asyncHandler(async (req, res) => {});

const getSubscriberListAdmin = asyncHandler(async (req, res) => {});

export { generateRazorpayOrder };
