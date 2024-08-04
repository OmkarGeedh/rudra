// import transporter from 'path/to/transporter';

// const sendPasswordRecoveryEmail = asyncHandler(async (req, res, next) => {
//     const { emailUname } = req.body;
  
//     if (!emailUname) {
//       res.status(400);
//       return next(new Error("Field is required"));
//     }
  
//     let userAvailable;
//     if (emailUname.includes("@")) {
//       userAvailable = await UserModel.findOne({ email: emailUname });
//     } else {
//       userAvailable = await UserModel.findOne({ username: emailUname });
//     }
  
//     if (!userAvailable) {
//       res.status(400);
//       return next(new Error("User is not found"));
//     }
  
//     const html = `
//       <p>Hi, ${userAvailable.name},</p>
//       <p>Here's your password recovery link</p>
//       <a href="/forgetpass ${userAvailable._id}">Reset password here</a>
//       <p>Best regards, Libertas</p>
//     `;
  
//     port({
//       service: "gmail",
//       auth: {
//         user: process.env.GOOGLE_ACCOUNT_USER,
//         pass: process.env.GOOGLE_ACCOUNT_PASS,
//       },
//     });
  
//     if (userAvailable) {

//       const info = await transporter.sendMail({
//         from: '"Omkar" <omkar.geedh01@gmail.com>', 
//         to: userAvailable.email,
//         subject: `Reset your password`,
//         html: html,
//       });
  
//       res.status(201).json({
//         success: true,
//         message: "Password recovery email has been sent succesfully",
//         id: userAvailable._id,
//         email: userAvailable.email,
//         info: info,
//       });
//     } else {
//       res.status(400);
//       return next(new Error("Something went wrong!"));
//     }
//   });

// function port(arg0: { service: string; auth: { user: string | undefined; pass: string | undefined; }; }) {
//     throw new Error("Function not implemented.");
// }
