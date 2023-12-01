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

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (err) {
    res.status(500).render("pages/error", { error: "Erro" });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (err) {
    let errors = err.errors; // Corrected the variable name to errors
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, errors } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks');
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    checklist.name = name; // Corrected the update process
    await checklist.save();
    res.redirect("/checklists");
  } catch (err) {
    let errors = err.errors;
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    await checklist.deleteOne();
    res.redirect("/checklists");
  } catch (err) {
    res.status(422).render("pages/error", { error: "Erro" + err });
  }
});

module.exports = router;
