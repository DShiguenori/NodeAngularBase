const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find().exec();        
        res.json(subscribers);
        
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
});

// Getting One
router.get('/:id', getSubscriber, async (req, res) => {
    // req.params.id
    res.json(res.subscriber);
});

// Creating One
router.post('/', async (req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        canal: req.body.canal,
    });    

    try {   
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

});

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    // patch atualiza apenas o campo que enviou
    // put atualiza o obj inteiro de uma só vez

    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.canal != null){
        res.subscriber.canal = req.body.canal;
    }
    try {
        const updated = await res.subscriber.save()
        res.json(updated);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    
});

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {        
        await res.subscriber.remove();
        res.json({message: 'subscriber deletado'});        
    } catch (error) {
        return res.status(500).json({message: error.message});        
    }
});

// Middleware
async function getSubscriber(req, res, next){
    let subscriber;

    try {
        subscriber = await Subscriber.findById(req.params.id);

        if(subscriber == null)
            return res.status(404).json({message: 'Não pode encontrar o subscriber'});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.subscriber = subscriber;

    next();
}


module.exports = router;