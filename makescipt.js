

/*
async function getweather () {
    
    try {
        
        
        // const response = await fetch(`https:// weather app`);
                
        const weatherData = await response.json();
        
        console.log(weatherData);
                


       
            
        toCurrency.addEventListener('change', function() {
            const selectedCurrency = toCurrency.options[toCurrency.selectedIndex].value;
            if (allRates[selectedCurrency]) {
                console.log(`USD to ${selectedCurrency}: ${allRates[selectedCurrency]}`);
                middleResultDisplay.textContent = allRates[selectedCurrency];

            } else {
                console.log(`No rate for ${selectedCurrency} in response`);
                middleResultDisplay.textContent = `No rate for ${selectedCurrency} available  ..yet!`;
            }
            console.log(`Selected currency on change: ${selectedCurrency}`);
        });
                        
                // Set EUR rate on load -- it awaits and takes the result from fetch to select EUR  
                        // another api use eur as base, so need to switch 
                    
                // i dont need special windows onload or DOMContentLoaded event listeners..
                //.. because the script is at the end of the body, so it will run after the DOM is loaded.
        middleResultDisplay.textContent = weatherData.rates.EUR;    //`${weatherData.conversion_rates.EUR}`;
        console.log(`selected on load EUR = ${weatherData.rates.EUR}`)          //(`Selected currency on load: EUR = ${weatherData.conversion_rates.EUR}`); // Log the default selected currency on load
        // ratesDisplays.textContent = weatherData.rates.EUR


    } catch (error) {
        console.error('Error fetching rates:', error);
        middleResultDisplay.textContent = 'Error fetching rates';
    }

}  

getweather();  

*/





 const fetchedApiData = [

    { date: '2026-06-05', day: 'Friday', weather: 'rainfall', status: 'heavy rain', degrees:'21°C|°F' },
    { date: '2026-06-06', day: 'Saturday', weather: 'sunshine', status: 'sunny', degrees:'30°C|°F' },
    { date: '2026-06-07', day: 'Sunday', weather: 'snow', status: 'snowing', degrees: '-10°C|°F' },
    { date: '2026-06-08', day: 'Monday', weather: 'wind', status: 'thunder',degrees: '0°C|°F' },
    { date: '2026-06-09', day: 'Tuesday', weather: 'cloudy', status: 'lightning', degrees: '15°C|°F' },
    { date: '2026-06-10', day: 'Wednesday', weather: 'sushine', status: 'bright', degrees: '24°C|°F' },
    { date: '2026-06-11', day: 'Thursday', weather: 'sushine', status: 'bright', degrees: '24°C|°F' },
    { date: '2026-06-12', day: 'Friday', weather: 'rainfall', status: 'heavy rain', degrees:'21°C|°F' },
    { date: '2026-06-13', day: 'Saturday', weather: 'sunshine', status: 'sunny', degrees:'30°C|°F' },
    { date: '2026-06-14', day: 'Sunday', weather: 'snow', status: 'snowing', degrees: '-10°C|°F' },
    { date: '2026-06-15', day: 'Monday', weather: 'wind', status: 'thunder',degrees: '32°C|°F' }
] 

 const showTodayInfo = document.querySelector('.grid-container'); 
 const temperature = document.querySelector('.temperature');
 const status = document.querySelector('.status');
 const timeAndDay = document.querySelector('.time_day');
 const celcfahToggle = document.querySelector('.celfahdisplay');


 function getDateRangeApiData(apiData) {
                
        // Convert API array to a Map for O(1) fast lookups
        const apiMap = new Map(apiData.map(item => [item.date, item]));
                //console.log(`here is apiepepepeep : ${apiMap}`);
        const dates = [];
        const days = [];
            // let matchingApiData; 



        for (let i = 0; i < fetchedApiData.length; i++) {
            
            //len start count from 1 not 0 so i < and not <=  else it will add undefined as last arraynumber;

            const current_date = new Date();

            const yesterdaysDate = new Date(current_date);
            yesterdaysDate.setDate(current_date.getDate() - 1);
            
            current_date.setDate(current_date.getDate() - i);
               // console.log('dateCheckhere: ', current_date);

                
            
            const dateString = current_date.toISOString().split('T')[0];
                // console.log(`dateStringHere: ${dateString}`);
            
            const yesterdaysDateString = yesterdaysDate.toISOString().split('T')[0];
                // console.log(`yesterdaysDateStringHere: ${yesterdaysDateString}`);
            
            const dayName = current_date.toLocaleDateString('en-US', { weekday: 'long' });
                // console.log(`dayNameHere: ${dayName}`);

            function nameTodayAndYesterday() {

                if (dateString === new Date().toISOString().split('T')[0]) {
                    // using dayName === ; gives same Today like Monday this week and Monday last week
                    console.log("Today");
                    return "Today";
                }
                else if (dateString === yesterdaysDateString) {
                    console.log("Yesterday");
                    return "Yesterday";
                }
                
              


             console.log(dayName);   
                return dayName;

            };
                
            nameTodayAndYesterday();

         
        
        const matchingApiData = apiMap.get(dateString);
        /*
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
        

        dates.push(matchingApiData);
        console.log(matchingApiData);
        
           //  using this for latest entry only
         const myyy =  Object.values(fetchedApiData[fetchedApiData.length - 1]);
       // temperature.textContent = myyy[myyy.length -1];
        
        let myyy2;
        status.textContent = myyy[myyy.length -2];
         
        timeAndDay.textContent = `Today: ${myyy[0]}`;
        

        }

             //console.log(dates);
        return dates;



 }
 console.log(getDateRangeApiData(fetchedApiData)); 



 function celciusFromFahr (fahrenheit) {

        /* (number)  -> number
           celciusFromFahr (32) returns 0 celc  ; celciusFromFah (212) returns 100 celc

           change formula if celcius to Fahr (fahrenheit - 32) * (5/9);
       */
    const answer = (fahrenheit * 9/5) + 32;         
      //console.log(answer);
    return answer;

 }
 console.log(celciusFromFahr(32));
 console.log(celciusFromFahr(20));




    const para = document.createElement("p");
    para.classList.add("Temppara");


    const latestObj = Object.values(fetchedApiData[fetchedApiData.length - 1]);  // latest object 
         // console.log(Object.values(fetchedApiData));
          //  para.textContent = myyy[myyy.length-1];
          //  temperature.appendChild(para);
          
    // console.log(para.textContent.includes("°C"));
      const degreesStr = latestObj[latestObj.length - 1]; // e.g. '24°C|°F'
         //console.log(degreesStr);
      para.textContent = degreesStr;      // intialized
      temperature.appendChild(para);

      let celcshowing = true;      // first in celcius from api, initialize 




temperature.addEventListener("click", () => {
  //  if (degreesStr.includes("°C")) {    // includes is redundant as it is the °C|°F string itself.
    if (degreesStr) {
    
        //get and store degreeStr from index 0 to but not including °C
        const idxCtoend = degreesStr.indexOf('°C');   // index number 
        console.log(idxCtoend);

        const storeStr = degreesStr.slice(0, idxCtoend).trim();    // get only number part
        console.log (storeStr);

        const strToend = degreesStr.slice(-2,).trim();     // use only °F
        console.log(strToend);
        
        // turn storeStr into number 
        const numSide = parseFloat(storeStr);


    
        // when click c or f change display using celciusFromFar 
         if (!isNaN(numSide)) {
            const converted = celciusFromFahr(numSide);
            const showInpara = `${converted}${strToend}` ;


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
});

    



