import { useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const FavoriteCity = () => {
    const storedFavorites = localStorage.getItem("favoriteCities");
    const [favoriteCities, setFavoriteCities] = useState(storedFavorites ? JSON.parse(storedFavorites) : []);

    const removeFavorite = (cityName) => {
        const updatedFavorites = favoriteCities.filter((city) => city.name !== cityName);
        setFavoriteCities(updatedFavorites);
        localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
    };
    console.log("citta salvata :", favoriteCities)

    return (
        <Container className="mt-5 text-center">
            {favoriteCities.length > 0 && (
                <>
                    <h3 className="fw-bold text-light">Città Preferite</h3>
                    <Row className="justify-content-center">
                    {favoriteCities.map((city, index) => (
                        <Col key={index} md={12} className="mb-3">
                        <Card className="shadow-sm border-0 p-3 rounded-4">
                            <Card.Body>
                            <h5 className="fw-bold text-dark text-center">{city.name}, {city.country}</h5>
                            <Row className="d-flex align-items-center text-center">
                                <Col xs={4} className="d-flex justify-content-center">
                                    <Image src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} alt="Weather icon" width="50" height="50" />
                                </Col>
                                <Col xs={4} className="fw-semibold fs-4 text-dark">
                                    <p>{city.temperature}°C</p>
                                </Col>
                                <Col xs={4} className="text-muted">
                                    <p>{city.weather}</p>
                                </Col>
                            </Row>
                            <Button variant="danger" onClick={() => removeFavorite(city.name)} className="mt-3 fw-semibold px-4 py-2 rounded-pill">Rimuovi</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                    </>
            )}
        </Container>
    );
};

export default FavoriteCity;
