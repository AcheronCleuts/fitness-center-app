// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//       return res.status(400).send({ message: "Bu e-posta ile bir kullanıcı kayıtlıdır. Lütfen giriş yapınız" });
//     }

//     const newUser = await User.create({
//       name,
//       email,
//       password,
//     });
//     res.status(201).send({ message: "Kayıt işlemi başarıyla gerçekleştirilmiştir" }, user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Kayıt işlemi sırasında beklenmedik bir hata oluştur" }, error);
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).send({ message: "Kullanıcı Bulunamadı" });
//     }

//     if (user.password != password) {
//       return res.status(400).send({ message: "Şifreniz yanlış tekrar deneyiniz" });
//     }

//     const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
//     res
//       .status(200)
//       .cookie("token", token, { expires: new Date(Date.now() + 15 * 60 * 1000) })
//       .send({ message: "Giriş Başarılı" });
//   } catch (error) {
//     res.status(500).send({ message: "Giriş başarısız" });
//   }
// };

// const logout = async (req, res) => {
//   res.clearCookie("token").send({ message: "Cookieler silindi" });
// };

// module.exports = { register, login, logout };

const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("Bu e-posta ile bir kullanıcı kayıtlıdır. Lütfen giriş yapınız");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).send("Kayıt işlemi başarıyla gerçekleştirilmiştir");
  } catch (error) {
    console.error(error);
    res.status(500).send("Kayıt işlemi sırasında beklenmedik bir hata oluştu");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("Kullanıcı Bulunamadı");
    }

    if (user.password !== password) {
      return res.status(400).send("Şifreniz yanlış tekrar deneyiniz");
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res
      .status(200)
      .cookie("token", token, { expires: new Date(Date.now() + 15 * 60 * 1000) })
      .send("Giriş Başarılı");
  } catch (error) {
    console.error(error);
    res.status(500).send("Giriş başarısız");
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").send("Cookieler silindi");
};

module.exports = { register, login, logout };
