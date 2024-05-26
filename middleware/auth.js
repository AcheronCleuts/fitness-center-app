const User = require("../models/user");

const authenticationMid = async (req, res, next) => {
  const tokens = req.headers.cookie;
  if (!tokens) {
    return res.status(401).json({ message: "Erişim için lütfen giriş yapınız!!!" });
  }
  try {
    console.log(tokens + "31");
    const token = tokens.split("=")[1];
    const userLog = await User.findOne({ where: { id: token } });
    console.log(userLog.name);

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token doğrulama hatası: " + error.message });
  }
};

module.exports = authenticationMid;
