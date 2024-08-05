import express from 'express';
import Pot from '../models/pot';
import {mongoose} from  './db';

const router = express.Router();

router.post('/dodajPot', async (req, res) => {
    try {
        const pot = new Pot(req.body);
        await pot.save();
        console.log('successfully added');
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

router.get('/pridobiOdgovore/:tipOdgovora/:neOdgovor', async (req, res) => {
    try {
        const neOdgovor = req.params.neOdgovor;
        const tip = req.params.tipOdgovora;
        const odgovori = await Pot.aggregate([
           // { $match: { "_id": new mongoose.Types.ObjectId(potId) } },
            { $unwind: "$vmesne_tocke" },
            { $match: { "vmesne_tocke.odgovor.tip_odgovor": tip } },
            { $project: { "vmesne_tocke.odgovor.odgovor": 1, _id: 0, "vmesne_tocke.lokacija": 1, "isNotSame": { $ne: ["$vmesne_tocke.odgovor.odgovor", neOdgovor] } } },
            { $match: { "isNotSame": true } },
            { $sample: { size: 3 } },
        ]);
        res.status(200).json(odgovori);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
})

export default router;