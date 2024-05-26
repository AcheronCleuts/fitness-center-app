const User = require("../models/user");
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
    res.redirect("/kayitgiris");
    // res.status(201).send("Kayıt işlemi başarıyla gerçekleştirilmiştir").redirect("/giris");
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

    res
      .status(200)
      .cookie("token", user.id, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: true,
      })
      .cookie("isAuth", "1", {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: true,
      })
      .redirect(`/profil/${user.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Giriş başarısız");
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").send("Cookieler silindi");
};

module.exports = { register, login, logout };
