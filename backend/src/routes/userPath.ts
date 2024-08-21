import express from 'express';
import UporabnikPot from '../models/userPot';
import {mongoose} from  '../db';

const router = express.Router();

router.post('/dodajUporabnikPot', async (req, res) => {
    try {
        const uporabnikPot = new UporabnikPot(req.body);
        await uporabnikPot.save();
        console.log('successfully added');
        res.status(200).send(uporabnikPot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    };
});

export default router;