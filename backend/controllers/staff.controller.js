import db from "../config/db.connect.js";

export const addStaff = async (req, res) => {
  try {
    const { name, email, phone, aaddress, password, description, branch_id } =
      req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !aaddress ||
      !password ||
      !description ||
      !branch_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //1.Check Branch Exists or not
    const [branch] = await db.query(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branch.length === 0) {
      return res.status(400).json({ error: "Branch not found" });
    }

    ///2.Existing Staff or not
    const [existingStaff] = await db.query(
      "SELECT * FROM staff WHERE email = ?",
      [email]
    );
    if (existingStaff.length > 0) {
      return res.status(400).json({ message: "Staff already exists" });
    }
    // 3.if Branch Match then add staff
    await db.query(
      "INSERT INTO staff (name, email, phone, aaddress, password, description, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, phone, aaddress, password, description, branch_id]
    );
    res.status(201).json({ message: "Staff added successfully" });
  } catch (error) {
    console.log(error);
  }
};


