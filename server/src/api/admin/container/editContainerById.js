import { connection } from "../../../db.js";

export async function editContainerById(req, res) {
    const id = req.params.id;
    const { size,id_number } = req.body;

    try {
        const sql = `
            UPDATE container_details 
            SET size = ?, id_number = ?
            WHERE id = ?
        `;
        const values = [size,id_number, id];

        const [result] = await connection.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.json({
                status: 'error',
                message: 'Container not found'
            });
        }

        return res.json({
            status: 'success',
            message: 'Container updated successfully',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: 'error',
            message: 'Something unexpected has occurred',
            error: error.message
        });
    }
}