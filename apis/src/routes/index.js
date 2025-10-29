function RoutesList(app) {
    app.use("/task", require("../features/tasks/tasks.router"));
}
  
module.exports = RoutesList;