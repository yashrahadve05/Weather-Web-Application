const local = document.querySelector(".location");
const date = document.querySelector(".date");
const maxTemp = document.querySelector(".maxTemp");
const minTemp = document.querySelector('.minTemp');
const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feelsLike span');
const iconLink = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const humidityField = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const displaySunriseTime = document.querySelector('#sunrise');
const displaySunsetTime = document.querySelector('#sunset');

const form = document.querySelector('form')
const inputValue = document.querySelector('.inputField')
const btn = document.querySelector('.button')

// Adding event on form 
form.addEventListener('submit', search = (e) => {
    e.preventDefault()

    target = inputValue.value;
    fetchData(target)
})



let target = "Bhopal";
const fetchData = async (target) => {
    try {
        let apikey = "dd399590823c51af680616076e34db7c";
        const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${target}&appid=${apikey}`;

        const response = await fetch(url);
        var data = await response.json();


        // Destructuring Destructuring

        const {
            name,
            main: {
                temp,
                temp_min,
                temp_max,
                feels_like,
                humidity
            },
            weather: [
                {
                    main,
                    icon
                }
            ],
            wind: {
                speed,
            },
            sys: {
                sunrise,
                sunset
            },
        } = data;

        console.log(data);

        // calling updated DOM Function

        updateData(name, temp, temp_min, temp_max, feels_like, humidity, main, icon, speed, sunrise, sunset)
    } catch (error) {
        alert("You have Field Invalid City")
    }

}

const updateData = (name, temp, temp_min, temp_max, feels_like, humidity, main, icon, speed, sunrise, sunset) => {
    // Date pattern locic
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    local.innerText = name;
    date.innerText = new Date().toLocaleDateString(undefined, options);
    temperature.innerText = temp + ' °C';
    // maxTemp.innerText = temp_max + ' °C';
    // minTemp.innerText = temp_min + ' °C';
    feelsLike.innerText = feels_like + ' °C';
    condition.innerText = main;
    humidityField.innerText = humidity + " %";
    windSpeed.innerText = speed + " Km/h";


    // ++++++++ Time logic ++++++++ //

    const sunriseUnixTimestamp = sunrise * 1000; // Convert to milliseconds
    const sunsetUnixTimestamp = sunset * 1000;

    // Convert to Indian Standard Time (IST)
    const sunriseTime = new Date(sunriseUnixTimestamp);
    const sunsetTime = new Date(sunsetUnixTimestamp);

    const timeOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };

    const sunriseIndianTime = sunriseTime.toLocaleTimeString('en-IN', timeOptions);
    const sunsetIndianTime = sunsetTime.toLocaleTimeString('en-IN', timeOptions);

    console.log(sunriseIndianTime.toUpperCase().replace(" IST", ""));
    console.log(sunsetIndianTime.toUpperCase().replace(" IST", ""));

    // +++ Display Sunrise and Sunset Time 

    displaySunriseTime.innerText = sunriseIndianTime.toUpperCase().replace(" IST", "");
    displaySunsetTime.innerText = sunsetIndianTime.toUpperCase().replace(" IST", "");




    // Fetching Icon
    let emoji = icon
    iconLink.src = `https://openweathermap.org/img/wn/${emoji}@4x.png`;
}



fetchData(target);


