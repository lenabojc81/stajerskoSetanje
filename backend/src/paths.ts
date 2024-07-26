import express from 'express';
import Pot from './models/pot';
import {mongoose} from  './db';

const router = express.Router();

router.post('/dodajPot', async (req, res) => {
    try {
        const pot = new Pot(req.body);
        await pot.save();
        res.status(200).send(pot);
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

router.get('/pridobiOdgovore/:potId/:tipOdgovora', async (req, res) => {
    try {
        const potId = req.params.potId;
        const tip = req.params.tipOdgovora;
        const odgovori = await Pot.aggregate([
            { $match: { "_id": new mongoose.Types.ObjectId(potId) } },
            { $unwind: "$vmesne_tocke" },
            { $unwind: "$vmesne_tocke.odgovori" },
            { $match: { "vmesne_tocke.odgovori.tip_odgovor": tip } },
            { $limit: 3 },
            { $project: { "vmesne_tocke.odgovori.odgovor": 1, _id: 0 } }
        ]);
        res.status(200).json(odgovori);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
})

export default router;