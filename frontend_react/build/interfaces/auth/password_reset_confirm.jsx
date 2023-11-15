
import { connect } from "react-redux";
import Page from "../../hocs/layouts/Page";
import Password_Reset_Confirm from "../../components/forms/resetPasswordConfirm";



const Password_Reset_2 = ({}) =>{

    
    return(
        <Page>
            <Password_Reset_Confirm/>
        </Page>

    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

}) (Password_Reset_2);