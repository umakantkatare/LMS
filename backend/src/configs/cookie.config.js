const cookieOptions = {
 httpOnly: true,
  secure: true, 
  sameSite: "strict", 
};

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
// };

export default cookieOptions;
  