import { connect } from "react-redux";
import Body from "./Body";
import Layout from "./Layout";
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AdminRoutes, PublicRoutes, StudentRoutes, ProfessorRoutes } from "../../helpers/users_routes";
import { propTypesSelected } from "@material-tailwind/react/types/components/select";

const Page = (props) => {
      if(props.auth){
        if(props.rol === "estudiante"){
            return  <Navigate to={StudentRoutes.Dashboard} />
          }
          if(props.rol === "profesor"){
            return  <Navigate to={ProfessorRoutes.Dashboard} />
          }
          if(props.rol === "administrador"){
            return  <Navigate to={AdminRoutes.Dashboard} />
          }
      }

    return(
        <Layout>
        <Navbar color={'bg-white'} num={props.num}/>
        <Body>
            {props.children}
        </Body>
        <Footer/>
    </Layout>
    )
}

const mapStateToProps = state => ({
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol
});

export default connect(mapStateToProps,{
  })(Page);