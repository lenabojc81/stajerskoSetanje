import express from 'express';
import Pot from '../models/pot';
import {mongoose} from  '../db';

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

router.put('/posodobiPot/:id', async (req, res) => {
    try {
        const potId = req.params.id;
        const updatedPot = await Pot.findByIdAndUpdate(potId, req.body, { new: true });
        
        if (!updatedPot) {
            return res.status(404).send({ error: 'Pot not found' });
        }

        console.log('successfully updated');
        res.status(200).send(updatedPot);
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

router.post('/pridobiOdgovore', async (req, res) => {
    try {
        const { tipOdgovora, neOdgovor } = req.body;
        const odgovori = await Pot.aggregate([
            { $unwind: "$vmesne_tocke" },
            { $match: { "vmesne_tocke.odgovor.tip_odgovor": tipOdgovora } },
            { $project: { "vmesne_tocke.odgovor.odgovor": 1, _id: 0, "vmesne_tocke.lokacija": 1, "isNotSame": { $ne: ["$vmesne_tocke.odgovor.odgovor", neOdgovor] } } },
            { $match: { "isNotSame": true } },
            { $sample: { size: 3 } },
        ]);
        res.status(200).json(odgovori);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const potId = new mongoose.Types.ObjectId(req.params.id);
        console.log(potId);
        const pot = await Pot.findById(potId);
        if (!pot) {
            return res.status(404).send({ error: 'Pot not found' });
        }
        res.status(200).json(pot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

export default router;