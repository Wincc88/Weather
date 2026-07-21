
const formBox = document.querySelector('#searchBox');
const cityInform = document.querySelector('#cityInput');  // have to be separate to get value .value 
const currentDisplay = document.querySelector('.todaysweather h3');
const nameDisplay = document.querySelector('.todaysweather p');
const btnPress = document.querySelector('.pressBtn');
const downgridDisplay = document.querySelector('.downGrid'); // trigger only after api is gotten.
const loadingMessage = document.querySelector('#loadingMessage');
const topGrid = document.querySelector('.gridTop');

 const temperature = document.querySelector('.temperature');


const timeAndDay = document.querySelector('.time_day');

const status = document.querySelector('.status'); 


const iconName = document.querySelector('.temp_icons');
const imgSource = document.querySelector('#showIcon');


const para = document.createElement("p");
para.classList.add("temppara");

let celcshowing = true; 

let cityTemp; 
let fahr;
let addfahr;
let eachDaystemperature;
let eachDayStatus;
let sevenDayDataAvailable = false;
let isDowngridVisible = false;

btnPress.style.display = 'none';  // show only after api is gotten; 
downgridDisplay.style.display = 'none';
topGrid.style.display = 'none';  // show only after api is gotten;



// let cityName;
// console.log(cityName);

