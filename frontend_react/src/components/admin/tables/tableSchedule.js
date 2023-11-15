import { Card, Typography } from "@material-tailwind/react";


export function TableUTP(props) {
  const head_ = props.head;
  const row_ = props.row;


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
          {row_.filter((item) => item.rol === "utp").map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.id}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.get_full_name}
                </Typography>
              </td>
              <td className="table-cell p-4 border-b border-admin-green">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {item.rol}
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
    <button className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Editar</button>
    <button className='border-2 border-admin-red  hover:bg-admin-red button_tech_colorless'>Eliminar</button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </Card>

<Card className="h-full w-full overflow-hidden bg-admin-black p-5 text-white rounded-[10px] block sm:hidden">
<Typography
                  variant="small"
                  className="font-normal leading-none text-white font-bold"
                >
                  Área UTP
                </Typography>
  <div className="border-t border-admin-green mt-2">
  {row_.filter((item) => item.rol === "utp").map((item) => (
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