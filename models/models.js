import db from '../database/db.js';
import { DataTypes } from 'sequelize';

/*these models are to obtain the products and their details...*/

// productsModel model
export const productsModel = db.define('products', {
    id_p: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT },
    brand: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER },
    details_product: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
    freezeTableName: true
});
// details model
export const details = db.define('details', {
    id_details: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.ENUM('foot', 'beer', 'liquor', 'technology', 'clothing') },
    long_description: { type: DataTypes.TEXT },
    promo: { type: DataTypes.INTEGER },
    extra_img: { type: DataTypes.INTEGER },
}, {
    timestamps: false,
    freezeTableName: true
});
// product_attributes model
export const productAttributes = db.define('product_attributes', {
    id_att: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    att_name: { type: DataTypes.STRING, allowNull: false },
    att_value: { type: DataTypes.STRING, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
    freezeTableName: true
});
//extra imgs...
export const ExtraImgs = db.define('extra_imgs', {
    id_extraImg: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img1: { type: DataTypes.STRING, allowNull: false },
    img2: { type: DataTypes.STRING, allowNull: false },
    img3: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    freezeTableName: true
});
//opinions...
export const opinionsModels = db.define('opinions', {
    id_op: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name_user: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    opinion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    score: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id_p'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true, 
    //checar esto despues...
    /*getterMethods: {
        formattedDate() {
            const fecha = this.getDataValue('fecha');
            if(fecha){
                const formatted = fecha.toLocaleDateString('es-ES');

                return formatted;
            }

            return null;
        }
    }*/
});

/*these models are for, 
first: save the information of the purchase and the buyer, and after
that get some relevant data of that purchase, 
second: generate the ticket that details the purchase
that has been made, 
third: is sent in the email confirmation of the purchase.*/
//register purchase
export const registepurchaseModel = db.define('purchase_register', {
    id_purchase: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    buyer_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    payment_method: { type: DataTypes.STRING, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false },
    date_purchase: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: false, 
    freezeTableName:true
})
//buyer information...
export const buyerModel = db.define('buyer',{
    id_buyer: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_buyer: { type: DataTypes.STRING, allowNull: false },
    last_name_buyer: { type: DataTypes.STRING, allowNull: false },
    address_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps:false, 
    freezeTableName:true
})
//address
export const addressModel = db.define('address', {
    id_add: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    state: {
        type: DataTypes.ENUM(
            'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
            'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
            'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
            'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
            'Veracruz', 'Yucatán', 'Zacatecas'
        ),
        allowNull: false,
    },
    city: { type: DataTypes.STRING, allowNull: false },
    streed: { type: DataTypes.STRING, allowNull: false },
    house_number: { type: DataTypes.STRING, allowNull: false },
    neighborhood: { type: DataTypes.STRING, allowNull: false },
    zip_code: { type: DataTypes.INTEGER(5), allowNull: false },
},{
    timestamps:false, 
    freezeTableName:true
})