const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userPostQuery = async (objs) => {
  try {
    const { name, email, password } = objs;

    let user = await userModel.findOne({ email });
    if (user) {
      return {
        error: "This user email is already exist",
      };
    }
    let hash = await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });

    let data = await userModel.create({
      name,
      email,
      password: hash,
    });

    let token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user:data };
  } catch (error) {
    console.log(error);
  }
};

const userLoginQuery = async (objs) => {
  try {
    let { password, email } = objs;

    let user = await userModel.findOne({ email });
    if (!user) {
      return {
        error: "Email is not found",
      };
    }
    let isCorrect = bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return {
        error: "Password is not match",
      };
    }
    let token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token, user: { name: user.name, email: user.email } };
  } catch (error) {
    console.log(error);
  }
};

const userUpdateQuery = async (objs, id) => {
  try {
    const { name, email, password } = objs;

    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: "This user is not defined",
      };
    }
    let hash = await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });

    let data = await userModel.findByIdAndUpdate(
      id,
      {
        name: name ? name : user.name,
        email: email ? email : user.email,
        password: user.password,
      },
      { new: true }
    );

    // let token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userPostQuery, userLoginQuery, userUpdateQuery };
