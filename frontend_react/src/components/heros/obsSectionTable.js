import { Card, Typography } from "@material-tailwind/react";
import React from "react";

function TableObs(props) {
  const head_ = props.head;
  const row_ = props.row;

  const handleViewDetails = (item) => {
    console.log("Detalles de la fila:", item);
  };

  return (
    <>
      <Card className="h-full w-full overflow-hidden bg-white p-5 text-blue rounded-[10px] hidden sm:block">
        <table className="table min-w-full table-fixed text-left">
          <thead className="table-header-group">
            <tr className="table-row">
              {head_.map((head) => (
                <th key={head} className="table-cell border-b border-admin-green p-4">
                  <Typography variant="small" className="font-normal leading-none text-blue font-bold">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-row-group">
            {row_.map((item, index) => (
              <tr key={item.id} className="table-row">
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.nombre_seccion}
                  </Typography>
                </td>
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.anotaciones_positivas}
                  </Typography>
                </td>
                <td className="table-cell p-4 border-b border-admin-green">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {item.anotaciones_negativas}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default TableObs;
