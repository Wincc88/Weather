

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
    { date: '2026-06-10', day: 'Wednesday', weather: 'sushine', status: 'bright', degrees: '24°C|°F' }

] 

 const showTodayInfo = document.querySelector('.current_dayweather');


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
                    return "Today";
                }
                else if (dateString === yesterdaysDateString) {
                        console.log("Yesterday");
                    return "Yesterday";
                }
                
              


            //console.log(dayName);   
                return dayName;

            };
                
            nameTodayAndYesterday();

         
        
        const matchingApiData = apiMap.get(dateString);

        console.log(matchingApiData.weather);
        console.log(matchingApiData.status);
        console.log(matchingApiData.degrees);
        console.log(matchingApiData.date);
        console.log(matchingApiData.day)

        dates.push(matchingApiData);
        console.log(matchingApiData);

        }

             //console.log(dates);
        return dates;



 }
 console.log(getDateRangeApiData(fetchedApiData)); 


 function celciusFromFahr (fahrenheit) {

        /* (number)  -> number
           celciusFromFahr (32) returns 0 celc  ; celciusFromFah (212) returns 100 celc

           change formula if celcius to Fahr (celcius * 9/5) + 32;
       */
    const answer = (fahrenheit - 32) * (5/9);
      //console.log(answer);
    return answer;

 }
 console.log(celciusFromFahr(32));




