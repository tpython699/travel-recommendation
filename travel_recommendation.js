const submit_button = document.getElementById('submit');
const reset_button = document.getElementById('reset');
const recommendations = document.getElementById('recommendations');
const search_form = document.querySelector('form');
const search_bar = document.getElementById('search_bar')

function getRecommendations(event) {
    event.preventDefault()

    const search_info = document.getElementById('search_bar').value.toLowerCase().trim();
    const results = [];
    recommendations.innerHTML = ''

    if(!search_info){
        return
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            //city search
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if(city.name.toLowerCase().includes(search_info)){
                        results.push(city)
                    }
                })
            })

            //temple search 
            data.temples.forEach(temple => {
                if(temple.name.toLowerCase().includes(search_info)){
                    results.push(temple)
                }
            })

            //beaches search 
            data.beaches.forEach(beach => {
                if(beach.name.toLowerCase().includes(search_info)){
                    results.push(beach)
                }
            })

            if(results.length > 0) {
                results.forEach(item => {
                    recommendations.innerHTML += `
                    <div class='w-100 rounded-lg mb-4 overflow-hidden'>
                        <img class='w-full h-60' alt=${item.name} src="${item.imageUrl}"/>
                        <div class='w-full bg-white p-2'>
                            <h2 class='font-semibold'>${item.name} </h2>
                            <p class='text-gray-500'>${item.description}</p>
                            <button class='my-2 py-1 px-2 font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-800'>Visit</button>
                        </div>
                    </div>`
                })
            } else {
                recommendations.innerHTML += recommendations.innerHTML=`<h2 class='text-center text-white text-2xl'>No result</h2>`
            }
        })
        .catch(error => console.log(error))

}

function reset (event) {
    event.preventDefault()
    search_bar.value =''
}

search_form.addEventListener('submit', getRecommendations)
submit_button.addEventListener('click', getRecommendations)
reset_button.addEventListener('click', reset)
