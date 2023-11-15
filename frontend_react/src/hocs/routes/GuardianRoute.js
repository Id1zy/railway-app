import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { PublicRoutes, GuardianRoutes } from "../../helpers/users_routes";

const GuardianRoute = ({ auth: { isAuthenticated, rol } }) => {
  if (isAuthenticated && rol === "apoderado") {
    return <Outlet />;
  } else {
    return <Navigate to={PublicRoutes.Login} />;
  }
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps)(GuardianRoute);
