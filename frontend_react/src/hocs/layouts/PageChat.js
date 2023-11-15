import { connect } from "react-redux";
import Body from "./Body";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";

const PageChat = (props) => {
      if(!props.auth){
        <Navigate to={""}/>
      }

    return(
        <Layout>
        <Body>
            {props.children}
        </Body>
    </Layout>
    )
}

const mapStateToProps = state => ({
    auth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps,{
  })(PageChat);