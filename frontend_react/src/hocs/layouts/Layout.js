import { connect } from "react-redux";
import { check_authenticated, load_user, refresh} from "../../redux/actions/auth";
import { useEffect } from "react";

const Layout = (props) => {
    useEffect(()=>{
        props.refresh()
        props.check_authenticated()
        props.load_user()

}, [])

    return(
        <div className="bg-black flex flex-col min-h-screen ">
            {props.children}
        </div>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(null, {
    check_authenticated,
    load_user,
    refresh
}

) (Layout);