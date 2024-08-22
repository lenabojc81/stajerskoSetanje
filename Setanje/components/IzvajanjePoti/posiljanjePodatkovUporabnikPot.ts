import { set } from "react-hook-form";
import { baseUrl } from "../../global";
import IUporabnikPot from "../../models/IUporabnikPot";

interface IPreveriUporabnikPot {
    idUporabnik: string;
    idPot: string;
    setUporabnikPot: (uporabnikPot: IUporabnikPot | null) => void;
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
        console.log(data);
        if (data.length === 0) {
            setUporabnikPot(null);
        } else {
            setUporabnikPot(data);
        }
        
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pridobivanju podatkov');
    };
};

export {posiljanjePodatkovUporabnikPot, preveriUporabnikPot};