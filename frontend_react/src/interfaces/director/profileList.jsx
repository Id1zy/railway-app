import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { director_maps } from "../../helpers/users_helpers";
import { directorDash } from "../../api/axiosUsers";
import { TabsCustomAnimationDirector } from "../../components/tabsDirector";
import PageHeading from "../../components/heros/pageHeading";
import { TableComunityDirector } from "../../components/admin/tables/tableComunityDirector";

const List = () => {
  const [users, setUsers] = useState({ professors: [], utps: [], inspectors: [] });

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await directorDash();
        if (response && response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    }
    loadUsers();
  }, []);

  const HEAD = ["ID", "Nombre", "Colegio", "Correo Electrónico"];

  const data = [
    {
      label: "Profesores",
      value: "professors",
      desc: <TableComunityDirector head={HEAD} row={users.professors} />,
    },
    {
      label: "UTP",
      value: "utps",
      desc: <TableComunityDirector head={HEAD} row={users.utps} />,
    },
    {
      label: "Inspectores",
      value: "inspectors",
      desc: <TableComunityDirector head={HEAD} row={users.inspectors} />,
    },
  ];

  return (
    <PageUser color={"bg-white text-blue"} colorInput={"bg-white text-blue"}>
      <SideBar color={"bg-blue"} colorSecond={"blue"} useRol={"Director"} mapeo={director_maps}>
        <div className="w-full bg-fondo p-4 h-full overflow-y-auto">
          <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
              <PageHeading colorText={"text-blue"} border={"border-blue my-0"} title="Comunidad Educativa" />

              <TabsCustomAnimationDirector data={data} />
            </div>
          </div>
        </div>
      </SideBar>
    </PageUser>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(List);
