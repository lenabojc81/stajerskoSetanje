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

router.get('/pridobiPoti', async (req, res) => {
    try {
        const poti = await Pot.find({});
        res.status(200).json(poti);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
export default router;