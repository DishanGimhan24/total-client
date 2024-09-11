import React from "react";
import {useTable} from "react-table";

const Table = ({columns, data}) => {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

    return (
      <table
        {...getTableProps()}
        style={{
          borderSpacing: "0",
          width: "100%",
          border: "1px solid #B2B2B2",
          borderCollapse: "collapse",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  background: i % 2 === 0 ? "#d2d2d2" : "transparent",
                  border: "1px solid #B2B2B2",
                  padding: "10px",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #B2B2B2",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
};

export default Table;