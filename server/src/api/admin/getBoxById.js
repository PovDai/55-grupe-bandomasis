import { connection } from "../../db.js ";

export async function getBoxById(req, res) {
    const id = req.params.id;

    try {
        const sql = "SELECT * FROM box_details WHERE id = ?";
        const [rows] = await connection.execute(sql, [id]);

        return res.json({
            status: 'success',
            box: rows[0] || null, // grąžinam tik vieną dėžę
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: 'error',
            box: null,
            message: error.message
        });
    }
}


