import db from "../config/db.connect.js";

export const addService = async (req, res) => {
  try {
    const { service_name, description, branch_id } = req.body;
    const serviceImg = req.file;

    if (!service_name || !description || !branch_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [branch] = await db.query(
      "SELECT * FROM branch WHERE branch_id = ?",
      [branch_id]
    );

    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const [existingService] = await db.query(
      "SELECT * FROM services WHERE service_name = ?",
      [service_name]
    );

    if (existingService.length > 0) {
      return res.status(400).json({ message: "Service already exists" });
    }

    const serviceImgPath = serviceImg ? serviceImg.path : null;

    await db.query(
      "INSERT INTO services (service_name, description, branch_id, service_image) VALUES (?, ?, ?, ?)",
      [service_name, description, branch_id, serviceImgPath]
    );

    res.status(201).json({
      message: "Service added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async (req, res) => {
  try {
    const [services] = await db.query("SELECT * FROM services");

    res.status(200).json({
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const { service_id } = req.params;

    const [service] = await db.query(
      "SELECT * FROM services WHERE service_id = ?",
      [service_id]
    );

    if (service.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    await db.query("DELETE FROM services WHERE service_id = ?", [service_id]);

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


