import task from "../features/tasks/tasks.router";
import auth from "../features/auth/auth.router";

function RoutesList(app:any) {
    app.use("/", task);
    app.use("/auth", auth);
}
  
export default RoutesList;