# Weather App

This is a weather app that displays the user's local weather data and the forecast for the rest of the week. It uses the OpenWeatherMap API to retrieve weather data.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/weather-app.git
```

2. Install the dependencies by running the following command in the project directory:

```
npm install
```

3. Create a new .env file in the project directory and add your OpenWeatherMap API key to it:

```
REACT_APP_OPENWEATHER_API_KEY=your-api-key-goes-here
```

Replace `your-api-key-goes-here` with your actual API key. If you don't have an API key yet, see the next section for instructions on how to obtain one.

4. Start the development server by running the following command in the project directory:

```
npm start
```

This will start the development server and open the app in your default browser.

## Obtaining an OpenWeatherMap API Key

To use the OpenWeatherMap API, you need to obtain an API key. Here's how to do it:

1. Go to the OpenWeatherMap website and sign up for a free account.

2. Once you've signed up, go to the API Keys page and create a new API key. You should see a long string of characters and numbers that looks something like this: `4f7d473dd50e21c7f3d5993f08e38e49`.

3. Copy the API key and add it to your .env file like this:

```
REACT_APP_OPENWEATHER_API_KEY=your-api-key-goes-here
```

Remember to replace your-api-key-goes-here with the actual API key that you obtained from OpenWeatherMap.

That's it! You should now be able to run the app and retrieve weather data from the OpenWeatherMap API. If you encounter any issues, please refer to the Vite documentation or consult the Troubleshooting section on the OpenWeatherMap website.
