import paymentModel from "../models/nosql/payment.model.js";

const createPayment = async (data) => {
  return await paymentModel.create(data);
};

// const updatePayment = async (orderId, updataData) => {
//   return await paymentModel.findByIdAndUpdate({ orderId }, updataData, {
//     new: true,
//   });
// };
const updatePayment = async (orderId, updataData) => {
  return await paymentModel.findOneAndUpdate({ orderId }, updataData, {
    new: true,
  });
};

const getAllPayments = async () => {
  return await paymentModel.find().populate("user", "name");
};

export { createPayment, updatePayment, getAllPayments };
