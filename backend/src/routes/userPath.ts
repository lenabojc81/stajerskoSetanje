import express from 'express';
import UporabnikPot from '../models/userPot';
import {mongoose} from  '../db';

const router = express.Router();



router.get('/lestvica', async (req, res) => {
    console.log('API klic za /lestvica dosežen');
    try {
        const uporabnikPoti = await UporabnikPot.aggregate([
            {
                $group: {
                    _id: "$idUporabnik", 
                    skupneTocke: { $sum: "$skupne_tocke" }, 
                    uporabnik_naziv: { $first: "$uporabnik_naziv" }
                }
            },
            {
                $sort: { skupneTocke: -1 } 
            }
        ]);

        console.log('UporabnikPoti:', uporabnikPoti); 
        res.status(200).json(uporabnikPoti);
    } catch (error) {
        console.error('Napaka pri pridobivanju podatkov:', error);
        res.status(500).json({ error: (error as any).message });
    }
});



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

//pridobi iz baze in nadaljuj z vnosom v to uporabnikPot 
//(200-koncana, 201-nadaljuj, 404-zacni od zacetka, 203-prisilno koncana)
//vrne uporabnikPot
router.get('/:idUporabnik/:idPot', async (req, res) => {
    try {
        const uporabnikPot = await UporabnikPot.aggregate([
            {
                $match: {
                    'idUporabnik': req.params.idUporabnik,
                    'idPot': req.params.idPot
                }
            }
        ]);
        res.status(200).json(uporabnikPot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

//pridobi vse uporabnikove poti
router.get('/:idUporabnik', async (req, res) => {
    try {
        const uporabnikPot = await UporabnikPot.aggregate([
            {
                $match: {
                    'idUporabnik': req.params.idUporabnik
                }
            }
        ]);
        res.status(200).json(uporabnikPot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});





export default router;