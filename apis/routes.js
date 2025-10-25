function RoutesList(app) {
  app.use("/task", require("./routes/tasks/tasks.router"));
}

module.exports = RoutesList;