import { connect } from "react-redux";
import Page from "../../hocs/layouts/Page";
import ResetPassword from "../../components/forms/resetPassword";

const Password_reset = ({}) =>{

    
    return(
        <Page>
            <ResetPassword/>
        </Page>

    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

}) (Password_reset);