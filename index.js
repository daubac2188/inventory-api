const express = require('express');
const path = require('path')
import {sql} from '@vercel/postgres'

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/jobs', async (request, response)=>{
try {
  const {rows} = await sql`SELECT * FROM job`
  console.log(rows)
  response.status(200).send(rows)
  
} catch (error) {
  response.status(404).send(error)
}
})

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});



app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})