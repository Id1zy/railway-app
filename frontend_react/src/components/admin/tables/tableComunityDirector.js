import { Card, Typography } from "@material-tailwind/react";

export function TableComunityDirector(props) {
  const head_ = props.head;
  const row_ = props.row;

  return (
    <>
      <Card className="h-full w-full overflow-hidden bg-blue p-5 text-white rounded-[10px] hidden sm:block">

        <table className="table min-w-full table-fixed text-left">
          <thead className="table-header-group">
            <tr className="table-row">
              {head_.map((head) => (
                <th key={head} className="table-cell border-b border-admin-green p-4">
                  <Typography variant="small" className="font-normal leading-none text-white font-bold">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-row-group">
            {row_.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    {item.id}
                  </Typography>
                </td>
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    {item.name}
                  </Typography>
                </td>
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    {item.school.name}
                  </Typography>
                </td>
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    {item.email}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="h-full w-full overflow-hidden bg-blue p-5 text-white rounded-[10px] block sm:hidden">
        <Typography variant="small" className="font-normal leading-none text-white font-bold">
          Director
        </Typography>
        <div className="border-t border-admin-green mt-2">
          {row_.filter((item) => item.rol === "director").map((item) => (
            <ul className="list-none" key={item.id}>
              <li>
                <span>
                  <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">ID:</Typography>
                </span> {item.id}
              </li>
              <li>
                <span>
                  <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Nombre: </Typography>
                </span>{item.name}
              </li>
              <li>
                <span>
                  <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Rol: </Typography>
                </span>{item.rol}
              </li>
              <li>
                <span>
                  <Typography variant="small" className="font-normal leading-none text-white font-bold py-1">Correo Electrónico: </Typography>
                </span>{item.email}
              </li>
            </ul>
          ))}
        </div>
      </Card>
    </>
  );
}
