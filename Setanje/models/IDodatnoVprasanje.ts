interface IDodatnoVprasanje {
    vprasanje: string;
    odgovori: {
        odgovor: string;
        pravilen: boolean;
    }[];
};

export default IDodatnoVprasanje;