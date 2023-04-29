# Weather App

This Weather App allows users to search for the current weather and forecasts for a specific city. It utilizes the OpenWeatherMap API and Google Maps API to fetch the weather data and provide location suggestions.

## Prerequisites

Before you begin, you will need to obtain API keys for the following services:

1. OpenWeatherMap API: Sign up for a free account at https://home.openweathermap.org/users/sign_up. After signing up, you will receive an API key. You can find your API key by navigating to the API keys section in your account.

2. Google Maps API: To get an API key for Google Maps, follow these steps:

- Go to the Google Cloud Platform Console.
- Create a new project or select an existing one.
- Click on the hamburger menu in the top left corner and navigate to APIs & Services > Dashboard.
- Click on the "+ ENABLE APIS AND SERVICES" button at the top of the page.
- Search for "Maps JavaScript API" and click on it, then click the "Enable" button.
- After enabling the API, navigate to APIs & Services > Credentials.
- Click on the "CREATE CREDENTIALS" button and select "API key". A new API key will be generated.

## Setup

1. Clone this repository:

```
git clone https://github.com/yourusername/weather-app.git
```

2. Install the dependencies:

```
cd weather-app
npm install
```

3. Create a .env file in the root directory of the project and add your API keys:

```
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
VITE_GOOGLEMAPS_API_KEY=your_google_maps_api_key
```

4. Run the app in development mode:

```
npm run dev
```

5. Open http://localhost:3000 to view the app in your browser.

## Features

- Search for a city to get the current weather and forecast
- Autocomplete suggestions using Google Maps API
- Responsive design for mobile and desktop devices

## License

This project is licensed under the MIT License.
