import IPot from "../../models/IPot";
import IUporabnikPot from "../../models/IUporabnikPot";

export type RootStackParamList = {
    BottomNav: undefined;
    Home: undefined;
    Poti: undefined;
    Pot: { pot: IPot, isAdmin: boolean };
    UporabnikPoti: undefined;
    Statistika: { game: IUporabnikPot };
    ZacetnaLokacija: { pot: IPot };
    DodajanjePotiII: undefined;
    IzvajanjePoti: { pot: IPot, isAdmin: boolean };
   // UrediPot: { pot: IPot };
   UrejanjePotiII: { pot: IPot };
   ProfilUporabnika: undefined;
   
};
