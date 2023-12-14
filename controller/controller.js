import { where } from "sequelize";
import {
    productsModel, 
    details, 
    productAttributes, 
    ExtraImgs, 
    registepurchaseModel, 
    buyerModel, 
    addressModel, 
    opinionsModels
} from "../models/models.js";
import buildPDF from './pdfGenerator.cjs';
import { sendEmail } from "./sendEmail.js";

//get...
export const getProducts = async (req, res) => {
    try {
        const products = await productsModel.findAll();
        res.json(products);
    } catch (error) {
        res.json({message: error.message});
    }
}

productsModel.belongsTo(details, {foreignKey: 'details_product', as: 'detailsOfProduct'}); 
details.belongsTo(ExtraImgs, {foreignKey: 'extra_img', as: 'img'});
productAttributes.belongsTo(productsModel, { foreignKey: 'product_id' });
productsModel.hasMany(productAttributes, { foreignKey: 'product_id', as: 'productAttributes' });
opinionsModels.belongsTo(productsModel, { foreignKey: 'id_product' });
productsModel.hasMany(opinionsModels, {foreignKey: 'id_product', as: 'opinions'});
export const getProductInfo = async (req, res) => {
    try{
        const product = await productsModel.findAll({
            where:{id_p:req.params.id}, 
            include:[
                {
                    model:details, 
                    as: 'detailsOfProduct', 
                    attributes: ['category', 'long_description','promo'], 
                    include: [
                        {
                            model: ExtraImgs,
                            as: 'img', 
                            attributes: ['img1', 'img2', 'img3'],
                        }
                    ]
                },
                {
                    model: productAttributes,
                    as: 'productAttributes',
                    attributes: ['att_name', 'att_value'],
                },
                {
                    model:opinionsModels, 
                    as: 'opinions', 
                    attributes: {
                        exclude: ['id_product']
                    }
                }
            ]
        })
        res.json(product);
    } catch(error){
        res.json({message: error.message});
    }
};

//create
export const postOpinion = async (req, res) => {
    try {
        await opinionsModels.create(req.body);
        res.json({
            "message":"¡New registration successfully created!"
        })
    } catch (error) {
        res.json({message: error.message});
    }
};

//we process the purchase data...
export const processPurchase = async (req, res) => {
    try {
        //we extract data from the submitted form...
        const {formDataBuyer, formDataAddress, purchaseProduct} = req.body;
        /*we process the data to store them in the corresponding 
        tablas... */
        //address table...
        const addressCreated = await addressModel.create({
            state: formDataAddress[0].value,
            city: formDataAddress[1].value,
            neighborhood: formDataAddress[2].value,
            streed: formDataAddress[3].value,
            house_number: formDataAddress[4].value,
            zip_code: formDataAddress[5].value
        });
        //then we create the buyer register...
        const buyerCreated = await buyerModel.create({
            name_buyer: formDataBuyer[0].value,
            last_name_buyer: formDataBuyer[1].value,
            address_id: addressCreated.dataValues.id_add, 
            email: formDataBuyer[2].value,
            phone: formDataBuyer[3].value
        }); 
        //we go through the array...
        for(const product of purchaseProduct){
            const purchaseRe = await registepurchaseModel.create({
                buyer_id: buyerCreated.dataValues.id_buyer,
                product_id: product.id_p, 
                amount: product.amount,
                payment_method: product.method,
                total: product.total,
                date_purchase: new Date(),
            });
        }
        //this is the data we send to generate the pdf file...
        const data = {
            buyer: buyerCreated.dataValues, 
            address: addressCreated.dataValues, 
            purchase: purchaseProduct
        }
        //we wait for it to return the path to where the file is, with its name...
        const ruta = buildPDF(data);
        //we send the email...
        //we wait 3 seconds...
        setTimeout(() => {
            const info = sendEmail(data, ruta);
        }, 3000);
        //we send a response to the customer...
        res.status(200).json({
            message: 'successfully processe, the purchase was registered.', 
            info: 'sent'
        });

    } catch (error) {
        //error response...
        res.status(500).json({message: error.message});
    }
}