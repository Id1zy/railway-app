import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Portal from "../../core/Portal";
import EditAdmin from "../../forms/edit/editAdmin";
import { activateAdmin } from "../../../api/axiosAdmin";
import toast from "react-hot-toast";


export function TableAdminDeactivate(props) {
  const [isOpen, setIsOpen] = useState(false);
  const head_ = props.head;
  const row_ = props.row;

  const [isOpenArray, setIsOpenArray] = useState(Array(row_.length).fill(false));

  const openModal = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = true;
    setIsOpenArray(updatedIsOpenArray);
  };

  const closeModal = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = false;
    setIsOpenArray(updatedIsOpenArray);
  };

  

  const [isOpenArrayEdit, setIsOpenArrayEdit] = useState(Array(row_.length).fill(false));

  const openModalEdit = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = true;
    setIsOpenArrayEdit(updatedIsOpenArray);
  };

  const closeModalEdit = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = false;
    setIsOpenArrayEdit(updatedIsOpenArray);
  };

  const HandleDeactivateAdmin = (id, index) =>{
    try{
      activateAdmin(id);
      closeModal(index);
      toast.success('Hecho');
    }catch(e){
      console.log(e);
    }
  }



  return (
    <>
    <Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] hidden sm:block">

      <table className="table min-w-full table-fixed text-left">
        <thead className="table-header-group">
          <tr className="table-row">
            {head_.map((head) => (
              <th
                key={head}
                className="table-cell border-b border-admin-green p-4"
              >
                <Typography
                  variant="small"
                  className="font-normal leading-none text-white font-bold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-row-group">
          {row_.filter((item) => item.User.status === false ).map((item, index) => (
            <tr key={item.User.id} className="table-row">
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.User.id}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.User.name} 
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.User.email}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.User.school}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
  <div style={{ display: 'inline-flex' }}>
    <button 
    onClick={() => openModal(index)}
    className='border-2 border-new-green hover:bg-new-green button_tech_colorless'>Activar</button>
  </div>
  <Portal open={isOpenArrayEdit[index]} onClose={() => closeModalEdit(index)}> {/* Cierra el modal al hacer clic */}
  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-admin-background p-6 text-left align-middle shadow-xl transition-all">
   <div className="w-full mb-3">
    <p className="text-white text-xl font-bold text-center">Editar usuario {item.first_name}</p>
   </div>
   <div className="">
    <EditAdmin id={item.User.id} onClose={() => closeModalEdit(index)}/>
   </div>
    </div>
  </Portal>
  <Portal open={isOpenArray[index]} onClose={() => closeModal(index)}>
  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-admin-background p-6 text-left align-middle shadow-xl transition-all">
   <div className="w-full mb-3">
    <p className="text-white text-xl font-bold text-center">¿Estas Seguro de Activar al usuario {item.first_name}?</p>
   </div>
   <div className="flex justify-center">
   <div className="inline-flex  items-center">
    <button 
    onClick={()=>closeModal(index)}
    className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
    <button 
    onClick={() => HandleDeactivateAdmin(item.User.id, index)}
    className='border-2 border-new-green hover:bg-new-green button_tech_colorless'>Activar</button>
   </div>
   </div>
    </div>
  </Portal>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-white">
</div>
    </Card>

<Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] block sm:hidden">
<Typography
                  variant="small"
                  className="font-normal leading-none text-white font-bold"
                >
                  Administradores
                </Typography>
  <div className="border-t border-admin-green mt-2">
  {row_.filter((item) => item.rol === "administrador").map((item, index) => (
     <ul class="list-none">
     <li><pan>
       <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">ID:</Typography>
       </pan> {item.id}</li>
     <li><pan>
       <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Nombre: </Typography>
       </pan>{item.get_full_name}</li>
       <li><pan>
       <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Rol: </Typography>
       </pan>{item.rol}</li>
       <li><pan>
       <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Correo Electrónico: </Typography>
       </pan>{item.email}</li>
     <li>
     <div 
     className="py-1 inline-flex justify-center">
       <button 
       onClick={() => openModalEdit(index)}
       className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Editar</button>
       <button 
       onClick={() => openModal(index)}
       className='border-2 border-admin-red  hover:bg-admin-red button_tech_colorless'>Desactivar</button>
     </div>
     </li>
   </ul>
  ))}

  </div>
</Card>

</>
  );
}
