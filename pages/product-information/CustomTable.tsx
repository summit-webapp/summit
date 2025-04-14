import React from 'react';

type CellContent =
  | string
  | number
  | JSX.Element
  | { content: string | number | JSX.Element; props?: React.TdHTMLAttributes<HTMLTableCellElement> };

type CustomTableProps = {
  headers?: string[];
  rows: CellContent[][];
};

const CustomTable: React.FC<CustomTableProps> = ({ headers = [], rows }) => {
  const columnCount = Math.max(...rows.map((row) => row.length), headers.length);

  return (
    <div className="table-responsive rounded">
      <table className="table table-sm border border-2 secondary text-center">
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.length === 1 && columnCount > 1 ? (
                <th colSpan={columnCount}>{headers[0]}</th>
              ) : (
                headers.map((header, i) => <th key={i}>{header}</th>)
              )}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => {
                if (typeof cell === 'object' && 'content' in cell) {
                  return (
                    <td key={j} {...(cell.props || {})}>
                      {cell.content}
                    </td>
                  );
                } else {
                  return <td key={j}>{cell}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
