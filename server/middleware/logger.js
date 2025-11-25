// @desc    Lohs request to console
const logger = (req, res, next) => {
  // req.authenticationToken =
  //   "Go the user table database and check if user exists. If exists, then assign the user a token. This token is available to whole of the API for performing CRUD operation. We console log this variable in dinProdukter.js API file to see and it worked";
  // console.log("Middleware ran");
  console.log(
    `${req.method} ${req.protocol}: //${req.get("host")} abc ${req.originalUrl}`
  );

  next();
};
export default logger;
