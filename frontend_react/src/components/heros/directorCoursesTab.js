import React from "react";
import { Card, Typography } from "@material-tailwind/react";

function DirectorTable(props) {
  const head_ = props.head;
  const row_ = props.row;

  return (
    <>
      <Card className="h-full w-full overflow-hidden bg-white p-5 text-blue rounded-[10px] hidden sm:block">
        <table className="table min-w-full table-fixed text-left" style={{ width: '100%' }}>
          <thead className="table-header-group">
            <tr className="table-row">
              {head_ && head_.map((head) => (
                <th key={head} className="table-cell border-b border-admin-green p-4">
                  <Typography variant="small" className="font-normal leading-none text-blue font-bold">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-row-group">
            {row_ && row_.map((item, index) => (
              <tr key={index} className="table-row">
                {head_ && head_.map((head, i) => (
                  <td key={i} className="table-cell p-4 border-b border-admin-green">
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {item[head] !== undefined ? item[head] : "N/A"}
                    </Typography>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default DirectorTable;
