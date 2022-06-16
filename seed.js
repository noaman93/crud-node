const mongoose = require("mongoose");

const Recepie = require("./models/Recepie");

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

const recepie = new Recepie({
  title: "Jombo Beef Steak",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  img: "https://media.istockphoto.com/photos/barbecue-rib-eye-steak-or-rump-steak-dry-aged-wagyu-entrecote-steak-picture-id1079920024?b=1&k=20&m=1079920024&s=170667a&w=0&h=FZconGrzfpDXhzoV0qaUFKxVBObMowMD5tr2sIN0or0=",
  category: "non-veg",
});

recepie.save();
