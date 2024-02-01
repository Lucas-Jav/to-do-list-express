const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find().populate('tasks');
        res.status(200).render('checklists/Index', {checklists: checklists})
    } catch(err) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir as Listas'})
    }
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render("checklists/new", { checklist: checklist })
    } catch(err) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir as Listas'})
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/edit", { checklist: checklist })
    } catch(error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de lista de tarefas'})

    }
})

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch(err) {
        res.status(422)
    }
})

router.post('/', async (req,res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save();
        res.redirect("/checklists")
    } catch(error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error } })
    }
})

router.put('/:id', async (req, res) => {
    let  { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);
    
    try {
        await checklist.updateOne({ name: name });
        res.status(200).redirect("/checklists");
    } catch(err) {
        let errors = err.erros;
        res.status(422).render('checklists/edit', {checklist: { ...checklist, errors }})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.redirect("/checklists")
    } catch(err) {
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista de tarefas'})
    }
})

module.exports = router;