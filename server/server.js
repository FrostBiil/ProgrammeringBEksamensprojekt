const express = require('express');
const app = express();
const PORT = 3001; // Sørg for at bruge en anden port end React-appen

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server lytter på port ${PORT}`);
});