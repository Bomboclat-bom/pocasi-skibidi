const weather = {
    apiKey: "25572e41a479b54b043a0d29aad205d9",

    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=cz&appid=${this.apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    alert("Město nebylo nalezeno. Zkuste to znovu.");
                    throw new Error("Chyba");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch(err => console.log("Chyba při načítání:", err));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity-val").innerText = humidity + "%";
        document.querySelector(".wind-val").innerText = speed + " km/h";
        
        // Změna pozadí podle názvu města
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name},city')`;
        
        document.querySelector(".weather").classList.remove("loading");
    },

    search: function () {
        const query = document.querySelector(".search-bar").value;
        if (query) {
            this.fetchWeather(query);
        }
    }
};

document.querySelector(".search-btn").addEventListener("click", () => weather.search());

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        weather.search();
    }
});
