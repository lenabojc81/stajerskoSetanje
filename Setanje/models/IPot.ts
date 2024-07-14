import IVmesnaTocka from "./IVmesnaTocka";

interface IPot {
    _id: string;
    ime: string;
    tezavnost: string;
    dolzina: string;
    opis: string;
    Tocke: string;
    //zacetna_lokacija: { lat: string; lng: string };
    vmesne_tocke: IVmesnaTocka[];
}

export default IPot;

interface IPot_razsiritev {
    _id: string;
    ime: string;
    tezavnost: string;
    dolzina: string;
    opis: string;
    Tocke: string;
    zacetna_lokacija: { lat: string; lng: string };
    vmesne_tocke: IVmesnaTocka[];
}