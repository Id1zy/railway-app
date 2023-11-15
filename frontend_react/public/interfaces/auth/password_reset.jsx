
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import Dotloader from "react-spinners/DotLoader";
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