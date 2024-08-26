const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const sequelize = new Sequelize('counter_web', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log("Conexão estabelecida com sucesso!");
}).catch((error) => {
  console.log("Falha na conexão: " + error);
});

const Counter = sequelize.define('counter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

sequelize.sync().then(() => {
  console.log("Tabela de counters criada com sucesso!");
});

app.use(express.json());

app.get('/', async (req, res) => {
  const counters = await Counter.findAll();
  res.json(counters);
});

app.post('/', async (req, res) => {
  const { name } = req.body;
  const newCounter = await Counter.create({ name, value: 0 });
  res.json(newCounter);
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  const counter = await Counter.findByPk(id);
  if (counter) {
    await counter.update({ value });
    res.json(counter);
  } else {
    res.status(404).json({ mensagem: 'Counter não encontrado' });
  }
});

app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const counter = await Counter.findByPk(id);
  if (counter) {
    await counter.destroy();
    res.json({ mensagem: 'Counter deletado com sucesso' });
  } else {
    res.status(404).json({ mensagem: 'Counter não encontrado' });
  }
});

app.listen(3003, () => {
  console.log('API rodando em http://localhost:3003');
});