const express = require("express");
const router = express.Router();
var multer = require("multer");

const handlebars = require("express-handlebars");
/*var storage = multer.diskStorage({
  destination: function(req, file, next) {
    next(null, "./uploads");
  },
  filename: function(req, file, next) {
    next(null, file.fieldname + "-" + Date.now());
  },

  filefilter: function(req, file, next) {
    if (!file) {
      next();
    }
    const image = file.minetype.startsWith("/uploads/");
    if (!image) {
      next(null, true);
    } else {
      next({ message: "no se reconoce formato de archivo" }, false);
    }
  }
});
*/

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

router
  .route("/")
  .all((req, res) => {
    const nombres = ["elbio lado rico", "elma maria rico", "diego norrea"];

    res.render("test", { nombres });
  })
  .get(async (res, req, next) => {})
  .post((req, res, next) => {});

router
  .route("/encabezado")
  .all((req, res) => {
    const nombres = ["elbio lado rico", "elma maria rico", "diego norrea"];

    res.render("index", { nombres });
  })
  .get(async (res, req, next) => {})
  .post((req, res, next) => {});

router
  .route("/produto")
  .all((req, res) => {
    const nombres = ["elbio lado rico", "elma maria rico", "diego norrea"];

    res.render("index", { nombres });
  })
  .get(async (res, req, next) => {})
  .post((req, res, next) => {});

router
  .route("/profile")
  .all((req, res) => {
    res.render("forms");
  })
  .post((req, res) => {
    upload(req, res, err => {
      if (err) {
        res.render("forms", {
          msg: err
        });
      } else {
        if (req.file == undefined) {
          res.render("forms", {
            msg: "Error: No File Selected!"
          });
        } else {
          res.render("forms", {
            msg: "File Uploaded!",
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  });

module.exports = router;
