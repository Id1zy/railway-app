import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Modal from "../../core/Modal";
import Portal from "../../core/Portal";
import { editSchool } from "../../../api/axiosSchool";
import { activateSchool } from "../../../api/axiosSchool";
import toast from "react-hot-toast";

export function TableSchoolDeactivated(props) {
  const [isOpen, setIsOpen] = useState(false);
  const head_ = props.head;
  const row_ = props.row;

  const [isOpenArray, setIsOpenArray] = useState(Array(row_.length).fill(false));

  const openModal_2 = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = true;
    setIsOpenArray(updatedIsOpenArray);
  };

  const closeModal_2 = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = false;
    setIsOpenArray(updatedIsOpenArray);
  };

  const HandleDeactivateSchool = (id, index) =>{
    try{
      activateSchool(id);
      closeModal_2(index);
      toast.success('Hecho');
      return () => props.update()
    }catch(e){
      console.log(e);
    }
  }

  

  return (
    <>
    <Card className="h-full w-full bg-admin-black p-5 text-white rounded-[10px] hidden sm:block">
      <table className="table min-w-full table-fixed text-left">
        <thead>
          <tr>
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
        {row_.filter(item => item.is_active === false)
          .map((item, index) => (
            <>
              <tr key={item.user}>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.rbd} {item.id}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.name}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.phone}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.email}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
              <div style={{ display: 'inline-flex' }}>
              <button className="bg-new-green button_tech_colorless" onClick={() => openModal_2(index)}>Activar</button>
                  </div>


                </td>
            </tr>

            <Portal open={isOpenArray[index]} onClose={() => closeModal_2(index)}> 
 <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-blue p-6 text-left align-middle shadow-xl transition-all">
  <div className="w-full mb-3">
 <p className="text-blue text-xl font-bold text-center">¿Estas Seguro de Desactivar la escuela "{item.name}"? </p>
   
  
  </div>
  <div className="flex justify-center">
  <div className="inline-flex  items-center">
   <button 
   onClick={()=>closeModal_2(index)}
   className='border-2 border-admin-blue !text-blue hover:bg-admin-blue hover:!text-white button_tech_colorless mr-2'>Cancelar</button>

   <button 
   onClick={() => HandleDeactivateSchool(item.rbd, index)}
   className='border-2 border-admin-red !text-new-green hover:!text-white hover:bg-new-grwwn button_tech_colorless'>Activar</button>

  
  </div>
  </div>
   </div>
 </Portal>

            </>
          ))}
        </tbody>
      </table>
    </Card>

    <Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] block sm:hidden">
      <Typography
        variant="small"
        className="font-normal leading-none text-white font-bold"
      >
        Estudiantes
      </Typography>
      <div className="border-t border-admin-green mt-2">
        {row_.map((item,index) => (
          <ul className="list-none" key={item.rbd}>
            <li><span>
              <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">ID:</Typography>
              </span> {item.rbd}</li>
            <li><span>
              <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Nombre: </Typography>
              </span>{item.name} </li>
            <li><span>
              <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Rol: </Typography>
              </span>{item.phone}</li>
            <li><span>
              <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Correo Electrónico: </Typography>
              </span>{item.email}</li>
            <li>
              
                <div className="py-1 inline-flex justify-center">
                 
                </div>

              </li>
            </ul>
          ))}
        </div>
      </Card>
    </>
  );
}