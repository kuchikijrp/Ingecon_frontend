import React from 'react';

interface TableProps{
    data: {};
}

const Table : React.FC<TableProps> = ({
    data
}) =>{
    // console.log(data)
    const keys = Object.keys(data[0]);
    console.log(keys);
    return(
        <table>
            <thead>
                {
                    keys.map(key => <th key={key}>nome</th>)
                }
            </thead>

            <tbody>
                <tr>
                    <td>juliano</td>
                    <td>ROD</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;