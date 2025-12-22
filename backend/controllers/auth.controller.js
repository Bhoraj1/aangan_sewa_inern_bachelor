import db from "../config/db.connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = user[0];

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: userData.user_id, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: userData.user_id,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Signout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addBranchManager = async (req, res) => {
  try {
    const { email, password, branch_id } = req.body;

    if (!email || !password || !branch_id) {
      return res
        .status(400)
        .json({ message: "Email, password and branch_id are required" });
    }

    const [branch] = await db.query(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );

    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password, role, branch_id) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, "branch_manager", branch_id]
    );

    res.status(201).json({
      message: "Branch manager added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBranchManagers = async (req, res) => {
  try {
    const [managers] = await db.query(`
      SELECT 
        u.user_id,
        u.email,
        u.role,
        u.created_at,
        b.branch_name,
        b.branch_id
      FROM users u
      LEFT JOIN branch b ON u.branch_id = b.branch_id
      WHERE u.role = 'branch_manager'
    `);

    res.status(200).json({
      message: "Branch managers retrieved successfully",
      data: managers
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBranchManager = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [user] = await db.query(
      "SELECT * FROM users WHERE user_id = ? AND role = 'branch_manager'",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Branch manager not found" });
    }

    await db.query("DELETE FROM users WHERE user_id = ?", [user_id]);

    res.status(200).json({
      message: "Branch manager deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};