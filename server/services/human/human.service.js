const express = require('express');
const Human = require('./human.model');

// Middleware
async function getHuman(req, res, next){
    let human;

    try {
        human = await Human.findById(req.params.id);

        if(human == null)
            return res.status(404).json({message: `Couldn't find the human`});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.human = human;

    next();
}

async function getAll_req(req, res) {
    try {
        const humans = await Human.find().exec();        
        res.json(humans);
        
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}

async function getOne_req(req, res) {
    res.json(res.human);
}

async function post_req(req, res) {
    const human = new Human({
        name: req.body.name,
        document: req.body.document,
    });    

    try {   
        const newHuman = await human.save();
        res.status(201).json(newHuman);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function patch_req(req, res) {
    if(req.body.name != null){
        res.human.name = req.body.name;
    }
    if(req.body.document != null){
        res.human.document = req.body.document;
    }
    try {
        const updated = await res.human.save()
        res.json(updated);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function delete_req(req, res) {
    try {        
        await res.human.remove();
        res.json({message: 'human deleted'});        
    } catch (error) {
        return res.status(500).json({message: error.message});        
    }
}

module.exports = {
    getAll_req,
    getOne_req,
    post_req,
    patch_req,
    delete_req,
    getHuman
};