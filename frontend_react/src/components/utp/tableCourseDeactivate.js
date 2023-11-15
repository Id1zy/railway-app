import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Portal from "../core/Portal";
import toast from "react-hot-toast";
import { activateCourse } from "../../api/axiosCourses";


export function TableCourseDeactive(props) {
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

  



  const HandleDeactivateAdmin = (id, index) =>{
    try{
      activateCourse(id)
      closeModal(index);
      toast.success('Hecho');
    }catch(e){
      console.log(e);
    }
  }



  return (
    <>
    <Card className="h-full w-full overflow-hidden bg-white p-5 text-blue rounded-[10px] hidden sm:block">

      <table className="table min-w-full table-fixed text-left">
        <thead className="table-header-group">
          <tr className="table-row">
            {head_.map((head) => (
              <th
                key={head}
                className="table-cell border-b border-new-green p-4"
              >
                <Typography
                  variant="small"
                  className="font-normal leading-none text-blue font-bold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-row-group">
          {row_.filter((item) => item.Course.status === false ).map((item, index) => (
            <tr key={item.Course.id} className="table-row">
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.Course.id}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.Course.nivel} 
                </Typography>
              </td>

              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.Course.school}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
  <div style={{ display: 'inline-flex' }}>
   
    <button 
    onClick={() => openModal(index)}
    className='bg-new-green  hover:bg-new-dark-green button_tech_colorless'>Activar</button>
  </div>

 
  <Portal open={isOpenArray[index]} onClose={() => closeModal(index)}>
  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
   <div className="w-full mb-3">
    <p className="text-bold text-xl font-bold text-center">¿Estás Seguro de Activar el Curso "{item.Course.nivel}"?</p>
   </div>
   <div className="flex justify-center">
   <div className="inline-flex  items-center">
    <button 
    onClick={()=>closeModal(index)}
    className='bg-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
    <button 
    onClick={() => HandleDeactivateAdmin(item.Course.id, index)}
    className='bg-new-green  hover:bg-new-green button_tech_colorless'>Activar</button>
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
