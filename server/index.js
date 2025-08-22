import express from 'express';
import cors from 'cors';
import helmet from "helmet";

import { postRegister } from './src/api/public/postRegister.js';
import { postLogin } from './src/api/public/postLogin.js';
import { getLogin } from './src/api/public/getLogin.js'
import { PORT } from './src/env.js';
import { getBoxById } from './src/api/public/getBoxById.js';
import { editBoxById } from './src/api/public/editBoxById.js';
import { deleteBoxById } from './src/api/public/deleteBox.js';
import { getBox } from './src/api/public/getBox.js';
import { addBox } from './src/api/public/addBox.js';
import { cookieParser } from './src/middleware/cookieParser.js'
import { userData } from './src/middleware/userData.js'



const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
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
app.get('/api/login', getLogin)

app.post('/api/admin/add_user',addBox);
app.get('/api/admin/students', getBox);
app.get('/api/admin/get_student/:id', getBoxById);
app.post('/api/admin/edit_user/:id', editBoxById)
app.delete('/api/admin/delete/:id', deleteBoxById);




app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send('Server error');
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