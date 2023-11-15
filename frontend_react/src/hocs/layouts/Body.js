import { connect } from "react-redux";

function Body({children}) {
    return(
        <div className=" bg-black flex-grow max-w-7x1 w-full min-h-screen ">
            <div className="bg-white max-w-7x1 mx-auto w-full min-h-screen ">
            {children}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {

}) (Body);


