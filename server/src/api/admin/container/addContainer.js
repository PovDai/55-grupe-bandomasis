import { connection } from "../../../db.js";

export async function addContainer(req, res) {
    const { size,id_number} = req.body;

    try {
        const sql = `
            INSERT INTO container_details (size,id_number)
            VALUES (?, ?)
        `;
        const values = [size,id_number]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Container added successfully',
            insertedId: result.insertId
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