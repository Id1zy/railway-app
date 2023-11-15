
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import Dotloader from "react-spinners/DotLoader";
import Page from "../../hocs/layouts/Page";

const Activate = ({activate, loading}) =>{
    const params = useParams()

    const [activated, setActivated] = useState(false);
    

    const activate_account = () =>{
        const uid = params.uid
    const token = params.token

    activate(uid, token);
    setActivated(true);
    }

    if (activated && !loading){
        return <Navigate to={'/login/'} />
    }
    
    return(
        <Page>
            { loading ? 
                  <button className="w-full button_tech">
                  <Dotloader/>
               </button> 
                 :
                 <button 
                 onClick={activate_account}
                 className="w-full button_tech">
                    Cuenta Activada
                 </button>
                }
        </Page>

    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps,{
    activate
}) (Activate);