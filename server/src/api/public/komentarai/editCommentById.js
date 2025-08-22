import {connection} from '../../../db.js'

export async function editCommentById(req, res) {
    const id = req.params.id;
    const { name, comment } = req.body;

    try {
        const sql = `
            UPDATE komentarai
            SET name = ?,comment=?
            WHERE id = ?
        `;
        const values = [name,comment, id];

        const [result] = await connection.execute(sql, values);

        return res.json({
            status: 'success',
            message: 'Comment updated successfully',
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