import db from "../config/db.connect.js";

export const addProvience = async (req, res) => {
  try {
    const { provience_name } = req.body;

    const [existingProvience] = await db.query(
      "SELECT * FROM province WHERE province_name = ?",
      [provience_name]
    );

    if (existingProvience.length > 0) {
      return res.status(400).json({ message: "Provience already exists" });
    }

    await db.query("INSERT INTO province (province_name) VALUES (?)", [
      provience_name,
    ]);
    res.status(201).json({
      message: "Provience added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all proviences
export const getAllProviences = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.province_id,
        p.province_name,
        GROUP_CONCAT(d.district_name) as ram
      FROM province p
      LEFT JOIN district d
        ON p.province_id = d.province_id
       GROUP BY p.province_id, p.province_name
    `);

    res.status(200).json({
      message: "successfully retrieved all province name",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addDistrict = async (req, res) => {
  try {
    const { district_name, provience_id } = req.body;
    const [existingProvience] = await db.query(
      "SELECT * FROM province WHERE province_id = ?",
      [provience_id]
    );
    if (existingProvience.length === 0) {
      return res.status(400).json({ message: "Provience does not exist" });
    }

    const [existingDistrict] = await db.query(
      "SELECT * FROM district WHERE district_name = ?",
      [district_name]
    );

    if (existingDistrict.length > 0) {
      return res.status(400).json({ message: "District already exists" });
    }

    await db.query(
      "INSERT INTO district (district_name, province_id) VALUES (?, ?)",
      [district_name, provience_id]
    );
    res.status(201).json({
      message: "District added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllDistricts = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * from district`);
    res.status(200).json({
      message: "successfully retrieved all district name",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addBranch = async (req, res) => {
  try {
    const { branch_name, remarks, district_id } = req.body;
    const [existingDistrict] = await db.query(
      "SELECT * FROM district WHERE district_id = ?",
      [district_id]
    );
    if (existingDistrict.length === 0) {
      return res.status(400).json({ message: "District does not exist" });
    }
    await db.query(
      "INSERT INTO branch (branch_name,remarks, district_id) VALUES (?,?,?)",
      [branch_name, remarks, district_id]
    );
    res.status(201).json({
      message: "Branch added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBranches = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT d.district_name,
       b.branch_name,b.remarks from branch b LEFT JOIN district d 
       ON b.branch_id = d.district_id`);
    res.status(200).json({
      message: "successfully retrieved all branch name",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
