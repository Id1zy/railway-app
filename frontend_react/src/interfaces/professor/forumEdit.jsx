// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Images
import { profesor_maps } from "../../helpers/users_helpers";
import EditForum from "../../components/forms/edit/editForum";



const ForumEdit = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [update, setUpdate] = useState(0);
  const params = useParams()
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));


  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    return () => setUpdate(0);
  }, [update, user]);

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }

    return(
      <PageUser color={`bg-white ${Style.textSchool}`} colorInput={`bg-white ${Style.textSchool}`} user={user}>
      <SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
          <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">
            <EditForum update={()=>setUpdate(update+1)}/>
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
  })(ForumEdit);