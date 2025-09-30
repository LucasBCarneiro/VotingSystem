const express = require('express');
const bodyParser = require('body-parser');
const contract = require('./contract');
const { account, web3 } = require('./web3');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/addCandidate', async (req, res) => {
  const { name } = req.body;
  try {

    const gas = await contract.methods.addCandidate(name).estimateGas({
      from: account.address
    });
    const tx = await contract.methods.addCandidate(name).send({
      from: account.address,
      gas: gas,
    });
    res.json({ message: 'Candidate added', txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getCandidates', async (req, res) => {
  try {
    const candidates = await contract.methods.getCandidates().call();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ candidates }, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/vote', async (req, res) => {
  const { index } = req.body;
  try {
    const gas = await contract.methods.vote(index).estimateGas({
      from: account.address
    });

    const tx = await contract.methods.vote(index).send({
      from: account.address,
      gas
    });

    res.json({ message: 'Vote cast', txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/winner', async (req, res) => {
  try {
    const winner = await contract.methods.getWinner().call();
    res.json({ winner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
