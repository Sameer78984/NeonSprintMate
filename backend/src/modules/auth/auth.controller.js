/**
 * Dummy Controller for Testing
 * These functions simulate the responses for /auth endpoints.
 */

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Simulate successful registration
    return res.status(201).json({
      message: "Test: User registered successfully",
      user: { username, email },
      note: "Bcrypt hashing and Neon DB storage will be implemented here.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Authenticate using Passport's local strategy logic manually for this dummy controller
    // In a real app with passport.authenticate('local'), this is handled by the strategy.
    // Here we manually call req.login to establish the session.
    const user = { id: "dummy-id-123", email, username: "test_user" };

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Session creation failed" });
      }
      return res.status(200).json({
        message: "Test: Login successful",
        user,
        note: "Session established via Passport.",
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/auth/logout
export const logout = (req, res) => {
  return res.status(200).json({
    message: "Test: Logged out successfully",
    note: "Passport session.destroy() will be called here.",
  });
};

// GET /api/auth/me
export const getMe = (req, res) => {
  return res.status(200).json({
    message: "Test: Current user fetched",
    user: {
      username: "test_user",
      email: "test@example.com",
    },
    note: "This will normally return req.user from Passport.",
  });
};
