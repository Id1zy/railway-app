// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageChat from "../../hocs/layouts/PageChat";
import NavLeft from "../../components/chat/navLeft";
import NavRight from "../../components/chat/navRight";

const Chat = ({  user }) => {

  useEffect(() => {

  }, []);

    return(
        <PageChat  >

<div className="flex w-full h-screen">
<div className="w-1/3 hidden md:block h-full">
<div className="flex flex-col top-0 left-0 text-white h-full" >
    <div className="overflow-y-hidden overflow-x-hidden flex-grow bg-white">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="">
          <div className="flex flex-row items-center h-8">
            <NavLeft/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

<div className="w-full md:w-2/3 bg-fondo h-full">
    <NavRight/>
  </div>


</div>



 
   </PageChat>
  );
}



const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(Chat);