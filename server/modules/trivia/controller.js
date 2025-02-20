const triviaService = require('../trivia/services');

async function getCategories(req, res) {
  try {
    const categories = await triviaService.fetchCategories();
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function getQuestions(req, res) {
  try {
    const { category, difficulty } = req.query;
    if (!category || !difficulty) {
      return res.status(400).json({ error: 'Category and difficulty are required' });
    }

    const categoryId = Number(category);
    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Category must be a valid number' });
    }

    const questions = await triviaService.fetchQuestions(categoryId, difficulty);
    return res.status(200).json({ data: questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ error: 'Failed to fetch questions' });
  }
}

module.exports = {
  getCategories,
  getQuestions,
};