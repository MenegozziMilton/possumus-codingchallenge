const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const triviaRouter = require('./modules/trivia/router');
app.use('/api/trivia', triviaRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
