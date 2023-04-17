export const registerValidate = async (req, res, next) => {
    const { name, email, password, login } = req.fields;
    try {

        if (!name) {
            return res.status(403).json({ error: "User is required" })
        }
        if (!login) {
            return res.status(403).json({ error: "User is required" })
        }
        if (!email) {
            return res.status(403).json({ error: "Email is required" })
        }
        if (!password) {
            return res.status(403).json({ error: "Password is required" })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
export const loginValidate = async (req, res, next) => {
    const { password, login } = req.fields;
    try {
        if (!login) {
            return res.status(403).json({ error: "User is required" })
        }
        if (!password) {
            return res.status(403).json({ error: "Password is required" })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
export const updateValidate = async (req, res, next) => {
    try {
      const { name, email } = req.fields;
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