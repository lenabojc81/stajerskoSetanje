import IPot from "../Poti/IPot";

export type RootStackParamList = {
    BottomNav: undefined;
    Home: undefined;
    Poti: undefined;
    Pot: { pot: IPot };
    IzvajanjePoti: { pot: IPot };
    UrediPot: { pot: IPot };
};
