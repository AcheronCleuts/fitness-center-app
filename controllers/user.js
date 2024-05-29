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
  res.clearCookie("token").clearCookie("isAuth");
  res.redirect("/");
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt"],
    });

    const userData = users.map((user) => user.dataValues);

    console.log(userData);
    return userData;
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getUser = async (token) => {
  const getUserData = await User.findAll({
    where: {
      id: token,
    },
    attributes: ["id", "name", "email", "createdAt"],
  });
  const userData = getUserData.map((user) => user.dataValues);
  return userData;
};

module.exports = { register, login, logout, getUsers, getUser};
