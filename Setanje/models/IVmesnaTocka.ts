import IDodatnoVprasanje from "./IDodatnoVprasanje";
import ILokacija from "./ILokacija";
import IOdgovor from "./IOdgovor";

// interface IVmesnaTocka {
//     ime: string;
//     lokacija: ILokacija;
//     uganka: string;
//     //odgovori: { 
//     //     odgovor: string; 
//     //     lokacija: ILokacija; 
//     // }[];
//     //zaporedje: string;
//     //dodatna_vprasanja: { vprasanje: string; odgovori: string[]};
// }

// export default IVmesnaTocka;

interface IVmesnaTocka {
    ime: string;
    lokacija: ILokacija;
    uganka: string;
    odgovor: IOdgovor;
    dodatna_vprasanja: IDodatnoVprasanje[];
}

export default IVmesnaTocka;