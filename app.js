const express = require('express');
const checklistsRouter = require('./src/routes/checklist.js');
const rootRouter = require('./src/routes/Index.js');
require('./config/database.js');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set("views", path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter)
app.use('/checklists', checklistsRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado')
}) 