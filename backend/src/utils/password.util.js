import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashPassword) => {
  console.log("comparePassword:", plainPassword, hashPassword);
  const password = await bcrypt.compare(plainPassword, hashPassword);
  console.log("after", password);
  return password
};
export { hashPassword, comparePassword };
