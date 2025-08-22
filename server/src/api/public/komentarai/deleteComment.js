import { connection } from '../../../db.js';

export async function deleteCommentById(req, res) {
    const id = req.params.id;

    try {
        if (!id || isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid comment ID'
            });
        }

        const sql = "DELETE FROM komentarai WHERE id = ?";
        const [result] = await connection.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Comment deleted successfully',
            deletedId: id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Something unexpected has occurred',
            error: error.message
        });
    }
}