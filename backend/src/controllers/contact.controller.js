import { submitContactService } from "../services/contact.service.js";

const submitContact = async (req, res, next) => {
  try {
    const result = await submitContactService(req.body);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { submitContact };
