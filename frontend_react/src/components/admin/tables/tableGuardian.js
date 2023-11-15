import { Card, Typography } from "@material-tailwind/react";
import Portal from "../../core/Portal";
import { desactivateUser } from "../../../api/axiosUsers";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import EditGuardian from "../../forms/edit/editGuardian";
import PaginationBlack from "../../users/pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TableGuardian(props) {
  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(7);
  const head_ = props.head;
  const row_ = props.row;
  const max = row_.filter((item) => item.User.status === true).length / forPage
  const [q, setQ] = useState("");

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



  const HandleDeactivateDirector = (id, index) =>{
    try{
      desactivateUser(id);
      closeModal(index);
      toast.success('Hecho');
      return props.update();
    }catch(e){
      toast.success('No se ha podido realizar esta acción.');
    }
  } 
   
  useEffect(() => {

  }, [props.update]);


  return (
    <>
    <Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] hidden sm:block">
    <div className=" inline-flex items-center space-x-1 justify-center w-full">
        <MagnifyingGlassIcon className={`w-10 h-10 p-2 font-bold bg-white rounded-md text-admin-green `}/>
      <input
                                type="search"
                                className={`input_tech_search grow !text-admin-green`}
                                placeholder="Busque según el nombre..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
      </div>
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
          {row_.filter((item) => item.User.status === true).filter((item) => q.trim() !== '' ? item.User.name.toLowerCase().includes(q.toLowerCase()): true ).slice((page-1)*forPage, (page-1)*forPage+forPage).map((item, index) => (
            <tr key={item.User.id} className="table-row">
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.User.rut}
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
                  {item.User.address}
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
                  {item.User.phone}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
  <div style={{ display: 'inline-flex' }}>
  <button 
    onClick={() => openModalEdit(index)}
    className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Editar</button>
    <button 
    onClick={() => openModal(index)}
    className='border-2 border-admin-red  hover:bg-admin-red button_tech_colorless'>Desactivar</button>
  </div>
</td>



<Portal open={isOpenArrayEdit[index]} onClose={() => closeModalEdit(index)}> {/* Cierra el modal al hacer clic */}
  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-admin-background p-6 text-left align-middle shadow-xl transition-all">
   <div className="w-full mb-3">
    <p className="text-white text-xl font-bold text-center">Editar usuario {item.first_name}</p>
   </div>
   <div className="">
   <EditGuardian id={item.User.id} onClose={() => closeModalEdit(index)}/>
   </div>
    </div>
  </Portal>
  <Portal open={isOpenArray[index]} onClose={() => closeModal(index)}>
  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-admin-background p-6 text-left align-middle shadow-xl transition-all">
   <div className="w-full mb-3">
    <p className="text-white text-xl font-bold text-center">¿Estas Seguro de Desactivar al usuario {item.first_name}?</p>
   </div>
   <div className="flex justify-center">
   <div className="inline-flex  items-center">
    <button 
    onClick={()=>closeModal(index)}
    className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
    <button 
    onClick={() => HandleDeactivateDirector(item.User.id, index)}
    className='border-2 border-admin-red  hover:bg-admin-red button_tech_colorless'>Desactivar</button>
   </div>
   </div>
    </div>
  </Portal>


            </tr>
          ))}
        </tbody>
      </table>
    </Card>

    <PaginationBlack page={page} setPage={(n)=>setPage(n)} max={max} />

<Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] block sm:hidden">
<Typography
                  variant="small"
                  className="font-normal leading-none text-white font-bold"
                >
                  Director
                </Typography>
  <div className="border-t border-admin-green mt-2">
  {row_.filter((item) => item.rol === "director").map((item) => (
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
       <button className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Editar</button>
       <button className='border-2 border-admin-red  hover:bg-admin-red button_tech_colorless'>Eliminar</button>
     </div>
     </li>
   </ul>
  ))}

  </div>
</Card>

</>
  );
}
