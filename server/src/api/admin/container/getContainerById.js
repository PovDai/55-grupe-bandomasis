import { connection } from "../../../db.js";

export async function getContainerById(req, res) {
    const id = req.params.id;

    try {
        const sql = "SELECT * FROM container_details WHERE id = ?";
        const [rows] = await connection.execute(sql, [id]);

        return res.json({
            status: 'success',
            container: rows[0] || null, // grąžinam tik vieną dėžę
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: 'error',
            container: null,
            message: error.message
        });
    }
}