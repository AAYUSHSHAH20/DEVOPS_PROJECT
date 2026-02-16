const router = require("express").Router();
const Task = require("../model/task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id
  });
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;