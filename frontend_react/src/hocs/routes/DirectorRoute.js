import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { PublicRoutes, StudentRoutes } from "../../helpers/users_routes";

const DirectorRoute = ({ auth: { isAuthenticated, rol } }) => {
  if (isAuthenticated && rol === "director") {
    return <Outlet />;
  } else {
    return <Navigate to={PublicRoutes.Login} />;
  }
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps)(DirectorRoute);
