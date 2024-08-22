import { baseUrl } from "../../global";
import IUporabnikPot from "../../models/IUporabnikPot";

interface IPreveriUporabnikPot {
    idUporabnik: string;
    idPot: string;
    setUporabnikPot: (uporabnikPot: IUporabnikPot) => void;
}

const posiljanjePodatkovUporabnikPot = async (uporabnikPot: IUporabnikPot) => {
    try {
        const response = await fetch(`${baseUrl}/api/userPath/dodajUporabnikPot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(uporabnikPot),
        });
        if (response.ok) {
            console.log('Podatki uspešno poslani');
        };
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pošiljanju podatkov');
    };
};

const preveriUporabnikPot = async ({ idUporabnik, idPot, setUporabnikPot }: IPreveriUporabnikPot) => {
    try {
        const response = await fetch(`${baseUrl}/api/userPath/${idUporabnik}/${idPot}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        //console.log(data);
        setUporabnikPot(data);
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pridobivanju podatkov');
    };
};

export {posiljanjePodatkovUporabnikPot, preveriUporabnikPot};