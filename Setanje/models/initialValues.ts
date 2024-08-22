import IUporabnikPot from "./IUporabnikPot";
import IUser from "./IUser";

const initialUser: IUser = {
    __v: 0,
    _id: '',
    email: '',
    password: '',
    username: '',
};

const initialUporabnikPot: IUporabnikPot = {
    idUporabnik: '',
    idPot: '',
    pot_naziv: '',
    uporabnik_naziv: '',
    koncana: false,
    prisilno_koncana: false,
    admin: false,
    celotna_distanca: 0,
    celotni_cas: 0,
    skupne_tocke: 0,
    vmesne_tocke: [],
  };

export { initialUser, initialUporabnikPot };