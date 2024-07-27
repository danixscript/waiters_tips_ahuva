import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import "../App.css";

function WorkerTable(props) {
  return (
    <TableContainer component={Paper}>
      <h2>טבלת עובדים</h2>
      {props.sumCookHoursState >0?
      <p>"סך הכל שעות"{props.sumCookHoursState}</p>
      :''}

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="rtl">
            <TableCell align="right"> שם </TableCell>
            <TableCell align="right"> משעה</TableCell>
            <TableCell align="right"> עד שעה</TableCell>
            <TableCell align="right"> משך שעות</TableCell>

            <TableCell align="right"> תפקיד</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.array.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.houer}</TableCell>
              <TableCell align="right">{row.toHouer}</TableCell>
              <TableCell align="right">{row.sumHours}</TableCell>
              <TableCell align="right">
                {row.job == "Washing"
                  ? "שוטף"
                  : row.job == "cook"
                  ? "טבח"
                  : row.job == "waiter"
                  ? "מלצר"
                  : row.job == "hostess"
                  ? "מארחת"
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkerTable;
