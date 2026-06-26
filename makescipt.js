
const formBox = document.querySelector('#searchBox');
const cityInform = document.querySelector('#cityInput');  // have to be separate to get value .value 
const btnPress = document.querySelector('.pressBtn');
const downgridDisplay = document.querySelector('.downGrid'); // trigger only after api is gotten.
const loadingMessage = document.querySelector('#loadingMessage');

 const temperature = document.querySelector('.temperature');


const timeAndDay = document.querySelector('.time_day');

const status = document.querySelector('.status'); 


const iconName = document.querySelector('.temp_icons');
const imgSource = document.querySelector('#showIcon');


const para = document.createElement("p");
para.classList.add("Temppara");

let celcshowing = true; 

let cityTemp; 
let fahr;
let addfahr;
let eachDaystemperature;
let eachDayStatus;




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

        // const cityEntered = 'get from from';  // pass city entered to api city  
        
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=RPCGX83PUDPYPBNTKR8AYWS6B`);
                
        const weatherData = await response.json();
        
        console.log(weatherData);  


           
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
        console.log(currentDate);
        timeAndDay.textContent = `Today: ${currentDate}`;
                    
 
        // get weather status/conditions 
        const cityWeatherStatus = weatherData.currentConditions.conditions;  
        console.log(cityWeatherStatus);
        status.textContent = cityWeatherStatus;
          
           // for css background and weather details
        const weatherIcon = weatherData.currentConditions.icon;
        console.log(weatherIcon);
             
        // i want to get iconName.src not text content
        iconName.textContent = weatherIcon;

        const iconPngUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${weatherIcon}.png`;
        imgSource.src = iconPngUrl;

            // put description in the lower divs 
        const weatherDesc = weatherData.description;
        console.log(weatherDesc);
            
        


        // show weather for the next seven days in the lower div  
        
           const sevenDaysafterToday =  weatherData.days;
           console.log(sevenDaysafterToday);
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
                   console.log('Tomorrow:');
               } else {
                   console.log(`Day ${index + 1}:`);
               }
               console.log('timeAndDay:', dayTimeAndDay);
               console.log('status:', dayStatus);
               console.log('weatherIcon:', dayWeatherIcon);
               console.log('weatherDesc:', dayWeatherDesc);
               console.log(dayTemperature);
               console.log('---');

               const col = areaColumns[index];
               if (!col) return;

               const rows = col.querySelectorAll('.areaRow');
               if (rows.length < 4) return;

               // row 1: label (tomorrow for first day)
               if (index === 0) {
                   rows[0].textContent = `Tomorrow: ${dayTimeAndDay}`;
               } else {
                   rows[0].textContent = dayTimeAndDay;
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
            
        loadingMessage.textContent = 'complete';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 2000);

    } catch (error) {
        console.error('Error fetching weather:', error);
        loadingMessage.textContent = 'Error loading weather';
        setTimeout(() => {
            loadingMessage.style.display = 'none';
        }, 2000);
                // pagedisplay.textContent = 'Error fetching weather';
    }

};

// trigger getweather() after submit city;  

formBox.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityName = cityInform.value.trim();
    if (!cityName) {
        console.error('input needs a city');
        return;
    }

    console.log(`city entered: ${cityName}`);
    getweather(cityName); 

    formBox.reset();

});

// Button to toggle 7-day forecast display -- moved out of getweather() to prevent events stacking 
btnPress.addEventListener('click', () => {
    if (downgridDisplay.style.display === "none") {
        downgridDisplay.style.display = "grid";
    } else {
        downgridDisplay.style.display = "none";
    }
});

  // moved outside async so can query any city after another and the celc fuction continue to work.

