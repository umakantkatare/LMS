import userModel from "../models/nosql/user.model.js";

const createUser = (data) => {
  return userModel.create(data);
};

const findById = (id) => {
  return userModel.findById(id);
};

const findByEmail = (email) => {
  return userModel.findOne({ email });
};

const findByEmailWithPassword = (email) => {
  return userModel.findOne({ email }).select("+password");
};

const saveUser = (user) => {
  return user.save()
}

const editProfileById = async (userId, payload) => {
  return await User.findByIdAndUpdate(
    userId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};

export { createUser, findById, findByEmail, findByEmailWithPassword, saveUser, editProfileById };
