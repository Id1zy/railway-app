import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { ProfessorRoutes, PublicRoutes, StudentRoutes } from "../../helpers/users_routes";

const ProfessorRoute = ({ auth: { isAuthenticated, rol } }) => {
  if (isAuthenticated && rol === "profesor") {
    return <Outlet />;
  } else {
    return <Navigate to={PublicRoutes.Login} />;
  }
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps)(ProfessorRoute);
