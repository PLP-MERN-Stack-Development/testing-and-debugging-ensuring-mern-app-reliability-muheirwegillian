/**
 * Get dashboard data for authenticated user
 */
const getDashboard = async (req, res, next) => {
  try {
    // User is attached to req by authenticate middleware
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        stats: {
          // Add more stats as needed
          totalItems: 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard
};

