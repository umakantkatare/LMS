import contactModel from "../models/nosql/contact.model.js";

const createContact = async (data) => {
  return await contactModel.create(data);
};

const getAllContact = async () => {
  return await contactModel.find().sort({ createdAt: -1 });
};

export { createContact, getAllContact };
