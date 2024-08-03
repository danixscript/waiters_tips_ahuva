const sendPDFToWhatsApp = (pdfBlob, phoneNumber) => {
    // Convert the PDF blob to a URL
    const pdfUrl = URL.createObjectURL(pdfBlob);
  
    // Create a WhatsApp link with the PDF URL
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Here is the PDF file: ${pdfUrl}`;
  
    // Open the WhatsApp link in a new tab
    window.open(whatsappLink, '_blank');
  };
  
  export default sendPDFToWhatsApp;
  