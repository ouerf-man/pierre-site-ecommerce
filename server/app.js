const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const { sendEmail } = require("./helpers/sendEmail");

const dbService = require("./configs/db.service");
const adminService = require("./configs/admin.config");
const coeffInit = require("./configs/initCoeffs");
const infoInit = require("./configs/initInfos");

const userRouter = require("./routes/user");
const reportageRouter = require("./routes/reportage");
const blogRouter = require("./routes/blog");
const paymentRouter = require("./routes/payment");
const coeffRouter = require("./routes/coeff");
const infoRouter = require("./routes/webSiteInfo");
const adminRouter = require("./routes/admin");
const contactRouter = require("./routes/contact");

const { renderFile } = require("jade");
const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", renderFile);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./utils/passport")(passport);
// connecting to database
dbService.establishConnection();
adminService();
coeffInit();
infoInit();
app.use("/health", function (req, res) {
  res.send("health 100%");
});
app.use("/user", userRouter);
app.use("/reportage", reportageRouter);
app.use("/blog", blogRouter);
app.use("/payment", paymentRouter);
app.use("/coeff", coeffRouter);
app.use("/infos", infoRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);

app.get("/test", async (req, res) => {
  res.render("devi.jade", {
    prenom: "Raed",
    nom: "Ouerfelli",
    ref: "3AQFASD4123FQV",
    clientRef: "3AQFASD4123FQV",
    date: "12-11-1998",
    adresse: "asba",
    cp: "1332",
    images: [
      {
        photo: "ahmed",
        lien: "www.facebook.com",
        prix: "255",
      },
      {
        photo: "ahmed",
        lien: "www.facebook.com",
        prix: "255",
      },
      {
        photo: "ahmed",
        lien: "www.facebook.com",
        prix: "255",
      },
      {
        photo: "ahmed",
        lien: "www.facebook.com",
        prix: "255",
      },
    ],
    totalHT: 600,
    tva: 400,
    total: 1000,
  });
  try {
    await sendEmail("werfelli.raed@yahoo.fr", "asba", "ggqsfgg", "");
  } catch (e) {
    console.log(e);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
