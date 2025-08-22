import { connection } from "../../db.js";
export async function getBox(req, res) {
  try {
    const sql = "SELECT * FROM box_details";
    const [box] = await connection.execute(sql);

    return res.json({
      status: 'success',
      box: box
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 'error',
      box: []
    });
  }
}