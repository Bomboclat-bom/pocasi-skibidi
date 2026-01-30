let weather = {
    apiKey: "VLOŽTE_ZDE_SVŮJ_API_KLÍČ", // Sem vložte váš klíč z OpenWeatherMap
    
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&lang=cz&appid=" + // lang=cz zajistí český popis počasí
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("Město nenalezeno.");
                throw new Error("Město nenalezeno.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = "Počasí ve městě " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Vlhkost: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vítr: " + speed + " km/h";
        
        document.querySelector(".weather").classList.remove("loading");
    },
    
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Funkce pro tlačítko hledání
document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();
});

// Funkce pro klávesu Enter
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});