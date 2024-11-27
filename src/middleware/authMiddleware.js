const supabase = require("../config/supabaseConfig");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Yetkilendirme gerekli" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Geçersiz token" });
    }

    req.user = data.user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

module.exports = authMiddleware;
