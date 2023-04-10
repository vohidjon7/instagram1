const updateUserValidate = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (name && !name.length) {
      return res.status(403).json({
        error: "Name is required",
      });
    } else if (name && !name.trim()) {
      return res.status(403).json({
        error: "Name should not be empty",
      });
    }
    if (email && !email.length) {
      return res.status(403).json({
        error: "Email is reuqired",
      });
    } else if (email && !email.trim()) {
      return res.status(403).json({
        error: "Email should not be empty",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {updateUserValidate}