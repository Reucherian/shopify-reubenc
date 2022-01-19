import express from 'express';
import * as inventoryController from '../controller/inventory.js';

const { Router } = express;
const route = Router();


export default ({app}) => {
    app.use('/inventory',route);
    route.get('/',inventoryController.getInventoryItems);
    route.get('/exportAllCsv',inventoryController.exportAsCsv);
    route.patch('/updateName/:id',inventoryController.updateInventoryItemName);
    route.patch('/stepQuantity/:id',inventoryController.stepInventoryQuantity);
    route.get('/:id',inventoryController.getInventoryItem);
    route.post('/', inventoryController.addInventoryItem);
    route.delete('/:id',inventoryController.deleteInventoryItem);
};

