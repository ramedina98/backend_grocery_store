import express from 'express';
import { 
    getProducts, 
    getProductInfo, 
    postOpinion, 
    processPurchase
} from '../controller/controller.js';
import { get } from 'http';

const router = express.Router();

//route, get all the info...
router.get('/products', getProducts);
router.get('/details/:id', getProductInfo);
//route, post...
router.post('/nuevaOpinion', postOpinion);
router.post('/purchaseRegistration', processPurchase);
//hacer pruebas con este api...
export default router