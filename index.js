const searchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const form = document.querySelector('.flex form')
const searchButton = document.querySelector('#search-btn')
const randomButton = document.querySelector('#random-btn')
const search = document.querySelector('#search')
const resultHeading = document.querySelector('.result-heading')
const mealsEl = document.querySelector('.meals')
const singleMealEl = document.querySelector('.single-meal')

const searchMeal = async(e) => {
  e.preventDefault()
  const searchTerm = search.value
  if(searchTerm.trim()) {
    const response = await fetch(searchUrl+searchTerm)
    const data = await response.json()
  
    // console.log(data.meals)
  
    if(data.meals === null) {
      singleMealEl.innerHTML = ''
      mealsEl.innerHTML = ''
      resultHeading.innerText = `
      Sorry! There are no results.
      Try something else.
      `
    } else {
      singleMealEl.innerHTML = ''
      mealsEl.innerHTML = ''
      resultHeading.innerHTML = ''
      mealsEl.innerHTML =  data.meals.map(meal => 
        `
        <div class='meal'>
          <img src='${meal.strMealThumb}' alt='${meal.strMeal}>
          <div class='meal-info'>${meal.strMeal}</div>
        </div>
        `
      ).join('')
    } 
  }  else {
    alert('Please enter a search term')
  }

  search.value = ''
}

const getRandomMeal = async() => {
  const response = await fetch(randomUrl)
  const data = await response.json()
  // console.log(data.meals[0])
  const meal = data.meals[0]

  let ingredients = []
  for(i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    }
  }
  // console.log(ingredients)
  mealsEl.innerHTML = ''
  resultHeading.innerHTML = ''
  singleMealEl.innerHTML = `
  <div class='single-meal'>
    <h1>${meal.strMeal}</h1> 
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
    <div class='single-meal-info>
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    </div>
    <div class='main'>
      <p>${meal.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
  </div>
  `
}

searchButton.addEventListener('click', searchMeal)
form.addEventListener('submit', searchMeal)
randomButton.addEventListener('click', getRandomMeal)
