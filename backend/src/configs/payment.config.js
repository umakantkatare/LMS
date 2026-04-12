import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
//   throw new Error(`Razorpay keys are missing in .env ${process.env.RAZORPAY_KEY_ID} & ${process.env.RAZORPAY_SECRET}`);
// }

if (!process.env.RAZORPAY_KEY_ID ) {
  console.log('razor pay key not defined')
  
}
if (!process.env.RAZORPAY_SECRET) {
  console.log('razor pay secret not defined')
  
}

// export const razorpay = new Razorpay({
//   key_id: 'rzp_test_SYyHAPk4qZ7dw9',
//   key_secret: 'SwfTcT3PJAKLV7rqrbuCnfYq',
// });

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_SECRET,
});


// rzp_test_SYyHAPk4qZ7dw9 key

// SwfTcT3PJAKLV7rqrbuCnfYq secret


// rzp_test_SYyHAPk4qZ7dw9 