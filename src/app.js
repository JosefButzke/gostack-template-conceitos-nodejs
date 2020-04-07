const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repo = { 
    id: uuid(), 
    title, 
    techs,
    likes: 0 
  }

  repositories.push(repo)

  response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex < 0){
    return response.status(400).json('Repositiorio n esxiste')
  }

  repositories[repoIndex] = {...repositories[repoIndex], title, url, techs}

  return response.json(repositories[repoIndex])
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex < 0){
    return res.status(400).json('Repositiorio n esxiste')
  }

  repositories.splice(repositories[repoIndex], 1)

  return res.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repoIndex = repositories.findIndex(r => r.id === id)

  if(repoIndex < 0){
    return response.status(400).json('Repositiorio n esxiste')
  }

  const repo = repositories[repoIndex];

  repositories[repoIndex] = {...repo, likes: repo.likes + 1}

  return response.json(repositories[repoIndex])
});

module.exports = app;
