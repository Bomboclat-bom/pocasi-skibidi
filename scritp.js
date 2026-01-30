const weather = {
    apiKey: "25572e41a479b54b043a0d29aad205d9", // <--- СЮДА КЛЮЧ
    
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=cz&appid=${this.apiKey}`)
            .then(response => {
                if (!response.ok) throw new Error("Město nenalezeno");
                return response.json();
            })
            .then(data => this.displayWeather(data))
            .catch(err => alert(err.message));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity-val").innerText = humidity + "%";
        document.querySelector(".wind-val").innerText = speed + " km/h";
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        
        // Меняем фоновую картинку под город
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name},city')`;
        document.querySelector(".weather").classList.remove("loading");
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search-btn").addEventListener("click", () => weather.search());
document.querySelector(".search-bar").addEventListener("keyup", (e) => {
    if (e.key === "Enter") weather.search();
});
