import Page from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import SideBar from "../../components/users/sidebar";
import { index_admin } from "../../helpers/users_helpers";
import BarChart from "../../components/chart/BarChart";
import { Card } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { dashboardAdmin } from "../../api/axiosAdmin";
import { AdminRoutes } from "../../helpers/users_routes";
import { get_avatar } from "../../api/axiosAvatar";



const DashboardAdmin = () => {
    const [dato, setDato]= useState([]);
    const [data, setData] = useState({
        labels: ['Prueba_1', 'Prueba_2'],
        datasets:[{
            label:"Prueba",
            data: ['Datos']
        }]
      })

      useLayoutEffect(() => {
    
        async function loadProfileImage() {
            try {
              const res = await get_avatar();
              if (res && res) {
                window.localStorage.setItem("avatar", res.data.avatar)
              }
            } catch (error) {
              console.error('Error al cargar el Avatar', error);
            }
          }
          loadProfileImage();
    
     
      }, []);

      useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await dashboardAdmin();
                if (res && res.data) {
                    setDato(res.data);
                    setData({
                        labels: ['Estudiantes', 'Apoderados', 'Profesor', 'UTP', 'Secretarios', 'Inspectores'],
                        datasets:[{
                            label:['Cantidad'],
                            data: [res.data[0].n_student, res.data[0].n_guardian, res.data[0].n_professor, res.data[0].n_utp, res.data[0].n_secretary, res.data[0].n_inspector],
                      }, ], }

                    )
                }
            } catch (error) {
                console.error('Error al cargar los dashboard:', error);
            }
        }
        loadDashboard();
    }, []);

    return(
        <Page color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'} >
          <SideBar color={'bg-admin-black'} colorSecond={'admin-green'}  useRol={'Administrador'} mapeo={index_admin}>
          <div className="w-full md:w-4/5 bg-admin-background p-4 h-full overflow-y-auto"> 

          <header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
    <div>
    <h1 className="text-3xl font-bold tracking-tight text-white block">
      {dato.length >0 ? dato[0].school : 'Loading...'}
    </h1>
    <p className="font-bold text-white text-base mt-2 text-center">
      Director: {dato.length >0 ? dato[0].director_name : 'Loading...'}
    </p>
    </div>
   
  </div>
</header>

<PageHeading colorText={'text-white'} colorButton={'invisible'} border={'border-admin-green'} title='Dashboard' button=''/>

      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">

          <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-green text-lg font-bold">Estudiantes</p>
                      <button className="bg-new-green hover:bg-deep-green h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-green hover:bg-deep-green py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length >0 ? dato[0].n_student : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
              
                      <NavLink to={AdminRoutes.Students} className="w-full !bg-new-green hover:!bg-deep-green button_tech_5 ">Registrar</NavLink>
                  </div>
              </div>

              <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-blue  text-lg font-bold">Apoderados</p>
                      <button className="bg-new-blue hover:bg-deep-blue h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-blue hover:bg-deep-blue py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length >0? dato[0].n_guardian : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-blue hover:bg-deep-blue button_tech_5">Registrar</button>
                  </div>
              </div>

              <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-green2 text-lg font-bold">Profesores</p>
                      <button className="bg-new-green2 hover:bg-deep-red-2 h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-green2  hover:bg-deep-red-2 py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length>0 ? dato[0].n_professor : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-green2 hover:bg-deep-red-2 button_tech_5">Registrar</button>
                  </div>
              </div>

              <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-purple text-regular font-bold">UTP</p>
                      <button className="bg-new-purple hover:bg-deep-orange h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-purple hover:bg-deep-orange py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length >0? dato[0].n_utp : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-purple hover:bg-deep-orange button_tech_5">Registrar</button>
                  </div>
              </div>

              <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-pink text-regular font-bold">Secretarios</p>
                      <button className="bg-new-pink hover:bg-deep-orange h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-pink hover:bg-deep-orange py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length >0? dato[0].n_secretary : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-pink hover:bg-deep-orange button_tech_5">Registrar</button>
                  </div>
              </div>

              <div className="bg-admin-black shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-red text-regular font-bold">Inspectores</p>
                      <button className="bg-new-red hover:bg-deep-orange h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-red hover:bg-deep-orange py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">{dato.length>0 ? dato[0].n_inspector : 0}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-red hover:bg-deep-orange button_tech_5">Registrar</button>
                  </div>
              </div>

          </div>
          {/* Estadísticas */}
          <Card className="bg-admin-black p-5">
            <p className="font-bold text-white text-xl ">Estadística</p>
          <div className="w-max-xl h-min-fit bg-white rounded-[20px] p-4 ">
      <BarChart chartData={data} />
          </div>
        

          </Card>

          </div>
         
      </main>

      
    
      
</div>


          </SideBar>

   </Page>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(DashboardAdmin);