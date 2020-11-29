
// DOM ELEMENTS
const dogBar = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const btn = document.createElement('button')

// RENDER FUNCTIONS
const renderPup = pupObj => {
  pupObj.forEach(pup => {
    const span = document.createElement('span')
    span.dataset.id = pup.id
    span.textContent = pup.name

    dogBar.append(span)
  })
}

const dogDetails = dog => {
  dogInfoDiv.textContent = ""
  const img = document.createElement('img')
  const h2 = document.createElement('h2')
  
  img.src = dog.image
  h2.textContent = dog.name
  btn.textContent = dog.isGoodDog
  btn.dataset.id = dog.id

  dogInfoDiv.append(img, h2, btn)

  if (dog.isGoodDog) {
    btn.textContent = 'Good Dog!'
  } else {
    btn.textContent = 'Bad Dog!'
  }
}

const renderDogDetails = event => {
  console.log(event.target)
  const id = event.target.dataset.id

  fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(dog => dogDetails(dog))
}

const toggleDogStatus = event => {
  const id = event.target.dataset.id
  console.log(event.target)
  let value;

  if (btn.textContent === 'Good Dog!') {
    btn.textContent = 'Bad Dog!'
    value = false
  } else {
    btn.textContent = 'Good Dog!'
    value = true
  }
  
  const dogObj = {
    isGoodDog: value
  }
  // console.log(dogObj)
  
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dogObj)
  })
}

// EVENT HANDLERS
dogBar.addEventListener('click', renderDogDetails)
btn.addEventListener('click', toggleDogStatus)

// FETCH FUNCTIONS
const initialize = () => {
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pup => renderPup(pup))
}

// INITIALIZE
initialize()