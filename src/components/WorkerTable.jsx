import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import generatePDF from './GeneratePDF'; // Import the generatePDF function

function WorkerTable(props) {
  const handleDownloadPDF = () => {
    const columns = [
      { title: 'שם', field: 'name' },
      { title: 'משעה', field: 'houer' },
      { title: 'עד שעה', field: 'toHouer' },
      { title: 'משך שעות', field: 'sumHours' },
      { title: 'תפקיד', field: 'job' }
    ];

    const title = 'טבלת עובדים';

    const pdfBlob = generatePDF(props.array, columns, title);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'workers_table.pdf';
    link.click();
  };

  return (
    <TableContainer component={Paper}>
      <h2>טבלת עובדים</h2>
      {props.sumCookHoursState > 0 ? <p>"סך הכל שעות"{props.sumCookHoursState}</p> : ''}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="rtl">
            <TableCell align="right">שם</TableCell>
            <TableCell align="right">משעה</TableCell>
            <TableCell align="right">עד שעה</TableCell>
            <TableCell align="right">משך שעות</TableCell>
            <TableCell align="right">תפקיד</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.array.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right" component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.houer}</TableCell>
              <TableCell align="right">{row.toHouer}</TableCell>
              <TableCell align="right">{row.sumHours}</TableCell>
              <TableCell align="right">
                {row.job === "Washing" ? "שוטף" : row.job === "cook" ? "טבח" : row.job === "waiter" ? "מלצר" : row.job === "hostess" ? "מארחת" : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleDownloadPDF}>Download PDF</Button>
    </TableContainer>
  );
}

export default WorkerTable;
