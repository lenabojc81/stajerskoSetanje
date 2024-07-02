import express from 'express';
import Pot from './models/pot';

const router = express.Router();

router.post('/dodajPot', async (req, res) => {
    try {
        const pot = new Pot(req.body);
        await pot.save();
        res.status(201).send(pot);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
});

export default router;