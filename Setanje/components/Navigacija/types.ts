import IPot from "../../models/IPot";

export type RootStackParamList = {
    BottomNav: undefined;
    Home: undefined;
    Poti: undefined;
    Pot: { pot: IPot };
    ZacetnaLokacija: { pot: IPot };
    DodajanjePotiII: undefined;
    IzvajanjePoti: { pot: IPot };
   // UrediPot: { pot: IPot };
   UrejanjePotiII: { pot: IPot };
   ProfilUporabnika: undefined;
};
