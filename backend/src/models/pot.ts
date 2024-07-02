// import mongoose, { Schema, Document } from 'mongoose';

// interface ITocka extends Document {
//     ime: string;
//     lokacija: {
//         lat: Number;
//         lng: Number;
//     };
// }

// interface IPot extends Document {
//     ime: string;
//     tezavnost: Number;
//     dolzina: Number;
//     opis: string;
//     vmesne_tocke: Array<ITocka>;
// }

// const TockaSchema: Schema = new Schema({
//     ime: { type: String, required: true },
//     lokacija: {
//         lat: { type: Number, required: true },
//         lng: { type: Number, required: true }
//     }
// });

// const PotSchema: Schema = new Schema({
//     ime: { type: String, required: true },
//     tezavnost: { type: Number, required: true },
//     dolzina: { type: Number, required: true },
//     opis: { type: String, required: true },
//     vmesne_tocke: { type: [TockaSchema], required: true }
// });

// export default mongoose.model<IPot>('Pot', PotSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface ICoordinate {
    lat: number;
    lng: number;
}

interface ITocka extends Document {
    ime: string;
    lokacija: ICoordinate;
}

interface IPot extends Document {
    ime: string;
    tezavnost: number;
    dolzina: number;
    opis: string;
    vmesne_tocke: ITocka[];
}

const TockaSchema: Schema = new Schema({
    ime: { type: String, required: true },
    lokacija: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }
});

const PotSchema: Schema = new Schema({
    ime: { type: String, required: true },
    tezavnost: { type: Number, required: true },
    dolzina: { type: Number, required: true },
    opis: { type: String, required: true },
    vmesne_tocke: { type: [TockaSchema], required: true }
});

export default mongoose.model<IPot>('Pot', PotSchema);
