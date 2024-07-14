import mongoose, { Schema, Document } from "mongoose";

interface ICoordinate {
  lat: number;
  lng: number;
}

interface IVprasanjaZaDodatneocke {
  vprasanje: string;
  odgovori: string[];
}

interface IOdgovor {
  odgovor: string;
  tip_odgovora: string;
}

interface ITocka extends Document {
  ime: string;
  lokacija: ICoordinate;
  uganka: string;
  odgovor: IOdgovor;
  dodatna_vprasanja: IVprasanjaZaDodatneocke[];
}

interface IPot extends Document {
  ime: string;
  tezavnost: number;
  dolzina: number;
  opis: string;
  tocke: number;
  zacetna_lokacija: ICoordinate;
  vmesne_tocke: ITocka[];
}

const OdgovorSchema: Schema = new Schema({
  odgovor: { type: String, required: true },
  tip_odgovora: { type: String, required: true },
});

const VprasanjaZaDodatneockeSchema: Schema = new Schema({
  vprasanje: { type: String, required: true },
  odgovori: { type: [String], required: true },
});

const TockaSchema: Schema = new Schema({
  ime: { type: String, required: true },
  lokacija: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  uganka: { type: String, required: true },
  odgovor: { type: OdgovorSchema, required: true },
  dodatna_vprasanja: {
    type: [VprasanjaZaDodatneockeSchema],
    required: true,
  },
});

const PotSchema: Schema = new Schema({
  ime: { type: String, required: true },
  tezavnost: { type: Number, required: true },
  dolzina: { type: Number, required: true },
  opis: { type: String, required: true },
  tocke: { type: Number, required: true },
  zacetna_lokacija: { type: { lat: Number, lng: Number }, required: true },
  vmesne_tocke: { type: [TockaSchema], required: true },
});

export default mongoose.model<IPot>("Pot", PotSchema);

// const test_post_data: IPot = {
//   ime: "Pot okoli jezera",
//   tezavnost: 3,
//   dolzina: 7.5,
//   opis: "Sprehod okoli jezera z ugankami in zanimivostmi.",
//   tocke: 50,
//   zacetna_lokacija: {
//     lat: 46.3601,
//     lng: 14.0985,
//   },
//   vmesne_tocke: [
//     {
//       ime: "Prva točka",
//       lokacija: {
//         lat: 46.3611,
//         lng: 14.095,
//       },
//       uganka: "Koliko dreves je ob poti?",
//       odgovor: {
//         odgovor: "42",
//         tip_odgovora: "numerični",
//       },
//       dodatna_vprasanja: [
//         {
//           vprasanje: "Kakšne barve so listi na drevesih?",
//           odgovori: ["zelena", "rumena", "rdeča"],
//         },
//       ],
//     },
//     {
//       ime: "Druga točka",
//       lokacija: {
//         lat: 46.3622,
//         lng: 14.0999,
//       },
//       uganka: "Katera ptica najpogosteje poje v tem delu gozda?",
//       odgovor: {
//         odgovor: "ščinkavec",
//         tip_odgovora: "tekstovni",
//       },
//       dodatna_vprasanja: [
//         {
//           vprasanje: "Kateri letni čas je najboljši za opazovanje ptic?",
//           odgovori: ["pomlad", "poletje", "jesen", "zima"],
//         },
//       ],
//     },
//   ],
// };