async function getweather (cityName) {
    
    try {

        loadingMessage.textContent = 'loading...';
        loadingMessage.style.display = 'block';
        
        // Clear previous data
        temperature.textContent = '';
        timeAndDay.textContent = '';
        status.textContent = '';
        imgSource.src = '';
        sevenDayDataAvailable = false;

        // const cityEntered = 'get from from';  // pass city entered to api city  
        
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=RPCGX83PUDPYPBNTKR8AYWS6B`);
                
        const weatherData = await response.json();
        
        //console.log(weatherData);  


           
        //get temperature fore the city  ---- put in eventlistener func -- it represents fahrenheit
        cityTemp = weatherData.currentConditions.temp;
             // console.log(cityTemp);
              // console.log(typeof(cityTemp));
        fahr = "°F";
        addfahr = cityTemp + fahr;
           
        para.textContent = addfahr;
        temperature.appendChild(para); 
       
          // date from api     
        const currentDate =  weatherData.days[0].datetime;
          // console.log(currentDate);
        timeAndDay.textContent = `Today: ${currentDate}`;
        
        
        currentDisplay.textContent = "Today's Weather";
        nameDisplay.textContent = cityName.charAt(0).toUpperCase() + cityName.slice(1); 

        // get weather status/conditions 
        const cityWeatherStatus = weatherData.currentConditions.conditions;  
        // console.log(cityWeatherStatus);
        status.textContent = cityWeatherStatus;
          
           // for css background and weather details
        const weatherIcon = weatherData.currentConditions.icon;
          // console.log(weatherIcon);
             
        // i want to get iconName.src not text content
        iconName.textContent = weatherIcon;

        const iconPngUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${weatherIcon}.png`;
        imgSource.src = iconPngUrl;
        imgSource.alt = "weather detail";
             //topGrid.style.background = `url(${iconPngUrl}) no-repeat center center`;
        

            // put description in the lower divs 
        const weatherDesc = weatherData.description;
          // console.log(weatherDesc);
            
        topGrid.style.display = 'grid';  // show only after api loads;


        // show weather for the next seven days in the lower div  
        
           const sevenDaysafterToday =  weatherData.days;
           // console.log(sevenDaysafterToday);
           const shortit = sevenDaysafterToday.slice(1, 8);

           eachDaystemperature = [];
           eachDayStatus = [];
           const areaColumns = document.querySelectorAll('.areaColumn');

           // Clear all previous rows
           areaColumns.forEach((col) => {
               const rows = col.querySelectorAll('.areaRow');
               rows.forEach((row) => {
                   row.textContent = '';
                   row.onclick = null;
               });
           });

           // Extract, log and write weather data for each day into the corresponding column rows
           shortit.forEach((day, index) => {

               const dayTimeAndDay = day.datetime;
               const dayStatus = day.conditions;
               const dayWeatherIcon = day.icon;
               const dayWeatherDesc = day.description;
               const dayTemperature = day.temp;
               eachDaystemperature[index] = dayTemperature;
               eachDayStatus[index] = dayStatus;

               if (index === 0) {
                 // console.log('Tomorrow:');
               } else {
                  // console.log(`Day ${index + 1}:`);
               }
                   /*
                        console.log('timeAndDay:', dayTimeAndDay);
                        console.log('status:', dayStatus);
                        console.log('weatherIcon:', dayWeatherIcon);
                        console.log('weatherDesc:', dayWeatherDesc);
                        console.log(dayTemperature);
                        console.log('---'); 
                    */
               
               const col = areaColumns[index];
               if (!col) return;

               const rows = col.querySelectorAll('.areaRow');
               if (rows.length < 4) return;

               // row 1: label (tomorrow for first day)
               if (index === 0) {
                   rows[0].textContent = `Tomorrow: ${dayTimeAndDay}`;
               } else {
                   const daysName = new Date(dayTimeAndDay);
                       // must have new date() dayTimeAndDay.toLocaleDateString won't work -- not a function error
                   rows[0].textContent = daysName.toLocaleDateString('en-US', { weekday: 'long' });
               }
               // row 2: status and temperature
               rows[1].textContent = `${dayStatus} ${dayTemperature}${fahr}`;
               rows[1].dataset.celsius = 'false';
               rows[1].onclick = () => {
                   toggleEachDayTemperature(rows[1], dayTemperature, dayStatus);
               };
               // row 3: weather icon
               rows[2].textContent = '';
               const dayIconPngUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${dayWeatherIcon}.png`;
               const dayImg = document.createElement('img');
               dayImg.src = dayIconPngUrl;
               dayImg.alt = dayWeatherIcon;
               dayImg.style.width = '50px';
               dayImg.style.height = '50px';
               rows[2].appendChild(dayImg);
               // row 4: description
               rows[3].textContent = dayWeatherDesc;
           });
           
           sevenDayDataAvailable = true;
           btnPress.style.display = 'block';
            
        loadingMessage.textContent = 'complete';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 2000);

    } catch (error) {
        // console.error('Error fetching weather:', error);
        loadingMessage.textContent = 'Error loading weather';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 2000);

        alert('please enter a valid city name');
    }

};

// trigger getweather() after submit city;  

formBox.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityName = cityInform.value.trim();
    if (!cityName) {
        // console.error('input needs a city');
        return;
    }

    // // console.log(`city entered: ${cityName}`);
    getweather(cityName); 

    formBox.reset();

});




// Button to toggle 7-day forecast display -- moved out of getweather() to prevent events stacking 
btnPress.addEventListener('click', () => {
    if (!sevenDayDataAvailable) {
        return;
    }

    
    //console.log(sevenDayDataAvailable);
    //console.log(!sevenDayDataAvailable);
   // btnPress.style.display = 'block';  // show button only after api is gotten;
   // isDowngridVisible helps avoid redundancy in clicking twice
   

    if (!isDowngridVisible) {
        downgridDisplay.style.display = 'grid';
        isDowngridVisible = true;
    } else {
        downgridDisplay.style.display = 'none';
        isDowngridVisible = false;
    }
});


  // moved outside async so can query any city after another and the celc fuction continue to work.

temperature.addEventListener("click", () => {
    const celc = "°C";
    if (!isNaN(cityTemp)) {
        const converted = celciusFromFahr(cityTemp);
        const showInpara = `${converted.toFixed(2)}${celc}`;

        if (celcshowing) {
            para.textContent = showInpara;
        } else {
            para.textContent = addfahr;
        }
        temperature.appendChild(para);
        celcshowing = !celcshowing;
    }
});

function toggleEachDayTemperature(row, tempValue, statusText) {
    let isCelsius = row.dataset.celsius === 'true';
    if (isCelsius) {
        row.textContent = `${statusText} ${tempValue}${fahr}`;
        row.dataset.celsius = 'false';
    } else {
              // add toFixed here too
        row.textContent = `${statusText} ${celciusFromFahr(tempValue).toFixed(2)}°C`;
        row.dataset.celsius = 'true';
    }
    
}



function celciusFromFahr (fahrenheit) {

        /* (number)  -> number
           celciusFromFahr (32) returns 0 celc  ; celciusFromFah (212) returns 100 celc

           change formula if celcius to Fahr (fahrenheit * 9/5) + 32;    
       */
    const answer = (fahrenheit - 32) * (5/9);      
      //console.log(answer);
    return answer;

}
 // console.log(celciusFromFahr(32));   // 0 celcius
 // console.log(celciusFromFahr(68));   // 20 celcius




    



