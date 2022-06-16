const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Recepie = require("./models/Recepie");
const app = express();

//connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/recepieV2")
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`Oh No ERROR!`);
    console.log(err);
  });

app.use(methodOverride("_method"));

//parsing data form req.body
app.use(express.urlencoded({ extended: true }));

//static assets
app.use(express.static("public"));

//templating engine
app.set("view engine", "ejs");

//fake database call to get recepie data

//home route
app.get("/", (req, res) => {
  res.render("home");
});

//training route
app.get("/training", (req, res) => {
  res.render("training");
});

//show all recepies
app.get("/recepies", async (req, res) => {
  try {
    const recepies = await Recepie.find();
    // console.log(recepies);
    res.render("recepies/recepies", { recepies });
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//render create new recepie page
app.get("/recepie/new", (req, res) => {
  res.render("recepies/new");
});

//create new recepie
app.post("/recepies", async (req, res) => {
  const { title, text, img, category } = req.body;

  const recepie = new Recepie({
    title,
    text,
    img,
    category,
  });
  try {
    await recepie.save();
    res.redirect("/recepies");
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//show details page
app.get("/recepies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundRecepie = await Recepie.findById(id);

    res.render("recepies/recepie", { foundRecepie });
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//edit recepie form
app.get("/recepies/:id/edit", async (req, res) => {
  const id = req.params.id;
  const foundRecepie = await Recepie.findById(id);
  res.render("recepies/update", { foundRecepie });
});

//update route
app.patch("/recepies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundRecepie = await Recepie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(foundRecepie);
    res.redirect("/recepies");
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

//Delete recepie
app.delete("/recepies/:id", async (req, res) => {
  try {
    await Recepie.findByIdAndDelete(req.params.id);
    res.redirect("/recepies");
  } catch (error) {
    console.log(`Oh No ERROR!`);
    res.send(error.message);
  }
});

app.listen(8080, () => {
  console.log("Server Listening at PORT 8080");
});
