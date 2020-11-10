const express = require('express');
const router = express.Router();
const humanService = require('../services/human/human.service')

// Getting all
router.get('/human/', humanService.getAll_req);

// Getting One
router.get('/human/:id', humanService.getHuman, humanService.getOne_req);

// Creating One
router.post('/human/', humanService.post_req);

// Updating One
// patch atualiza apenas o campo que enviou
// put atualiza o obj inteiro de uma só vez
router.patch('/human/:id', humanService.getHuman, humanService.patch_req);

// Deleting One
router.delete('/human/:id', humanService.getHuman, humanService.delete_req);


module.exports = router;