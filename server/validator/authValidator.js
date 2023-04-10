const userModel = require("../models/users");

const authValidate = async (objs) => {
  const { name, email, password } = objs;
  try {
    if (!name) {
      return { error: "user is required" };
    }
    if (!email) {
      return { error: "email is required" };
    }
    if (!password) {
      return { error: "password is required" };
    }
    let user = await userModel.findOne({ email: email });
    if (user) {
      return { error: "user is already exist" };
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};

const   authValidateLogin = async (objs) => {
  const { email, password } = objs;
  try {
    if (!email) {
      return { error: "email is required" };
    }
    if (!password) {
      return { error: "password is required" };
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authValidate, authValidateLogin };
