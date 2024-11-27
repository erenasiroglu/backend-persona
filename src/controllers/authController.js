const supabase = require("../config/supabaseConfig");
const {
  validateSignup,
  validateLogin,
} = require("../validators/authValidator");

exports.signup = async (req, res) => {
  console.log("Supabase:", supabase);
  try {
    const { error: validationError } = validateSignup(req.body);
    if (validationError) {
      return res
        .status(400)
        .json({ error: validationError.details[0].message });
    }

    const { email, password, name } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: {
        user: data.user,
        message: "Kayıt başarılı. Lütfen email adresinizi doğrulayın.",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Kayıt işleminde bir hata oluştu",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error: validationError } = validateLogin(req.body);
    if (validationError) {
      return res
        .status(400)
        .json({ error: validationError.details[0].message });
    }

    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(500).json({ error: "Giriş işleminde bir hata oluştu" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { error: validationError } = validateLogin(req.body);
    if (validationError) {
      return res
        .status(400)
        .json({ error: validationError.details[0].message });
    }

    const { email } = req.body;
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Şifre sıfırlama e-postası gönderildi" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Şifre sıfırlama işleminde bir hata oluştu" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Başarıyla çıkış yapıldı" });
  } catch (error) {
    res.status(500).json({ error: "Çıkış işleminde bir hata oluştu" });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
      },
    });

    if (error) throw error;

    res.json({ url: data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.githubAuth = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
      },
    });

    if (error) throw error;

    res.json({ url: data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
