import { createContact } from "../repositories/contact.repository.js";
import ApiError from "../utils/error.util.js";
import logger from "../utils/logger.util.js";

// const submitContactService  = async ({ fullName, email, subject, message }) => {
//   // const { fullName, email, subject, message } = data;
//   try {
//     if (!fullName || !email || !subject || !message) {
//       throw new ApiError("All fields are required", 400);
//     }
//     const contact = createContact({
//       fullName,
//       email,
//       subject,
//       message,
//     });
//     // const contact = createContact(data);
//     return contact;
//   } catch (error) {
//     logger.error("Error in create contact", {
//       message: error.message,
//     });
//     throw error;
//   }
// };

const submitContactService = async ({ name, email, subject, message }) => {
  logger.info("Contact service called", { email, subject });

  try {
    if (!name || !email || !subject || !message) {
      logger.warn("Validation failed in contact service", {
        fullName,
        email,
      });

      throw new ApiError("All fields are required", 400);
    }

    const contact = await createContact({
      name,
      email,
      subject,
      message,
    });

    logger.info("Contact created successfully", {
      id: contact._id,
      email: contact.email,
    });

    return contact;
  } catch (error) {
    logger.error("Error in contact service", {
      message: error.message,
      stack: error.stack,
      payload: { fullName, email, subject },
    });

    throw error;
  }
};

export { submitContactService  };
