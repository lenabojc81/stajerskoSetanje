import { set } from "react-hook-form";
import { baseUrl } from "../../global";
import IUporabnikPot from "../../models/IUporabnikPot";
import IPot from "../../models/IPot";

interface IPreveriUporabnikPot {
    idUporabnik: string;
    idPot: string;
    setUporabnikPot: (uporabnikPot: IUporabnikPot | null) => void;
}

interface IPreveriUporabnikovePoti {
    idUporabnik: string;
    setUporabnikovePoti: (uporabnikovePoti: IUporabnikPot[]) => void;
}

interface IPridobiPot {
    idPot: string;
    setPot: (pot: IPot) => void;
};

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

const pridobiPot = async ({idPot, setPot}: IPridobiPot) => {
    try {
        const response = await fetch(`${baseUrl}/api/paths/${idPot}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setPot(data);
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pridobivanju podatkov');
    };
};

const pridobiUporabnikoveOpravljenePoti = async ({idUporabnik, setUporabnikovePoti}: IPreveriUporabnikovePoti) => {
    try {
        const response = await fetch(`${baseUrl}/api/userPath/${idUporabnik}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setUporabnikovePoti(data);
    } catch (error) {
        console.error(error);
        console.log('Napaka pri pridobivanju podatkov');
    };
};

export {posiljanjePodatkovUporabnikPot, preveriUporabnikPot, pridobiUporabnikoveOpravljenePoti, pridobiPot};