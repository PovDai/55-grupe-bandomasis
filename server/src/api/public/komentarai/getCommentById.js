import { connection } from "../../../db.js";

export async function getCommentById(req, res) {
  const { id } = req.params;

  try {
    const sql = "SELECT * FROM komentarai WHERE id = ?";
    const [rows] = await connection.execute(sql, [id]);

    if (rows.length === 0) {
      return res.json({
        status: "error",
        message: "Comment not found"
      });
    }

    return res.json({
      status: "success",
      comment: rows[0] // VIENAS objektas, ne masyvas
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "Server error"
    });
  }
}