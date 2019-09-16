const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const handlebars = require("express-handlebars");

//middwares

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
app.set(express.json());
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  handlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");
app.use("/", require("./routes/routes"));

/*
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
*/

app.use("./public", express.static(path.join(__dirname, "./public")));

//server
app.listen(app.get("port"), () => {
  console.log(`Server on Port ${app.get("port")}`);
});
