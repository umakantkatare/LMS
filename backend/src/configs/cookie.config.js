const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  httpOnly: true,
  secure: true, 
  sameSite: "strict", 
};

export default cookieOptions;
  