export const isManager = (req, res, next) => {
  try {
    if (req.user.role !== 'branch_manager') {
      return res.status(403).json({
        message: "Access denied. Branch manager role required"
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};