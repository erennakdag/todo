import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const prisma = new PrismaClient();

app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  const todos = await prisma.todoItem.findMany({
    where: {
      userId,
    },
  });
  res.json(todos);
});

app.post("/create-todo", async (req, res) => {
  const { userId, text } = req.body;
  const todoItem = await prisma.todoItem.create({
    data: {
      userId,
      text,
    },
  });
  res.json(todoItem);
});

app.post("/delete-todo/:id", async (req, res) => {
  const { id } = req.params;
  const deletedItem = await prisma.todoItem.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedItem);
});

app.listen(3000, () => {
  console.log("Listening on port 3000 -> http://localhost:3000");
});
