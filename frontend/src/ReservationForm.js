import { useState } from "react";
import axios from "axios";

export default function ReservationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/reservations/", {
                first_name: firstName,
                last_name: lastName,
                date,
                time
            }, { withCredentials: true });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de la réservation.");
        }
    };

    return (
        <div>
            <h2>Réserver un créneau</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type="submit">Réserver</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
