import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data, columns, title) => {
  const doc = new jsPDF();

  doc.text(title, 14, 16);

  const headers = columns.map(column => column.title);
  const rows = data.map(row => columns.map(column => row[column.field]));

  doc.autoTable({
    startY: 20,
    head: [headers],
    body: rows,
  });

  // Save the PDF as a blob
  return doc.output('blob');
};

export default generatePDF;
