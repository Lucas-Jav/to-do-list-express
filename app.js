const express = require('express');
const checklistsRouter = require('./src/routes/checklist.js')
require('./config/database.js');

const app = express();

app.use(express.json());


app.use('/checklists', checklistsRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado')
}) 