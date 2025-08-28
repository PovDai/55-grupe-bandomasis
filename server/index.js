import express from 'express';
import cors from 'cors';
import helmet from "helmet";

import { postRegister } from './src/api/public/postRegister.js';
import { postLogin } from './src/api/public/postLogin.js';
import { PORT } from './src/env.js';
import { getBoxById } from './src/api/admin/getBoxById.js';
import { editBoxById } from './src/api/admin/editBoxById.js';
import { deleteBoxById } from './src/api/admin/deleteBox.js';
import { getBox } from './src/api/admin/getBox.js';
import { addBox } from './src/api/admin/addBox.js';
import { cookieParser } from './src/middleware/cookieParser.js'
import { userData } from './src/middleware/userData.js'

import { addContainer } from './src/api/admin/container/addContainer.js';
import { getContainer } from './src/api/admin/container/getContainer.js';
import { getContainerById } from './src/api/admin/container/getContainerById.js';
import { editContainerById } from './src/api/admin/container/editContainerById.js';
import { deleteContainerById } from './src/api/admin/container/deleteContainer.js';
import { getLogin } from './src/api/public/getLogin.js';
import { uploadMovieThumbnailImage } from './src/middleware/uploadMovieThumbnail.js';
import { postImageUpload } from './src/api/admin/movies/postImageUpload.js';






const app = express()


app.use(express.static('public'));
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cookieParser);
app.use(userData)

app.use(cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:5540',
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/register', postRegister);
app.post('/api/login', postLogin);

app.get('/api/login',  getLogin);



app.post('/api/admin/add_user', addBox);
app.get('/api/admin/students', getBox);
app.get('/api/admin/get_student/:id', getBoxById);
app.post('/api/admin/edit_user/:id',editBoxById)
app.delete('/api/admin/delete/:id', deleteBoxById);

app.post('/api/admin/add_container', addContainer);
app.get('/api/admin/containers', getContainer);
app.get('/api/admin/get_container/:id', getContainerById)
app.post('/api/admin/edit_container/:id', editContainerById);
app.delete('/api/admin/deleteContainer/:id', deleteContainerById)

app.post('/api/admin/upload-image', uploadMovieThumbnailImage.single('img'), postImageUpload);


app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            status: 'error',
            msg: `Virsytas failo limitas (${formatFileSize(FILE_SIZE_LIMIT)})`,
        });
    }

    console.log(err);

    return res.status(500).send('Server error');
});

app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
}) 