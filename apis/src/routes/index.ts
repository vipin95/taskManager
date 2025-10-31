import task from "../features/tasks/tasks.router.ts";

function RoutesList(app:any) {
    app.use("/", task);
}
  
export default RoutesList;