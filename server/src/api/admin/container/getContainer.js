import { connection } from "../../../db.js";
export async function getContainer(req, res) {
  try {
    const sql = "SELECT * FROM container_details";
    const [container] = await connection.execute(sql);

    return res.json({
      status: 'success',
      container: container
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 'error',
      container: []
    });
  }
}