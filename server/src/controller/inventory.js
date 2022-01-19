import Inventory from '../models/inventory.js'
import { downloadCsv } from '../helper/csvParser.js';
// TODO: add a before, after and max so as to enable some form of pagination in getInventoryItems.
// TODO: do better error handling for the functions written
// TODO: use JOI package to handle data validation

// get all inventory items
export async function getInventoryItems(req,res){
    try{
        console.log("Getting all inventory items");
        const inventory = await Inventory.find();
        res.json(inventory);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
}

//  get an inventory item given the id of the inventory item 
export async function getInventoryItem(req,res){
    try{
        console.log("Getting an inventory item");
        const inventory = await Inventory.findById(req.params.id);
        res.status(200).json(inventory);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid inventory id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

// create one inventory item addInventoryItem()
export async function addInventoryItem(req,res){
    console.log(req.body);
    const inventory = new Inventory({
        name: req.body.name,
        quantity: req.body.quantity || 1,
        checkInDate: new Date(),
        checkOutDate: req.body.checkOutDate || null
    });
    try{
        console.log("Inserting an inventory item");
        const response = await inventory.save();
        res.status(201).json(response);
    }catch(err){
        res.json({message: 'Error '+err});
    }
}

// update the inventory item its name / quantity updateInventoryItem()
export async function updateInventoryItemName(req,res){
    try{
        console.log("Updating inventory item");
        const { id } = req.params;
        const { name : updateName } = req.body;
        const response = await Inventory.findByIdAndUpdate(id, { name: updateName },{returnOriginal:false});
        res.json(response);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid inventory id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

// increase or decrease the inventory items quantity by one step
export async function stepInventoryQuantity(req,res){
    try{
        const { id } = req.params;
        const { stepInc } = req.query;
        console.log("Stepping the inventory quantity");
        console.log(id);
        const step = (stepInc === 'true'? 1 : -1);
        const inventory = await Inventory.findOneAndUpdate( {_id: id, quantity: { $gt: (-1 - step) } }, {$inc:{quantity:step}}, {returnOriginal:false});
        if(!inventory) return res.json({})
        res.json(inventory);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid inventory id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

// delete an inventory item using its id
export async function deleteInventoryItem(req,res){
    try{
        console.log("Deleting inventory item");
        const inventory = await Inventory.findById(req.params.id);
        if(inventory == null){
            throw('Item does not exist')
        }
        const response = await inventory.delete();
        res.json(response);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid inventory id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

// sends all inventory items as a csv file
export async function exportAsCsv(req,res){
    console.log("Exporting all inventory items");
    const fields = [
        {
            label: 'Name',
            value: 'name'
        },
        {
            label: 'Quantity',
            value: 'quantity'
        },
        {
            label: 'Date Check-In',
            value: 'checkInDate'
        },
        {
            label: 'Date Check-Out',
            value: 'checkOutDate'
        }
    ];
    const data = await Inventory.find();
    return downloadCsv(res,'all_inventory.csv',fields,data);
}