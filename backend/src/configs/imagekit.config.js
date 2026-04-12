import dotenv from "dotenv";
dotenv.config();

import ImageKit from "@imagekit/nodejs";

if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error(
    "IMAGEKIT_PUBLIC_KEY is not defined in environment variables",
  );
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is not defined in environment variables",
  );
}

if (!process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error(
    "IMAGEKIT_URL_ENDPOINT is not defined in environment variables",
  );
}
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // privateKey: 'private_cWPUWZ0fAgjYzQdpBHwTYExS7kg=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
