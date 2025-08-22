import {connection} from '../../../db.js'

export async function addComment(req, res) {
    const { name,comment } = req.body;

    try {
        const sql = `
            INSERT INTO komentarai (name,comment)
            VALUES (?, ?)
        `;
        const values = [name,comment]

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Comment added successfully',
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