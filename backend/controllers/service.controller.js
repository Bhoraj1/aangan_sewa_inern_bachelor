export const addService = async (req, res) => {

  const { service_name, description, branch_id } = req.body;
  const serviceImg = req.file;
  console.log(req.body);
  console.log(req.file);
  try {
  } catch (error) {
    console.log(error);
  }
};
