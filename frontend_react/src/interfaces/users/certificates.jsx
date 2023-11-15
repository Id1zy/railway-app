// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
// Images
import { index_maps } from "../../helpers/users_helpers";
import CalendarThree from "../../components/calendars/calendarThree";

const Certificates = ({  user }) => {
  const [userData, setUserData] = useState('');

  useEffect(() => {

    if (user) {
      setUserData(user);
    }
  }, [user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <PageHeading colorText={'text-blue'} colorButton={'hidden'} border={'border-blue'} title='Certificados' button=''/>
 <CalendarThree/>
            
            
            </div>
          </SideBar>
   </PageUser>
  );
}



const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(Certificates);