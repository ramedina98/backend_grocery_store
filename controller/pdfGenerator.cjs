/*here we have all the code needed to generate a pdf file, 
which will be the purchase ticket...*/
const PDFDocument = require('pdfkit-construct'); 
const fs = require('fs');

/*the data will be sent in ana object called data, which 
has this form --> const data = {
            buyer: buyerCreated.dataValues, 
            address: addressCreated.dataValues, 
            products: purchaseProduct
        }*/
const fecha = () => {
    // Suponiendo que tienes una fecha en formato Date
    const fecha = new Date(); // Esto es solo un ejemplo, reemplázalo con tu fecha real

    // Obtiene los componentes de la fecha: año, mes y día
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Se suma 1 al mes porque los meses en JavaScript comienzan desde 0 (0 - enero, 1 - febrero, etc.)
    const día = String(fecha.getDate()).padStart(2, '0');

    // Formatea la fecha según el patrón deseado
    const fechaFormateada = `${año} - ${mes} - ${día}`;

    return fechaFormateada;
}
const randomeIdInvoice = () => {
    //we generate 3 randome numbers...
    const numeros = Array.from({length: 3}, () => Math.floor(Math.random() * 9) + 1);
    //we generate 3 letters randome...
    const letras = Array.from({length: 3}, () => String.fromCharCode(Math.floor(Math.random() * 6) + 97)); 
    //combine everything...
    const codigo = [...numeros, ...letras].join('');
    
    return codigo;
}
const subTotalTaxes = (purchase) => {
    const subT = purchase.reduce((sum, item) => sum + item.total, 0);
    const taxes = parseFloat((subT * 0.16).toFixed(2));
    const total = (subT + taxes).toFixed(2); 
    return {
        subT: '$' + (subT).toFixed(2), 
        taxes: '$' + taxes, 
        total: '$' + total
    }
}
const nameFile = (buyer) => {
    const name = buyer.name_buyer + ' ' + buyer.last_name_buyer;
    const fileName = name.replace(/\s+/g, '_');
    return fileName;
}
const buildPDF = (data) => {
    const { buyer, address, purchase } = data;
    console.log(purchase);
    //we initialize the pdf document
    const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 290, left: 10, right: 10, bottom: 0},
        bufferPages: true,
    });

    /*Here is the sectio of the header, we have here the logo of the grocery store, the name, 
    the address of the store and more...*/
    const generarEncabezado = () => {
    
        const imgWidth = 55;
        const imgHeight = 55;
        doc.image('./img/logo.png', {
            fit: [imgWidth, imgHeight], 
            x: 47, 
            y: 57, 
            opacity: 0.3,
        });
    
        doc.fontSize(12)
            .font('Times-Bold')
            .fillColor('#232D3F')
            .text('Abarrotes UNEDL', 107, 62, { width: 160, align: 'left' })
            .moveDown()
            .font('Times-Roman')
            .text('Vallarta #2035, Zapopan, Jalisco', 107, 78, { align: 'left' })
            .moveDown()
            .text('45197', 107, 95, { align: 'left' });
    
        doc.text(`Ticket de compra #${randomeIdInvoice()}`, 405, 62)
            .text('Fecha de emisión:', 405, 78)
            .font('Times-Italic')
            .text(`${fecha()}`, 405, 95);
    
        doc.lineCap('butt')
            .moveTo(557, 123)
            .lineTo(30, 123)
            .lineWidth(7)
            .strokeColor('#008170')
            .stroke();
            //here we have the bussines name again and a message to our coustomer...
        doc.fontSize(23)
        .font('Times-Roman')
        .fillColor('#005B41')
        //title of the secction...
        doc.text('Ticket de compra',0, 145, {
            align: 'center'
        })
        doc.fontSize(22)
        .font('Times-Roman')
        .fillColor('#005B41')
        //name of the bussines...
        doc.text('Abarrotes UNEDL', 47, 195)
        //The message...
        doc.fillColor('#232D3F')
        doc.fontSize(13)
        doc.text(`¡Gracias por elegir Abarrotes UNEDl! Valoramos su preferencia ${buyer.name_buyer + ' ' + buyer.last_name_buyer}.`, 47, 227, {
            width: 225, 
            align: 'left', 
        })

        //add the subTotal, the total and the taxes...
        //first we recive the subtotal, total and the taxes...
        const info = subTotalTaxes(purchase);
        doc.fontSize(15)
        .font('Times-Bold')
        doc.text(`Subtotal: ${info.subT}`, 370, 195, {layout: 'auto', marginTop: 1})
        doc.text(`Impuestos (16%): ${info.taxes}`, 370, 215)
        doc.text(`Total: ${info.total}`, 370, 238)
    }
    generarEncabezado();
    //if we have more page we add the header to those other pages...
    doc.on('pageAdded', () => {
        generarEncabezado();
    });

    //here we have to put the footer like the header, if we have more pages
    //the footer must be add in those pages...
    const footer = () => {
        /*first we need the line that separates the footer from the
        information above...*/
        doc.lineCap('butt')
            .moveTo(557, 630)
            .lineTo(30, 630)
            .lineWidth(7)
            .strokeColor('#008170')
            .stroke();
        //we add the qrl code...
        const imgWidth = 157;
        const imgHeight = 157;
        doc.image('./img/qrl.png', {
            fit: [imgWidth, imgHeight], 
            x: 44, 
            y: 660, 
            opacity: 0.3,
        });
        //and we also add the shipping information and so on...
        doc.fontSize(13)
            .font('Times-Bold')
            .fillColor('#232D3F')
            .text(`${buyer.name_buyer + ' ' + buyer.last_name_buyer}`,305, 669)
            .text(`${address.streed + ' ' + address.house_number + ', ' + address.neighborhood}`, 305, 694)
            .text(`${address.city + ', ' + address.state}`, 305, 714)
            .text('México', 305, 734)
        //here is the information about the order number, reference and weight of the package...
        //first the line separating the address fromt he packet information...
        doc.lineCap('butt')
            .moveTo(555, 757)
            .lineTo(300, 757)
            .lineWidth(2)
            .strokeColor('#008170')
            .stroke();
        //the packet information...
        doc.text('Número de orden: 4512078', 305, 767)
            .text('Referencia: PO45461', 305, 784)
    }
    //
    footer();
    //for each new page that is added we will add the footer on the page...
    doc.on('pageAdded', () => {
        footer();
    })

    //here we have the table that content all the products of the purchase...
    const tableOptions = {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["white", "#f5f4f4"],
        cellsPadding: 10,
        marginLeft: 35,
        marginRight: 35,
        headAling:'center',
        headColor : 'white',
        headFont : "Times-Bold",
        headFontSize : 13,
        headBackground : '#005B41',
        cellsFont : "Times-Roman",
        cellsFontSize : 11,
    };
    doc.addTable(
            [
                { key: 'name', label: 'Producto', align: 'left' },
                { key: 'amount', label: 'Cantidad', align: 'center'},
                { key: 'price', label: 'Precio $', align: 'center'},
                { key: 'total', label: 'Total $', align: 'right' }
            ],
            purchase, 
            tableOptions, 
        );
    // Render tables
    doc.render();

    const folder = './img/pdfs/'; 
    const fileName = `compra_${nameFile(buyer)}.pdf`; // file name
    doc.pipe(fs.createWriteStream(`${folder}${fileName}`)); // save the document...

    doc.end(); // end the document...

    return fileName;
}

module.exports = buildPDF;
