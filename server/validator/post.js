export const postValidate = async (req, res, next) => {
    const { text } = req.fields;
    const { img } = req.files;
    try {
        if (!text) {
            return res.status(403).json({ error: "Title is required" })
        } else if (!text.trim()) {
            return res.status(403).json({ error: "Title is required" })
        }
        if (!img) {
            return res.status(403).json({ error: "Img is required" })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}