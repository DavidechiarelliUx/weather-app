import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import FavoriteCity from "./FavoriteCity"

const Home = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState("");

    const apiId = "d0b23baafc87c6c1bec4eacf5d59f402";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedCity !== "") {
            try {
                const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${apiId}`);

                const geoData = await geoResponse.json();

                if (geoData.length > 0) {
                    const { lat, lon, name } = geoData[0];
                    navigate(`/list-city/${name}/${lat}/${lon}`);
                } else {
                    console.log("Nessuna città trovata");
                }
            } catch (error) {
                console.log("Errore nella ricerca della città:", error);
            }
        }
    };

    return (
        <Container className="mt-5 text-center">
            <h2 className="fw-bold text-light">Trova il Meteo della tua Città</h2>
            <Form onSubmit={handleSubmit} className="search-form mx-auto p-4 rounded-4 shadow-sm">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci il nome della città"
                        required
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="rounded-pill border-0 p-3"
                    />
                </Form.Group>
                <Button className="mt-3 px-4 py-2 rounded-pill fw-semibold btn-violet" type="submit">Cerca</Button>
            </Form>
            <FavoriteCity />
        </Container>
    );
};

export default Home;
