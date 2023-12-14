/*here is all the code to send the purchase confirmation mail*/
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

//get the path to the current directory...
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//load environment variables from the .env file...
dotenv.config({path: path.resolve(_dirname, '../.env')});

export const sendEmail = async (data, pathPdf) => {

    const { buyer, address } = data; 
    const fullPath = './img/pdfs/' + pathPdf;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASS 
            }
        })

        //leer el archivo y convertirlo a base64...
        const pdfAttachment = fs.readFileSync(fullPath).toString('base64');

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: buyer.email,
            subject: 'Confirmación de compra',
            text: 'Gracias por su preferencia, en abarrotes UNEDL siempre estamos cerca de ti.',
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "www.w3.org/
                TR/xhtml-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                        <meta http-equiv="X-UA-Compatible" content="IE-edge" />
                        <meta name="viewport" content="width=device-width, initial-scalete=1.0">
                        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
                        <title>Abarrotes UNEDL mail</title>
                        <style type="text/css">
                            body{
                                margin: 0;
                                background-color: #cccc;
                            }
                            table {
                                border-spacing: 0;
                            }
                            td{
                                padding: 0;
                            }
                            img{
                                border: 0;
                            }
                            .wrapper{
                                width: 100%;
                                table-layout: fixed;
                                background-color: #cccc;
                                padding-bottom: 60px;
                            }
                            .main{
                                background-color: white;
                                margin: 0 auto;
                                width: 100%;
                                max-width: 600px;
                                border-spacing: 0;
                                font-family: sans-serif;
                                color: #171a1b;
                            }
                            .two-columns{
                                text-align: center;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 10px;
                            }
                            .socialMedia{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-right: 1em;
                            }
                            .socialMedia a{
                                text-decoration: none;
                                width: 50px;
                            }
                            .socialMedia a i{
                                font-size: 1.8em;
                                color: #171a1b;
                            }

                            .cont_img{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-bottom: 5px;
                            }
                            .cont_img a{
                                width: 100%;
                                height: auto;
                                border-radius: 100px;
                            }
                            .cont_img a img{
                                width: 100px;
                                border-radius: 100px;
                            }

                            .banner{
                                width:100%;
                            }
                            .banner .text_cont{
                                width: 100%;
                                text-align: center;
                                line-height: 1.5;
                            }
                            .banner .text_cont h3{
                                color: black;
                                font-size: 1.6em;
                            }
                            .banner .text_cont h3 span{
                                text-decoration: underline;
                            }
                            .banner .text_cont p{
                                font-size: 1.1em;
                                margin: 0 1em;
                                color: black;
                                margin-bottom: 1em;
                                letter-spacing: 0.03em;
                            }
                            .banner .text_cont p span{
                                font-weight: 600;
                            }

                            .message{
                                padding: 1em;
                            } 
                            .message p{
                                color: #232D3F;
                                font-size: 1.1em;
                                font-weight: 300;
                                line-height: 1.5;
                                letter-spacing: 0.03em;
                            } 
                            .message p span{
                                font-weight: 500;
                                color: #008170;
                            }
                            .message p a{
                                text-decoration: none;
                                color: #005B41;
                                font-weight: 600;
                            }
                            .message .contact_us_cont{
                                margin-top: 2em;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 20px;
                                padding: 1em 0;
                                
                            }
                            .message .contact_us_cont a{
                                padding: 0.7em 0;
                                border-radius: 0.5em;
                                width: 180px;
                                text-align: center;
                                text-decoration: none;
                                color: white;
                                background-color: #008170;
                                font-size: 1.1em;
                                font-weight: 500;
                                box-shadow: 0px 1px 4px rgba(21, 21, 21, 0.182);
                            }

                            .footer{
                                background-color: rgb(232, 232, 232);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                            }
                            .footer .copyRight{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                                text-align: center;
                                line-height: 1.5;
                                color: #008170bd;
                                padding: 0 1em;
                            }
                        </style> 
                    </head>
                    <body>
                        <center class="wrapper">
                            <table class="main" width="100%">
                                <!--top border-->
                                <tr>
                                    <td height="8" style="background-color: #005B41;">

                                    </td>
                                </tr>
                                <!--logo section-->
                                <tr>
                                    <td style="padding: 14px 0 4px;">
                                        <table width="100%">
                                            <tr>
                                                <td class="two-columns">
                                                    <table class="column">
                                                        <tr>
                                                            <td style="padding: 0 15px" class="cont_img">
                                                                <a href="https://abarrotesuniversidad.shop">
                                                                    <img src="https://abarrotesuniversidad.shop/image/Abarrotes.png" alt="" width="180" title="Abarrotes UNEDL ">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="column">
                                                        <tr>
                                                            <td class="socialMedia" style="padding: 10px 10px; color:black">
                                                                <a href="https://www.facebook.com/unedl.universidad" target="_blank">
                                                                    <i class='bx bxl-facebook-circle'></i>
                                                                </a>
                                                                <a href="https://instagram.com/richard_b_stone?utm_source=qr" target="_blank">
                                                                    <i class='bx bxl-instagram-alt' ></i>
                                                                </a>
                                                                <a href="https://ricardomedina.website/" target="_blank">
                                                                    <i class='bx bx-link-alt' ></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!--banner image-->
                                <tr>
                                    <td class="banner">
                                        <a href="https://abarrotesuniversidad.shop/">
                                            <img src="https://images.unsplash.com/photo-1584771145729-0bd9fda6529b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
                                            width="600" style="max-width: 100%;">
                                        </a>
                                        <table>
                                            <tr>
                                                <td class="text_cont">
                                                    <!--This has to chance, it has to content the name of the costumer...-->
                                                    <h3>¡Hola!<span> ${buyer.name_buyer + ' ' + buyer.last_name_buyer}</span></h3>
                                                    <p>
                                                        En abarrotes <span>UNEDL</span> estamos siempre a 
                                                        un click <i class='bx bxs-mouse-alt' ></i> de distancia. 
                                                        Para nosotros siempre seras lo más importante.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!--Message-->
                                <tr>
                                    <td class="message">
                                        <p>Estimado/a <span>${buyer.name_buyer + ' ' + buyer.last_name_buyer}</span>,</p>
                                        <p>Agradecemos sinceramente su preferencia y confianza al elegirnos para su compra. Nos complace informarle que su pedido se encuentra en proceso y está siendo preparado para su envío.</p>
                                        <p>La dirección de envío registrada para su pedido es:</p>
                                        <p><span>${buyer.name_buyer + ' ' + buyer.last_name_buyer}</span><br>
                                        ${address.streed + ' ' + address.house_number + ', ' + address.neighborhood},<br>
                                        ${address.city + ', ' + address.state + ', C.P. ' + address.zip_code}</p>
                                        <p>Una vez que su paquete haya sido despachado de nuestras instalaciones, recibirá una notificación automáticamente en la dirección de correo electrónico proporcionada (<a href="mailto:${buyer.email}">${buyer.email}</a>) para informarle que su pedido está en camino hacia su destino.</p>
                                        <p>Agradecemos nuevamente su compra y quedamos a su disposición para cualquier consulta adicional.</p>
                                        <p>Atentamente,</p>
                                        <p><span>Atención al cliente,<br> 
                                        Abarrotes UNEDL</span></p>
                                        <table width="100%">
                                            <tr>
                                                <td class="contact_us_cont">
                                                    <a href="#" class="contactUs">Atencion al cliente</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!--Footer-->
                                <tr class="footer">
                                    <td class="copyRight">
                                        <p>Copyright <i class='bx bxs-copyright' ></i> 2023 Abarrotes UNEDL. Derechos reservados.</p>
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </body>
                </html>
            `, 
            attachments: [
                {
                    filename: 'compraAUNEDL.pdf', 
                    content: pdfAttachment, 
                    encoding: 'base64', 
                    contentType: 'application/pdf' 
                }
            ]
        });

        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};