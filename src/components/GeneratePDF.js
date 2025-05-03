// GeneratePDF.js
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;


export default function generatePDF(data, columns, title) {
  const tableBody = [
    columns.map((col) => ({ text: col.title, style: 'tableHeader', alignment: 'center' })),
    ...data.map((row) =>
      columns.map((col) => ({
        text: row[col.field]?.toString() || '',
        alignment: 'center',
      }))
    )
  ];

  const docDefinition = {
    content: [
      { text: title, style: 'header', alignment: 'center' },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: tableBody,
        },
        layout: 'lightHorizontalLines',
      }
    ],
    defaultStyle: {
        alignment: 'right',
      }
      ,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      }
    },
    pageOrientation: 'portrait',
  };

  return pdfMake.createPdf(docDefinition).getBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.pdf`;
    link.click();
  });
}
