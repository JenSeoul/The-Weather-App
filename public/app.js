window.addEventListener('load', () => {
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let timezone = document.querySelector('.location-timezone');
  let tempSection = document.querySelector('.degree');
  let texpression = temperatureDegree.nextElementSibling;
  const sunny = document.querySelector('#sunny');
  const cloudy = document.querySelector('#cloudy');
  const rainny = document.querySelector('#rainy');
  const snow = document.querySelector('#snowy');
  const moist = document.querySelector('#misty');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      const api = `weather/${lat},${long}`;
      const res = await fetch(api);
      const data = await res.json();
      const { description } = data.weather[0];
      const {temp} = data.main;

      temperatureDegree.textContent = (Math.round(temp) / 10 + 9);
      temperatureDescription.innerHTML = `<h2>${description}</h2>`;
      timezone.textContent = data.name;

      // Icon display
      if(description.includes('clear')){sunny.style.display='flex'};
      if(description.includes('snow')){snow.style.display='flex'};
      if(description.includes('cloud') || description.includes('part')){cloudy.style.display='flex'};
      if(description.includes('rain')){rainny.style.display='flex'};
      if(description.includes('moist') || description.includes('haze')){moist.style.display='flex'};

      // Change temprature from harienheight to celsius 
      tempSection.addEventListener('click', ()=>{
        if(texpression.textContent === 'F' ){
          texpression.textContent = 'C';
          let celsius = Math.round((Math.round(temp)/10-32)*5/9)+5;
          temperatureDegree.textContent = celsius;
        }else{
          texpression.textContent = 'F';
          temperatureDegree.textContent = (Math.round(temp) / 10 + 9);
        };
      });
    });
  }else {
    h1.textContent = "Sorry, this is not working on your geolocation spot";
  };
});
