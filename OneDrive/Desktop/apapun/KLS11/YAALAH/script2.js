document.addEventListener("DOMContentLoaded", function() {  
    let mealTemplate = Handlebars.compile(document.getElementById("mealCard").innerHTML);


    async function fetchMeal() { 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=b`);
        const data = await response.json(); 
        console.log(data);
        mealsArr = []; 
        data.meals.forEach(element => { 
            mealsArr.push( 
                {
                    name : element.strMeal,
                    category : element.strCategory,
                    sprite: element.strMealThumb,
                }
            )
        });
        return {meals : mealsArr};
    }

    function renderMeal(mealList) {
        const container = document.getElementById('content');
        const html = mealTemplate(mealList);
        container.insertAdjacentHTML('beforeend', html);
    }

    async function initialLoad() {
        const mealList = await fetchMeal();
        renderMeal(mealList);
    }

    document.querySelector("button").addEventListener('click', async () => {
        initialLoad();
    })

    //infinite scroll
    window.addEventListener('scroll', async () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            initialLoad();
        }
    });


    initialLoad();
    document.getElementById('yearText').innerHTML = new Date().getFullYear();
});