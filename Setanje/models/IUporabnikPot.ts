import IUPVmesnaTocka from "./IUPVmesnaTocka";

interface IUporabnikPot {
    _id?: string;
    idUporabnik: string;
    idPot: string;
    pot_naziv: string;
    uporabnik_naziv: string;
    koncana: boolean;
    prisilno_koncana: boolean;
    admin: boolean;
    celotna_distanca: number;    //m
    celotni_cas: number;         //s
    skupne_tocke: number;
    vmesne_tocke: IUPVmesnaTocka[];
};

export default IUporabnikPot;