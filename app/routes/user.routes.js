import * as users from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

const routes = (app) => {
  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/:id", users.findOne);

  router.put("/:id", users.update);

  router.delete("/:id", users.remove);

  router.post("/mail/sendMail", users.SendMail);

  app.use("/api/users", router);
};
export default routes;
