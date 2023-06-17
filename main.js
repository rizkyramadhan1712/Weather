function GetInfo() {

  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = '';

  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = '';

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric')
  .then(response => response.json())
  .then(data => {
      
    /*const weatherInfo = document.getElementById('weatherInfo');*/
    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p class="date" >${getCurrentDate()}</p>
      <div class="tengah">
      <img class="ikon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />
      <p class="mainTemp" >${data.main.temp.toFixed()}°C</p>
      </div>
      <p class="desc" >${data.weather[0].description}</p>
      <div class="mores">
      <p class="more" >Feels Like: ${data.main.feels_like.toFixed()}°C</p>
      <p class="more" >Humidity: ${data.main.humidity}%</p>
      <p class="more" >Wind: ${data.wind.speed} m/s</p>
      </div>
    `;
  })
  .catch(error => {
    weatherInfo.innerHTML = `<h2>Kota "${newName.value}" Tidak ditemukan</h2>`;
});



fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => response.json())
.then(data => {

  //Getting the min and max values for each day
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed()+ "°";
      //Number(1.3450001).toFixed(2); // 1.35
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed() + "°";
  }
  //------------------------------------------------------------

  //Getting Weather Icons
/*     for(i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.list[i].weather[0].icon
      +".png";
  }
  //------------------------------------------------------------
  console.log(data)*/
  


})

.catch(err => {
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "-";
      
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Max").innerHTML = "-";
  }
})
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return currentDate.toLocaleDateString('en-US', options);
}

function DefaultScreen(){
  document.getElementById("cityInput").defaultValue = "Jakarta";
  GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }


/*test*/
