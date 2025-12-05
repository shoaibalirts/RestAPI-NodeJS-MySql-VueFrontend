const requireDebugCookie = (req, res, next) => {
  console.log("Cookies received:", req.cookies);

  if (!req.cookies.token_debug) {
    return res.status(403).json({
      success: false,
      msg: "Access denied. cookie token_debug not found.",
    });
  }

  next(); // cookie exists → allow route
};
export default requireDebugCookie;
/*
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
*/
