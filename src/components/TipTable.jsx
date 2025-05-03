import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import generatePDF from './GeneratePDF';
import Button from '@mui/material/Button';

import { useState } from "react";
import "../App.css";

function TipTable(props) {
  const [Rows, setRows] = useState([]);
  const handleDownloadPDF = () => {
    const columns = [
      { title: 'סכום כסף', field: 'money' },
      { title: 'שם המלצר', field: 'name' },
      { title: 'משעה', field: 'houer' },
      { title: 'עד שעה', field: 'toHouer' },
      { title: 'משך שעות', field: 'sumHours' },
      { title: 'סכום כסף', field: 'money2' }
    ];
  
    const title = 'טבלת טיפים';
  
    const data = props.array.map(row => ({
      money: Math.floor(props.TipMoneyForHour * row.sumHours),
      name: row.name,
      houer: row.houer,
      toHouer: row.toHouer,
      sumHours: row.sumHours.toFixed(2),
      money2: Math.floor(props.TipMoneyForHour * row.sumHours),
    }));
  
    generatePDF(data, columns, title); // קריאה פשוטה, לא צריך להחזיר blob
  };
  
  
  return (
    <TableContainer component={Paper}>
      <h2>טבלת טיפים</h2>
      {props.sumWaitersHours > 0 ? (
        <p>סך הכל שעות :{props.sumWaitersHours.toFixed(2)}</p>
      ) : (
        ""
      )}
      {props.sumWaitersHours > 0 ? (
        <p>סך הכל הפרשה:{(props.sumWaitersHours * 6).toFixed(0)}</p>
      ) : (
        ""
      )}

      {props.TipMoneyForHour > 0 ? (
        <p>טיפ לשעה אחרי הפרשה :{props.TipMoneyForHour.toFixed(0)}</p>
      ) : (
        ""
      )}

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="rtl">
            <TableCell align="right">סכום כסף</TableCell>
            <TableCell align="right"> שם המלצר</TableCell>
            <TableCell align="right"> משעה</TableCell>
            <TableCell align="right"> עד שעה</TableCell>
            <TableCell align="right"> משך שעות</TableCell>
            <TableCell align="right">סכום כסף</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {props.array.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {Math.floor(props.TipMoneyForHour * row.sumHours)}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.houer}</TableCell>
              <TableCell align="right">{row.toHouer}</TableCell>
              <TableCell align="right">{row.sumHours.toFixed(2)}</TableCell>
              <TableCell align="right">
                {Math.floor(props.TipMoneyForHour * row.sumHours)}
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
  Download PDF
</Button>

    </TableContainer>
  );
}

export default TipTable;
