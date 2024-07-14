import mongoose, { Schema, Document } from 'mongoose';

interface ICoordinate {
    lat: number;
    lng: number;
}

interface IOdgovor {
    odgovor: string;
    pravilen: boolean;
}
interface IDodatnoVprasanje extends Document {
    vprasanje: string;
    odgovori: IOdgovor[];
}

interface ITocka extends Document {
    ime: string;
    lokacija: ICoordinate;
    uganka: string;
    // zaporedje: number;
    dodatna_vprasanja: IDodatnoVprasanje[];
}

interface IPot extends Document {
    ime: string;
    tezavnost: number;
    dolzina: number;
    opis: string;
    tocke: number;
    //zacetna_lokacija: ICoordinate;
    vmesne_tocke: ITocka[];
}
const OdgovorSchema: Schema = new Schema({
    odgovor: { type: String, required: true },
    pravilen: { type: Boolean, required: true }
});

const DodatnoVprasanjeSchema: Schema = new Schema({
    vprasanje: { type: String, required: true },
    odgovori: { type: [OdgovorSchema], required: true }
});

const TockaSchema: Schema = new Schema({
    ime: { type: String, required: true },
    lokacija: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    uganka: { type: String, required: true },
    dodatna_vprasanja: { type: [DodatnoVprasanjeSchema], required: true }
    // zaporedje: {type: Number, required: true}
    
});

const PotSchema: Schema = new Schema({
    ime: { type: String, required: true },
    tezavnost: { type: Number, required: true },
    dolzina: { type: Number, required: true },
    opis: { type: String, required: true },
    tocke: { type: Number, required: true },
    //zacetna_lokacija: { type: { lat: Number, lng: Number}, required: true},
    vmesne_tocke: { type: [TockaSchema], required: true }
});

export default mongoose.model<IPot>('Pot', PotSchema);
