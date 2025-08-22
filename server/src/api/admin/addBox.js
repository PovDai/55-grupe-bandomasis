import { connection } from "../../db.js"

export async function addBox(req, res) {
    const { name, weight, image, flammable, perishable } = req.body;

    try {
        const sql = `
            INSERT INTO box_details (name,weight,image, flammable, perishable)
            VALUES (?, ?, ?, ?,?)
        `;
        const values = [name,weight,image, flammable, perishable]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Box added successfully',
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