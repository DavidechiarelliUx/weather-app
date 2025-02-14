import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const FiveDayWeather = ({ lat, lon }) => {
    const [forecast, setForecast] = useState(null);

    const apiId = "d0b23baafc87c6c1bec4eacf5d59f402";

    const fetchFiveDayWeather = async () => {
        try {

            console.log(`Caricamento previsioni per lat: ${lat}, lon: ${lon}...`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiId}`);

            if (response.ok) {
                const data = await response.json();
                console.log("Previsioni ricevute:", data);

                let forecastDays = [];

                for (let i = 0; i < data.list.length; i += 8) {
                    forecastDays.push(data.list[i]);
                }
                setForecast(forecastDays);
            }
        } catch (error) {
            console.log("Errore nel recupero delle previsioni:", error);
        }
    };

    useEffect(() => {
        fetchFiveDayWeather();
    }, [lat, lon]);

    return (
        <Container className="mt-4">
            <h3 className="text-light">Previsioni per i prossimi 5 giorni</h3>
            <Row>
                {forecast && forecast.map((day, index) => {
                    let date = new Date(day.dt * 1000);
                    let formattedDate = date.toLocaleDateString("it-IT");
                    return (
                        <Col key={index} md={12} className="mb-3">
                        <Card className="shadow-sm border-0 p-3 rounded-4">
                            <Card.Body>
                                <h5 className="fw-bold text-center text-dark">{formattedDate}</h5>
                                <Row className="d-flex align-items-center text-center">
                                    <Col xs={4} className="d-flex justify-content-center">
                                        <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather icon" width="50" height="50" />
                                    </Col>
                                    <Col xs={4} className="fw-semibold fs-4 text-dark">
                                        <p>{day.main.temp}°C</p>
                                    </Col>
                                    <Col xs={4} className="text-muted">
                                        <p>{day.weather[0].description}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                      </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default FiveDayWeather;
