import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { PublicRoutes, StudentRoutes } from "../../helpers/users_routes";
import { refresh, check_authenticated, load_user } from "../../redux/actions/auth";
import { useEffect } from "react";


const AdminRoute = ({ auth: { isAuthenticated, rol }, refresh, check_authenticated, load_user }) => {


  if (isAuthenticated) {
    if(rol === "administrador"){
      return <Outlet />;
    }
  }
  if(!isAuthenticated) {
    return <Navigate to={PublicRoutes.Login} />;
  }

  return <p>Acceso No Autorizado</p>
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps,{
  refresh,
  check_authenticated,
  load_user
})(AdminRoute);
