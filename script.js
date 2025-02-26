const aqiApiUrl = 'https://api.waqi.info/feed/here/?token=91e08e2a5754cfe145397cf01bcb3feae741005b';

const aqiElement = document.getElementById('aqi');
const airDescriptionElement = document.getElementById('air-description');
const reloadButton = document.getElementById('reload-btn');

function fetchAirQuality() {
    fetch(aqiApiUrl)
        .then(response => response.json())
        .then(data => {
            const aqi = data.data.aqi;
            const airDescription = getAirQualityDescription(aqi);

            aqiElement.textContent = `Air Quality Index (AQI): ${aqi}`;
            airDescriptionElement.textContent = `Air Quality Description: ${airDescription}`;
        })
        .catch(error => {
            console.error('Error fetching air quality data:', error);
        });
}

// Helper function to determine the air quality description
function getAirQualityDescription(aqi) {
    if (aqi <= 50) {
        return 'Good';
    } else if (aqi <= 100) {
        return 'Moderate';
    } else if (aqi <= 150) {
        return 'Unhealthy for Sensitive Groups';
    } else if (aqi <= 200) {
        return 'Unhealthy';
    } else if (aqi <= 300) {
        return 'Very Unhealthy';
    } else {
        return 'Hazardous';
    }
}

// Initial data load
fetchAirQuality();

// Reload button functionality
reloadButton.addEventListener('click', fetchAirQuality);
