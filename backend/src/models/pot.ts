import mongoose, { Schema, Document } from 'mongoose';

interface ICoordinate {
    lat: number;
    lng: number;
}

interface ITocka extends Document {
    ime: string;
    lokacija: ICoordinate;
    uganka: string;
    // zaporedje: number;
}

interface IPot extends Document {
    ime: string;
    tezavnost: number;
    dolzina: number;
    opis: string;
    //zacetna_lokacija: ICoordinate;
    vmesne_tocke: ITocka[];
}

const TockaSchema: Schema = new Schema({
    ime: { type: String, required: true },
    lokacija: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    uganka: { type: String, required: true },
    // zaporedje: {type: Number, required: true}
});

const PotSchema: Schema = new Schema({
    ime: { type: String, required: true },
    tezavnost: { type: Number, required: true },
    dolzina: { type: Number, required: true },
    opis: { type: String, required: true },
    //zacetna_lokacija: { type: { lat: Number, lng: Number}, required: true},
    vmesne_tocke: { type: [TockaSchema], required: true }
});

export default mongoose.model<IPot>('Pot', PotSchema);
