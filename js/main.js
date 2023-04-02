console.log(API_KEY)

const form = document.getElementById('cityForm');
form.addEventListener('submit', handleFormSubmit);
async function handleFormSubmit(event){
    event.preventDefault();
    let cityName = event.target.cityName.value;
    console.log(cityName);

    let cityInfo = await getCityInfo(cityName);
    console.log(cityInfo)

    buildCityCard(cityInfo);
    event.target.cityName.value = '';
};

async function getCityInfo(city){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    };
};

function buildCityCard(cityObj){
    
    let card = document.createElement('div');
    card.className = 'card h-100';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cityTitle = document.createElement('h5');
    cityTitle.innerHTML = `City: ${cityObj.location.name}`;
    cityTitle.className = 'card-title';

    let cityCondition = document.createElement('p');
    cityCondition.innerHTML =  `Condition: ${cityObj.current.condition.text}`;
    cityCondition.className = 'card-text';

    let cityTemp = document.createElement('p');
    cityTemp.innerHTML =  `Current Temp: ${cityObj.current.temp_f}`;
    cityTemp.className = 'card-text';

    let cityFeelsLike = document.createElement('p');
    cityFeelsLike.innerHTML =  `Feels Like: ${cityObj.current.feelslike_f}`;
    cityFeelsLike.className = 'card-text';

    cardBody.append(cityTitle);
    cardBody.append(cityCondition);
    cardBody.append(cityTemp);
    cardBody.append(cityFeelsLike);

    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3 my-3';

    col.append(card);

    let cityDisplay = document.getElementById('cityDisplay');
    cityDisplay.prepend(col);
}