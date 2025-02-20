const axios = require('axios');

async function fetchCategories() {
  const response = await axios.get('https://opentdb.com/api_category.php');
  return response.data.trivia_categories;
}

async function fetchQuestions(categoryId, difficulty) {
  const response = await axios.get(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
  return response.data.results;
}

module.exports = {
  fetchCategories,
  fetchQuestions,
};