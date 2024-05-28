const User = require("../models/user");

const authenticationMid = async (req, res, next) => {
  const userID = req.cookies.token;
  if (userID) {
    const userLog = await User.findOne({ where: { id: userID } });
    if (userLog) {
      res.locals.isAuth = req.cookies.isAuth;
      res.locals.user = {
        id: userLog.id,
        name: userLog.name,
        email: userLog.email,
        date: userLog.createdAt,
        membership: userLog.membership,
        profile: `/profile`
      };
    } else {
      res.locals.isAuth = 0;
      res.locals.user = null;
    }
  } else {
    res.locals.isAuth = 0;
    res.locals.user = null;
  }
  next();
};

module.exports = authenticationMid;
