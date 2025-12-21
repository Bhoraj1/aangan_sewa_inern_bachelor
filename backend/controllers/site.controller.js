import db from "../config/db.connect.js";

export const addInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, branch_id } = req.body;

    if (!name || !email || !phone || !message || !branch_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [branch] = await db.query(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );

    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await db.query(
      "INSERT INTO inquiry (name, email, phone, message, branch_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, message, branch_id]
    );

    res.status(201).json({
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInquiry = async (req, res) => {
  try {
    const { role, id } = req.user;
    let query;
    let params = [];

    if (role === "admin") {
      query = `
        SELECT 
          i.*,
          b.branch_name
        FROM inquiry i
        LEFT JOIN branch b ON i.branch_id = b.branch_id
        ORDER BY i.created_at DESC
      `;
    } else {
      const [user] = await db.query(
        "SELECT branch_id FROM users WHERE user_id = ?",
        [id]
      );

      if (user.length === 0 || !user[0].branch_id) {
        return res.status(404).json({ message: "Branch not assigned" });
      }

      query = `
        SELECT 
          i.*,
          b.branch_name
        FROM inquiry i
        LEFT JOIN branch b ON i.branch_id = b.branch_id
        WHERE i.branch_id = ?
        ORDER BY i.created_at DESC
      `;
      params = [user[0].branch_id];
    }

    const [inquiries] = await db.query(query, params);

    res.status(200).json({
      message: "Inquiries retrieved successfully",
      data: inquiries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
