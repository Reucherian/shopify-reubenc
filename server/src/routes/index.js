import express from 'express';
import inventory from './inventory.js';

const { Router } = express;

// new routes will be added here

export default () => {
    const app = Router();
    inventory({app});
    return app;
}