import ILokacija from "./ILokacija";
import IVmesnaTocka from "./IVmesnaTocka";

// interface IPot {
//     _id?: string;
//     ime: string;
//     tezavnost: string;
//     dolzina: string;
//     opis: string;
//     tocke: string;
//     //zacetna_lokacija: { lat: string; lng: string };
//     vmesne_tocke: IVmesnaTocka[];
// }

// export default IPot;

interface IPot {
    _id: string;
    ime: string;
    tezavnost: number;
    dolzina: number;
    opis: string;
    tocke: number;
    zacetna_lokacija: ILokacija;
    vmesne_tocke: IVmesnaTocka[];
}

export default IPot;