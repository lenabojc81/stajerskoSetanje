import mongoose, {Schema, Document} from "mongoose";

interface IUporabnikPot extends Document {
    idPot: string;
    idUporabnik: string;
    pot_naziv: string;
    uporabnik_naziv: string;
    celotna_distanca: number;
    celotni_cas: number;
    koncana: boolean;
    prisilno_koncana: boolean;
    admin: boolean;
    skupne_tocke: number;
    vmesne_tocke: IUPVmesnaTocka[];
};

interface IUPVmesnaTocka extends Document {
    najkrajsa_distanca: number;
    cas: number;
    distanca: number;
    st_spremenjenih_odgovorov: number;
    dodatna_vprasanja: IUPDodatnoVprasanje[];
};

interface IUPDodatnoVprasanje extends Document {
    vprasanje: {
        vprasanje: string;
        pravilen_odgovor: string;
    },
    izbran_odgovor: string;
};

const UporabnikPotDodatnoVprasanjeSchema: Schema = new Schema({
    vprasanje: {
        vprasanje: {type: String, required: true},
        pravilen_odgovor: {type: String, required: true},
    },
    izbran_odgovor: {type: String, required: true},
});

const UporabnikPotVmesnaTockaSchema: Schema = new Schema({
    najkrajsa_distanca: {type: Number, required: true},
    cas: {type: Number, required: true},
    distanca: {type: Number, required: true},
    st_spremenjenih_odgovorov: {type: Number, required: true},
    dodatna_vprasanja: {type: [UporabnikPotDodatnoVprasanjeSchema], required: true},
});

const UporabnikPotSchema: Schema = new Schema({
    idPot: {type: String, required: true},
    idUporabnik: {type: String, required: true},
    pot_naziv: {type: String, required: true},
    uporabnik_naziv: {type: String, required: true},
    celotna_distanca: {type: Number, required: true},
    celotni_cas: {type: Number, required: true},
    koncana: {type: Boolean, required: true},
    prisilno_koncana: {type: Boolean, required: true},
    admin: {type: Boolean, required: true},
    skupne_tocke: {type: Number, required: true},
    vmesne_tocke: {type: [UporabnikPotVmesnaTockaSchema], required: true},
});

export default mongoose.model<IUporabnikPot>("UporabnikPot", UporabnikPotSchema);