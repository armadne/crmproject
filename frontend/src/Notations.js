import { useState } from 'react'; // Importation de useState pour gérer l'état des votes
import { Card, CardContent } from "@/components/ui/card"; // Importation des composants pour afficher un cadre (carte)
import { Button } from "@/components/ui/button"; // importation du bouton pour voter
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "reacharts" // Importation des composants pour afficher un graphique à barre

//Création d'un tableau contenant les options de vote
const options = ["Option A", "Option B", "Option C"];

export default function NotationSystem()  {
    // Déclaration de l'état qui contient le nombre de vote pour chaque option
    // Chaque option commence avec 0 (en terme de notation)
    const [notation, setNotation] = useState(options.map(option => ({ name: option, notation: 0})))

    const handleNotation = (option) => {
        setNotation(notation.map(n => n.name === option ? {...n, notations: n.notation + 1} : n ));
    }



    return(
        // Conteneur principal avec un style centré et un peu d'espace
        <div className="flex flex-col items-center p-4 space-y-6">
            {/* Titre de l'application */}
            <h1 className='text-2xl font-bold'>Système de Note</h1>
    
            {/* Liste des boutons pour voter */}
            <div className='flex space-x-4'>
                {options.map(option => (
                    <Button key={option} onClick={() => handleNotation(option)}>{option}</Button>
                ))}
    
            </div>
    
            {/* Affichagte des résultats */}
    
            <Card className="w-full max-w-md p-4">
                <CardContent>
                    <h2 className='text-xl font-semibold mb-4'>Résultats</h2>
    
                    {/* Conteneur pour afficher le graphique des notations */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={notation}> {/* Création du graphique à barres avec les notations */}
                            <XAxis dateKey="name" /> {/* Axe horizontal avec les noms des options */}
                            <YAxis allowDecimals={false} /> {/* Axe vertical pour le nombre de notation */}
                            <Tooltip /> {/* Affichage d'un petit texte au survol des barres */}
                            <Bar dateKey="votes" fill="#4A90E2" /> {/* Les barres représentant ls notations */}
                        </BarChart>
                    </ResponsiveContainer>
                    
                </CardContent>
            </Card>
    
    
        </div>
    );
};

