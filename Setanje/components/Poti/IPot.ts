interface IPot {
    _id: string;
    dolzina: string;
    ime: string;
    opis: string;
    tezavnost: string;
    tocke: string;
    vmesne_tocke: {
      ime: string;
      lokacija: { lat: string; lng: string };
      uganka: string;
    }[];
}

export default IPot;

