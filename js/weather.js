document.getElementById("search-btn").addEventListener("click", () => {
    const inputfield = document.getElementById("input-field").value;

    // cleara all
    document.getElementById("input-field").value = ""
    document.getElementById("error-div").innerHTML = "";
    if (inputfield.length <= 0) {
        const errorDiv = document.getElementById("error-div");
        errorDiv.innerHTML = `
        <p class="p-3 fs-3 fw-bold text-center bg-warning rounded">Please Write a city name...</p>
        `;
    }
    else {
        createUrl(inputfield)
    }

})
const key = "602fe9112ca84df6286ee145b1491c1a"

//https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=602fe9112ca84df6286ee145b1491c1a
const createUrl = async temp => {
    const urls = `https://api.openweathermap.org/data/2.5/weather?q=${temp}&appid=${key}&units=metric`;
    const res = await fetch(urls)
    const data = await res.json()
    dataLoad(data);
}

const displayWeather = (id, values) => {
    document.getElementById(id).innerText = values;
}

const dataLoad = data => {
    console.log(data);
    if (data.message == "city not found") {
        document.getElementById("error-div").innerHTML = `
        <p class="p-3 fs-3 fw-bold text-center bg-warning rounded">Please Write a correct city name...</p>
        `;
    }
    else {
        displayWeather("city", data.name);
        displayWeather("temperature", data.main.temp);
        displayWeather("tempstatus", data.weather[0].main);
        const url = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        const weatherIcon = document.getElementById("weather-icon");
        weatherIcon.setAttribute("src", url)

    }
}