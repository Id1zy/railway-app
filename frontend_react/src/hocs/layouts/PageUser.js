import Layout from "./Layout";
import Body from "./Body";
import NavBarUser from "../../components/users/navbarUser";
import { connect } from "react-redux";
import { Toaster } from "react-hot-toast";
const PageUser = (props) => {
   
        
    return(
        <Layout>
            <Toaster/>
            <NavBarUser color={props.color} colorInput={props.colorInput} user={props.user}/>
            <Body>
            {props.children}
            </Body>
        </Layout>
    )
}
const mapStateToProps = state => ({
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol
});

export default connect(mapStateToProps,{
  })(PageUser);