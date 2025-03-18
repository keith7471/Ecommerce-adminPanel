import express from 'express'

import * as clientController from '../controllers/clientController.js'

const router = express.Router();

router.get('/products', clientController.getProducts);
router.post('/products', clientController.createProducts);
router.put('/products/:id', clientController.updateProducts);
router.delete('/products/:id', clientController.deleteProduct);
router.get('/products/search', clientController.searchProduct);

export default router;