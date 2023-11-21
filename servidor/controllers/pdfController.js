const Producto = require("../models/Producto");
const User = require("../models/User");
const { jsPDF } = require('jspdf')
require('jspdf-autotable');

exports.generarPDf = async(req,res) =>{
    try {
        const user =  await User.find().lean();
        const productos = await Producto.find().lean();
        const nombreArchivo = 'MisProductos.pdf';
        const doc = new jsPDF();

        //tabla usuarios
        /* doc.setFontSize(15);   
        doc.autoTable({
        theme: 'grid',
        startY: 30,
        head: [[`Usuarios (${user.length})`, 'Email']],
        body: user.map(user => [user.username, user.email])
        }); */

      
        // Tabla de productos
        // doc.setFontSize(15);
        // doc.autoTable({
        // theme: 'grid',
        // startY: 90,
        // head: [[`Productos (${productos.length})`, 'Categoría','Precio','Ubicacion','Fecha de Creacion'],],
        // body: productos.map(producto => [producto.producto, producto.categoria, producto.precio,producto.ubicacion,producto.fechaCreacion]),
        // styles: {
        //     fillColor: [255, 192, 203] // Color rosa en formato RGB
        // }
        // });

        doc.text('MIS PRODUCTOS PDF', 14, 15); // Agrega el título en la parte superior de la hoja

        doc.autoTable({
            theme: 'grid',
            startY: 30, // Ajusta la posición de inicio para centrar la tabla en la hoja
            head: [['Productos', 'Categoría', 'Precio', 'Ubicación', 'Fecha de Creación']],
            body: productos.map(producto => [producto.producto, producto.categoria, producto.precio, producto.ubicacion, producto.fechaCreacion]),
            headStyles: {
                fillColor: [128, 0, 0], // Rojo oscuro para la cabecera en formato RGB
                textColor: [255, 255, 255] // Texto blanco en formato RGB
            },
            bodyStyles: {
                fillColor: [244, 164, 96], // Marrón claro para el cuerpo en formato RGB
                textColor: [0, 0, 0] // Texto negro en formato RGB
            }
        });

        

        res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.contentType('application/pdf');
        res.send(Buffer.from(doc.output('arraybuffer')));


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }

   
}
