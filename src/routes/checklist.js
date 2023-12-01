const express = require("express");

const router = express.Router();

const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.get("/new", async (res, req) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (err) {
    res.status(500).render("pages/error", { error: "Erro" });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    checklist = await Checklist.save();
    res.redirect("/checklists");
  } catch (err) {
    res.status(500).render("pages/error", { error: "Erro" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/show", { checklist: checklist });
    res.status(200).json(checklist);
  } catch (err) {
    console.log(err);

    res
      .status(400)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body;
  try {
    let checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(checklist);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
