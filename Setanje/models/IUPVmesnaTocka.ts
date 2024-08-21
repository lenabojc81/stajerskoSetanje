import IUPDodatnoVprasanje from "./IUPDodatnoVprasanje";

interface IUPVmesnaTocka {
    najkrajsa_distanca: number;
    distanca: number;
    cas: number;
    st_spremenjenih_odgovorov: number;
    dodatna_vprasanja: IUPDodatnoVprasanje[];
};

export default IUPVmesnaTocka;