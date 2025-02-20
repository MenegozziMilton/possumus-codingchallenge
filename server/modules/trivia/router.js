const express = require('express');
const router = express.Router();
const triviaController = require('../trivia/controller');

router.get('/categories', triviaController.getCategories);
router.get('/questions', triviaController.getQuestions);

module.exports = router;
