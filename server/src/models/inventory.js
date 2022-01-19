import mongoose from 'mongoose';

const { Schema } = mongoose;

const inventorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 0
    },
    checkInDate:{
        type: Date,
        required: true
    },
    checkOutDate:{
        type: Date,
        required: false
    }
});

export default mongoose.model('inventory', inventorySchema); 