temperature.addEventListener("click", () => {
    const celc = "°C";
    if (!isNaN(cityTemp)) {
        const converted = celciusFromFahr(cityTemp);
        const showInpara = `${converted}${celc}`;

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
        row.textContent = `${statusText} ${celciusFromFahr(tempValue)}°C`;
        row.dataset.celsius = 'true';
    }
    
}






            // array of objects as gotten from api
 const fetchedApiData = [

    
    { date: '2026-06-26', day: 'Friday', weather: 'rainfall', status: 'heavy rain', degrees:'21°C|°F' },
    { date: '2026-06-27', day: 'Saturday', weather: 'sunshine', status: 'sunny', degrees:'30°C|°F' },
    { date: '2026-06-28', day: 'Sunday', weather: 'snow', status: 'snowing', degrees: '-10°C|°F' },
    { date: '2026-06-29', day: 'Monday', weather: 'wind', status: 'thunder',degrees: '32°C|°F' },
    { date: '2026-06-30', day: 'Tuesday', weather: 'sunshine', status: 'humid', city: "Sydney", degrees: '39°C|°F' },
    { date: '2026-07-01', day: 'Wednesday', weather: 'sunshine', status: 'sunny', city: "Rome", degrees: '28°C|°F' },
    { date: '2026-07-02', day: 'Thursday', weather: 'wind', status: 'thunder',degrees: '0°C|°F' },
    { date: '2026-07-03', day: 'Friday', weather: 'rainfall', status: 'heavy rain', degrees:'21°C|°F' },
    { date: '2026-07-04', day: 'Saturday', weather: 'sunshine', status: 'sunny', degrees:'30°C|°F' },
    { date: '2026-07-05', day: 'Sunday', weather: 'snow', status: 'snowing', degrees: '-10°C|°F' },
    { date: '2026-07-06', day: 'Monday', weather: 'wind', status: 'thunder',degrees: '32°C|°F' },
    { date: '2026-07-07', day: 'Tuesday', weather: 'sunshine', status: 'humid', city: "Sydney", degrees: '39°C|°F' },
    { date: '2026-07-08', day: 'Wednesday', weather: 'sunshine', status: 'sunny', city: "Rome", degrees: '28°C|°F' },
    { date: '2026-07-09', day: 'Thursday', weather: 'wind', status: 'thunder',degrees: '0°C|°F' }
    
] 

 const showTodayInfo = document.querySelector('.gridTop'); 
 //const temperature = document.querySelector('.temperature');
 //const status = document.querySelector('.status');
 //const timeAndDay = document.querySelector('.time_day');
 const celcfahToggle = document.querySelector('.celfahdisplay');


 function getDateRangeApiData(apiData) {
                
        // Convert API array to a Map for O(1) fast lookups
        const apiMap = new Map(apiData.map(item => [item.date, item]));
                //console.log(`here is apiepepepeep : ${apiMap}`);
        const dates = [];
        const days = [];
        const cities = [];
        
            // let matchingApiData; 



        for (let i = 0; i < fetchedApiData.length; i++) {
            
            //len start count from 1 not 0 so i < and not <=  else it will add undefined as last arraynumber;

            const current_date = new Date();

            const tmrwDate = new Date(current_date);
            tmrwDate.setDate(current_date.getDate() + 1);
            
            current_date.setDate(current_date.getDate() + i);
               // console.log('dateCheckhere: ', current_date);

                
            
            const dateString = current_date.toISOString().split('T')[0];
                // console.log(`dateStringHere: ${dateString}`);
            
            const tmrwDateString = tmrwDate.toISOString().split('T')[0];
                // console.log(`tmrwDateStringHere: ${tmrwDateString}`);
            
            const dayName = current_date.toLocaleDateString('en-US', { weekday: 'long' });
                // console.log(`dayNameHere: ${dayName}`);

            function todayAndTmrw() {

                if (dateString === new Date().toISOString().split('T')[0]) {
                    // using dayName === ; gives same Today like Monday this week and Monday last week
                    console.log("Today");
                    return "Today";
                }
                else if (dateString === tmrwDateString) {
                    console.log("Tomorrow");
                    return "Tomorrow";
                }
                

             console.log(dayName);   
                return dayName;

            };
                
            todayAndTmrw();

         
        
        const matchingApiData = apiMap.get(dateString);
        
        /*
        console.log(matchingApiData.city)
        console.log(matchingApiData.weather);
        console.log(matchingApiData.status);
        console.log(matchingApiData.degrees);
        console.log(matchingApiData.date);
        console.log(matchingApiData.day)
        

        const latestWeather = matchingApiData.weather
                
        const previousDate = new Date(current_date);
        previousDate.setDate(current_date.getDate() - 1);
        const previousDateString = previousDate.toISOString().split('T')[0];
        const previousApiData = apiMap.get(previousDateString);
        const previousWeather = previousApiData ? previousApiData.weather : null;
        console.log(`latestWeather: ${latestWeather}, previousWeather: ${previousWeather} (from ${previousDateString})`);
        */
        
           // push each date into dates array which is the return date
        dates.push(matchingApiData);

        // each datestring information
        console.log(matchingApiData);

              //console.log(days.push(matchingApiData)); counts number of days
        
           
          // get city/location key from api and push their values(weather data) into array -- undefrined if no city key
            // same for weather, status
              /*
                const intoArray = matchingApiData.city;
                cities.push(intoArray);
                console.log(cities);
              */
        
           //  using this for latest entry only
         //const latestEntry =  Object.values(fetchedApiData[fetchedApiData.length - 1]);
           // console.log(latestEntry);
        
           // 1st entry
        const latestEntry =  Object.values(fetchedApiData[0]);
            
           //get position of status --- @ pos -3
        // status.textContent = latestEntry[latestEntry.length -3];
         
           // get position of today's date from object --- @ position 0
       // timeAndDay.textContent = `Today: ${latestEntry[0]}`;

           // use same to get position of today's weather
        

        }

             //console.log(dates);
        return dates;


 }
 console.log(getDateRangeApiData(fetchedApiData)); 



 function celciusFromFahr (fahrenheit) {

        /* (number)  -> number
           celciusFromFahr (32) returns 0 celc  ; celciusFromFah (212) returns 100 celc

           change formula if celcius to Fahr (fahrenheit * 9/5) + 32;    
       */
    const answer = (fahrenheit - 32) * (5/9);      
      //console.log(answer);
    return answer;

 }
 console.log(celciusFromFahr(32));   // 0 celcius
 console.log(celciusFromFahr(68));   // 20 celcius



/*
const para = document.createElement("p");
para.classList.add("Temppara");
*/

//const latestObj = Object.values(fetchedApiData[fetchedApiData.length - 1]);  // latest object 
  /*
const latestObj = Object.values(fetchedApiData[0]);
        // console.log(Object.values(fetchedApiData));
        //  para.textContent = latestEntry[latestEntry.length-1];
        //  temperature.appendChild(para);
        
        // console.log(para.textContent.includes("°C"));
    const degreesStr = latestObj[latestObj.length - 1]; // e.g. '24°C|°F'
        //console.log(degreesStr);
    para.textContent = degreesStr;      // intialized
    temperature.appendChild(para);

  //  let celcshowing = true;      // first in celcius from api, initialize 




temperature.addEventListener("click", () => {
  //  if (degreesStr.includes("°C")) {    // includes is redundant as it is the °C|°F string itself.
    if (degreesStr) {
    
        console.log(degreesStr);
        //get and store degreeStr from index 0 to but not including °C
        const idxCtoend = degreesStr.indexOf('°C');   // index number 
           console.log(idxCtoend);

        const storeStr = degreesStr.slice(0, idxCtoend).trim();    // get only number part
          console.log (storeStr);

        const celc = degreesStr.slice(idxCtoend, -3).trim();     // get only °C part
           console.log(celc);
        
        // turn storeStr into number 
        const numSide = parseFloat(storeStr);


    
        // when click c or f change display using celciusFromFar 
         if (!isNaN(numSide)) {
            const converted = celciusFromFahr(numSide);
            const showInpara = `${converted}${celc}` ;


                if (celcshowing) {
                    para.textContent = showInpara;
                        //  console.log(para.textContent);
                    temperature.appendChild(para);
                } 
                else {
                    para.textContent = degreesStr;
                        //  console.log(para.textContent);
                    temperature.appendChild(para);
                }
                celcshowing = !celcshowing;       
        
    }
       
    }
}); */

   /*
let cityName;

    // compare each user input after hitting submit btn
formBox.addEventListener('submit', () => {

    event.preventDefault(); 

    try { 
        cityName = `${cityInform.value}`;
          
       //check to validate to non-empty input 
       if(cityName.length === 0 || cityName === null) {
        console.error('input needs a string');
        return
       }
       const capCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
       console.log(`city entered: ${capCity}`);
         // return (`city entered: ${capCity}`);

    } catch(err) {
        console.error('something went wrong', err);
          // return ('something went wrong', err);
    }

        // clear form to avoid many clicks
    document.querySelector('#searchBox').reset();
});

*/

     // fuction to compare string entered with api city 
function compareStr () {
    try {
        
        if (cityName === "api city data") { 
            console.log ("apiweather for the city and current date");
        }
          console.log ("something not working");
    
    } catch(error) {
        console.error('this is not working');
    }
    
}


