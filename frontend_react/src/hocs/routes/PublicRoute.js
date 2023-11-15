import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import {StudentRoutes, AdminRoutes, ProfessorRoutes,GuardianRoutes} from "../../helpers/users_routes";

const PublicRoute = ({ auth: { isAuthenticated, rol } }) => {
  if (isAuthenticated && rol === "estudiante") {
    return <Navigate to={StudentRoutes.Dashboard} />;
  } else if (isAuthenticated && rol === "profesor"){
    return <Navigate to={ProfessorRoutes.Dashboard} />;
  } else if (isAuthenticated && rol === "administrador"){
    return <Navigate to={AdminRoutes.Dashboard} />;
  } else if (isAuthenticated && rol === "apoderado"){
    return <Navigate to={GuardianRoutes.Dashboard} />;
  } else {
    return <Outlet/>
  }
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps)(PublicRoute);
