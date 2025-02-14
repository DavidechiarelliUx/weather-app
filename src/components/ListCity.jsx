import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Card, Button , Image} from "react-bootstrap";
import { useParams } from "react-router-dom";
import FiveDayWeather from "./FiveDayWeather";

const ListCity = () => {
    const { cityName, lat, lon } = useParams();
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiId = "d0b23baafc87c6c1bec4eacf5d59f402";

    const fetchWeather = async () => {
        setIsLoading(true);
        setHasError(false);
        setErrorMessage("");

        try {
            console.log(`Caricamento meteo per ${cityName}...`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiId}`);

            if (response.ok) {
                const data = await response.json();
                console.log("Meteo ricevuto:", data);
                setWeather(data);
            } else {
                if (response.status === 404) {
                    throw new Error("404 - Città non trovata");
                } else {
                    throw new Error("Errore nel recupero del meteo");
                }
            }
        } catch (error) {
            console.log(error);
            setHasError(true);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [lat, lon]);

    const addToFavorites = () => {
        if (weather) {
            const favoriteCity = {
                name: weather.name,
                country: weather.sys.country,
                temperature: weather.main.temp,
                weather: weather.weather[0].description,
                icon: weather.weather[0].icon
            };
            console.log("Favorite :" , favoriteCity);
            let storedFavorites = localStorage.getItem("favoriteCities");
            let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

                favoritesArray.push(favoriteCity);
                localStorage.setItem("favoriteCities", JSON.stringify(favoritesArray));
                console.log("Città aggiunta ai preferiti:", favoriteCity);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    {isLoading && (
                        <Spinner animation="border" role="status" variant="primary" className="d-block mx-auto">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                    {hasError && <Alert variant="danger">{errorMessage ? errorMessage : "Errore generico"}</Alert>}
                    {weather && (
                    <>
                    <Card className="text-center shadow-lg border-0 p-4 rounded-4" style={{ background: "linear-gradient(135deg, #A78BFA, #6D28D9)", color: "white" }}>
                        <Card.Body>
                            <h2 className="fw-bold">{weather.name}, {weather.sys.country}</h2>
                            <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" width="100" height="100" />
                            <p className="fs-5">{weather.main.temp}°C</p>
                            <p className="fs-6">{weather.weather[0].description}</p>
                            <Button variant="light" className="fw-semibold px-4 py-2 rounded-pill mt-3 text-primary" onClick={addToFavorites}>Add to Favorites</Button>
                        </Card.Body>
                    </Card>
                    <FiveDayWeather lat={lat} lon={lon} />
                    </>
                    )}
                </Col>
            </Row>
        </Container>
    );

};

export default ListCity;
