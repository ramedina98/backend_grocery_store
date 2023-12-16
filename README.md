# Backend Unedl Grocery Store. 

This proyect was created with the purpose of testing new skills in web development. This is the [Backend] of the project only, but the whole project (backend and frontend) was developed by me.

link to the [Frontend] repository --> https://github.com/ramedina98/abarrotes_UNEDL.github.io

This is the link to the page, I used render web service to put it online --> https://grocery-store-unedl4.onrender.com/

## What dependencies does the project use? 

1. cors ^2.8.5
2. dotenv ^16.3.1
3. express ^4.18.2
4. mysql2 ^3.6.3
5. nodemailer ^6.9.7
6. pdfkit ^0.14.0
7. pdfkit-construct ^1.2.3
8. sequelize ^6.35.0

## Purpose. 

The purpose of this app with node.js, is to have access to 4 API's, two to get information (get) and two to send information (post). 

[GET]

1. The first API ["get"] gets all the information from the products table, that it is its purpose. This information is displayed in the main view (/) of the store pages.

[FORM] --> /abarrotes_unedl/products

Full [URL]: https://grocery-store-unedl4.onrender.com/[abarrotes_unedl/products]

2. The following API ["get"] only takes the information of a specific product: product information, details of its contents and opinions of other buyers about the product.

[FORM] --> /abarrotes_unedl/details/:id

Full [URL]: https://grocery-store-unedl4.onrender.com/[abarrotes_unedl/details/:id]

[POST]

1. The first API ["post"] we have, helps us to save new opinions from buyers about a specific product in the database.

The data and the type of data that are required to be sent to the database are: 

- name_user --> STRING(60).
- fecha --> DATEONLY. 
- title --> STRING(100).
- opinion --> TEXT. 
- score --> DECIMAL(3, 2). 
- id_product --> INTEGER. 

Important note :warning: 

The id of the new opinion record is auto incrementable, so it is not necessary to sent it.

[FORM] --> /abarrotes_unedl/nuevaOpinion

Full [URL]: https://grocery-store-unedl4.onrender.com/[abarrotes_unedl/nuevaOpinion]

2. This API is the most complex in its construction, it must save the information that is sent from the form in the view "Pay view" where it is sent and save data of the buyer, his address and the products that he bought. In addition a PDF is created (calling another function) which is the purchase invoice and a confirmation email is sent (also calling another function) to the buyer. 

This is the correct way to packege the data and send it through the API :warning: 

- 3 arrays are created, which have the following form and order [(frontend-code)]: 
```javascript
//array where are the buyer's data...
const buyerData = ['nombre', 'apellidos', 'correo', 'phone'];
//array where are the address of buyer data...
const addressData = ['stado', 'ciudad', 'colonia', 'calle', 'numero', 'CP'];
//we take the data from the form and separate them...
inputs.forEach(item => {
    if(buyerData.includes(item.name)){
        /*here we only require data closely related to 
        the buyer...*/
        if(item.name === 'phone'){
            const phone = funciones.removeHyphens(item.value);

            formDataBuyer.push({
                name: item.name, 
                value: parseInt(phone)
            });
        } else{
            formDataBuyer.push({
                name: item.name, 
                value: item.value
            });
        }
    } else if(addressData.includes(item.name)){
        /*and here only the buyer's address information
        is required...*/
        if(item.name === 'CP'){
            formDataAddress.push({
                name:item.name, 
                value: parseInt(item.value)
            })
        } else{
            formDataAddress.push({
                name:item.name, 
                value: item.value
            })
        }
    }
})
/*we take the data from the shopping cart*/
const purchaseProduct = cart.map(item => {
    return {
        id_p: parseInt(item.producto.id_p), 
        amount: parseInt(item.cantidad), 
        method: selectPaymentMethod.value, 
        total: parseFloat(item.producto.price * item.cantidad), 
        name: item.producto.description, 
        price: item.producto.price
    }
});
```
- At the end, the data must be sent in the following way: 
```javascript 
await axios.post('https://grocery-store-unedl4.onrender.com/abarrotes_unedl/purchaseRegistration', {
                        formDataBuyer: formDataBuyer, 
                        formDataAddress: formDataAddress, 
                        purchaseProduct: purchaseProduct
                    });
```
- After the data is receive and stored in the database, the process continoues to create the PDF with the data sent from the frontend in the arrays, and subsequently, the email is sent attaching the PDF and using the same data sent in the arrays.

[FORM] --> /abarrotes_unedl/purchaseRegistration

Full [URL]: https://grocery-store-unedl4.onrender.com/[abarrotes_unedl/purchaseRegistration]

## DataBase
The database we are working with is small, and was created with [Mysql]. It is hosted at hostinger.

The [MVC] desing pattern was used in this project.