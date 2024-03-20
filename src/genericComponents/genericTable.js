import React from 'react';
import '../style/genericTableStyle.css'
const GenericTable = ({ columns, data, buttons }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column} >{column}</th>
          ))}
        </tr>
      </thead>
            <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {typeof column === 'string' ? row[column.replace(/\s+/g, '').toLowerCase()] : ''}
              </td>
            ))}
             <td>{buttons? buttons(row, rowIndex): ''}</td>
         
          </tr>
        ))}
      </tbody>

       </table>
  );
};

export default GenericTable;