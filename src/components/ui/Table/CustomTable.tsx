import React from "react";

interface IColumn {
  key: string;
  label: string;
}

interface IProps {
  columns: IColumn[];
  data: any;
}

const CustomTable = ({ columns, data }: IProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="text-[#92140c]">
          <tr>
            {columns.map((column: IColumn, index: number) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => {
            return (
              <tr key={index}>
                {columns.map((column: IColumn, columnIndex: number) => {
                  if (column.key === "image")
                    return (
                      <td key={columnIndex}>
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img src={item[column.key]} />
                          </div>
                        </div>
                      </td>
                    );
                  else {
                    return <td key={columnIndex}>{item[column.key]}</td>;
                  }
                })}
                <td>{item.actionButton && item.actionButton}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
