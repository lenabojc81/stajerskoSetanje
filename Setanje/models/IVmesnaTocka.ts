import ILokacija from "./ILokacija";

interface IVmesnaTocka {
    ime: string;
    lokacija: ILokacija;
    uganka: string;
    //odgovori: { 
    //     odgovor: string; 
    //     lokacija: ILokacija; 
    // }[];
    //zaporedje: string;
    //dodatna_vprasanja: { vprasanje: string; odgovori: string[]};
}

export default IVmesnaTocka;

interface IVmesnaTocka_razsiritev {
    ime: string;
    lokacija: ILokacija;
    uganka: string;
    odgovor: { 
        odgovor: string; 
        tip_odgovor: string; 
    };
    dodatna_vprasanja: { vprasanje: string; odgovori: string[]};
}