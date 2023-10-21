import express from "express";
import morgan from "morgan";
import config from "./config.js";

const app = express();
app.use(morgan("combined"));

app.use(express.json());

let trainees = [];

// get
app.get("/trainees", (req, res) => {
  return res.json({
    trainees,
  });
});
app.get("/trainees/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const getAccount = trainees.find((account) => account.id === accountId);
  console.log(accountId);

  if (!getAccount) {
    response.status(500).send("trainee not found.");
  } else {
    response.json(getAccount);
  }
});
app.get("/trainees", (request, response) => {
  const accountname = String(request.query.name);
  const getAccount = trainees.find((account) => account.name === accountname);
  console.log(accountname);

  if (!getAccount) {
    response.status(500).send("trainee not found.");
  } else {
    response.json(getAccount);
  }
});

// add
app.post("/", (req, res) => {
  trainees.push({
    id: req.body.id,
    name: req.body.name,
  });
  return res.json({
    message: "trainees added sucesssfully",
  });
});

// Update

app.put("/trainees", (request, response) => {
  const accountname = String(request.query.name);
  const body = request.body;
  const account = trainees.find((account) => account.name === accountname);
  const index = trainees.indexOf(account);

  if (!account) {
    response.status(500).send("Account not found.");
  } else {
    const updatedAccount = { ...account, ...body };

    trainees[index] = updatedAccount;

    response.send(updatedAccount);
  }
  return res.json({
    message: "trainees update sucesssfully",
  });
});
app.put("/trainees/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const body = request.body;
  const account = trainees.find((account) => account.id === accountId);
  const index = trainees.indexOf(account);

  if (!account) {
    response.status(500).send("Account not found.");
  } else {
    const updatedAccount = { ...account, ...body };

    trainees[index] = updatedAccount;

    response.send(updatedAccount);
  }
});
app.put("/trainees/", (request, response) => {
  const accountname = String(request.query.id);
  const body = request.body;
  const account = trainees.find((account) => account.id === accountname);
  const index = trainees.indexOf(account);

  if (!account) {
    response.status(500).send("Account not found.");
  } else {
    const updatedAccount = { ...account, ...body };

    trainees[index] = updatedAccount;

    response.send(updatedAccount);
  }
});

// DELETE
app.delete("/trainees/:id", (request, response) => {
  const accountId = Number(request.params.id);
  let newtrainees = trainees.filter((account) => account.id != accountId);

  if (!newtrainees) {
    response.status(500).send("Account not found.");
  } else {
    trainees = newtrainees;
    response.send(trainees);
  }
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
