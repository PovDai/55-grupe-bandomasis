import { connection } from "../../db.js";  

export async function editBoxById(req, res) {
    const id = req.params.id;
    const { name, weight, image, flammable, perishable} = req.body;
  

    try {
        const sql = `
            UPDATE box_details 
            SET name = ?, weight = ?, image = ?, flammable = ?, perishable = ?
            WHERE id = ?
        `;
        const values = [name, weight, image, flammable, perishable, id];

        const [result] = await connection.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.json({
                status: 'error',
                message: 'Box not found'
            });
        }

        return res.json({
            status: 'success',
            message: 'Box updated successfully',
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