import express from 'express'

import * as clientController from '../controllers/clientController.js'

const router = express.Router();

router.get('/clients', clientController.getProducts);
router.post('/clients', clientController.createProducts);
router.put('/clients/:id', clientController.updateProducts);
router.delete('/clients/:id', clientController.deleteProduct);
router.get('/clients/search', clientController.searchProduct);

export default router;