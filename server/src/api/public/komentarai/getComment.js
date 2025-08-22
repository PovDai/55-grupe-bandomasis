import {connection} from '../../../db.js'
export async function getComments(req, res) {
  try {
    const sql = "SELECT * FROM komentarai";
    const [comments] = await connection.execute(sql);

    return res.json({
      status: 'success',
      comments: comments
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 'error',
      comments: []
    });
  }
}