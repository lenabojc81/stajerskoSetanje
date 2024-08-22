import IPot from "../../models/IPot";
import IUporabnikPot from "../../models/IUporabnikPot";

export type RootStackParamList = {
    BottomNav: undefined;
    Home: undefined;
    Poti: undefined;
    Pot: { pot: IPot };
    UporabnikPoti: undefined;
    Statistika: { game: IUporabnikPot };
    ZacetnaLokacija: { pot: IPot };
    DodajanjePotiII: undefined;
    IzvajanjePoti: { pot: IPot };
   // UrediPot: { pot: IPot };
   UrejanjePotiII: { pot: IPot };
   ProfilUporabnika: undefined;
   
};
