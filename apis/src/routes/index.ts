import task from "../features/tasks/tasks.router";

function RoutesList(app:any) {
    app.use("/", task);
}
  
export default RoutesList;