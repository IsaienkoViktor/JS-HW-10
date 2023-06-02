import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})

console.log(fetchBreeds);

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),

};

let allBreeds = null;
function loadCAtImg(){
  refs.select.classList.toggle('invisible')
  refs.catInfo.classList.toggle('invisible')
  refs.loader.classList.toggle('invisible')
  refs.error.classList.toggle('invisible')

fetchBreeds()
  .then(data => {
    allBreeds = data;
    const markup = data
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
  })
    .catch(err => {
      refs.error.classList.toggle('invisible')
    console.log(err);
    })
    .finally(() => {
    setTimeout(() => {
      refs.select.classList.toggle('invisible')
      refs.catInfo.classList.toggle('invisible')
      refs.loader.classList.toggle('invisible')         
      }, 1500)
  });
}
loadCAtImg();


refs.select.addEventListener('change', onChangeSelect);
function onChangeSelect(event) {
    // loadCAtImg();
    console.log(allBreeds);
  const selectValue = event.target.value;
    const breedInfo = allBreeds.find(breed => breed.id === selectValue);
    loadCAtImg();
  console.log(breedInfo);
  fetchCatByBreed(selectValue).then(([breedImg]) => {
    console.log(breedImg);
    const catInfoMarkup = `
        <img src="${breedImg.url}" alt="${breedInfo.name}" width="300"/>
        <h2>${breedInfo.name}</h2>
        <p>${breedInfo.description}</p>
        <p>Temperament:${breedInfo.temperament}</p>`;
    refs.catInfo.innerHTML = catInfoMarkup;
  })
}

fetchCatByBreed('Aegean').then(data => console.log(data));






// const url = `https://api.thecatapi.com/v1/breeds`;
// const api_key = "live_koRDcCasWzSGMAgXYyXLEbfjJGNt2UYlSgBzZ8EuG9ho3YmRQ5Q44NcaHo6RiV97";
// let storedBreeds = []

//  fetch(url,{headers: {
//       'x-api-key': api_key
//     }})
//  .then((response) => {
//    return response.json();
//  })
// .then((data) => {
//    console.log(data);
// //    filter to only include those with an `image` object
//    data = data.filter(img=> img.image?.url!=null)
//    console.log(data);
//   storedBreeds = data;
   
//    for (let i = 0; i < storedBreeds.length; i += 1) {
//     const breed = storedBreeds[i];
//     let option = document.createElement('option');
     
//     //  skip any breeds that don't have an image
//      if(!breed.image)continue
     
//     //use the current array index
//     option.value = i;
//     option.innerHTML = `${breed.name}`;
//     document.querySelector('.breed-select').appendChild(option);
//     console.log();
//     }
// //    show the first breed by default
// //    showBreedImage(0)
// })
// .catch(function(error) {
//    console.log(error);
// });




// const ref = {
//     select: document.querySelector('.breed-select'),
//     container: document.querySelector('.cat-info')
// }

// const onClickCatList = () => {

// }


// ref.select.addEventListener('change', onClickCatList)


//  fetch('https://api.thecatapi.com/v1/breeds')
//      .then(response => {
//         //  const selectCatList = ref.select
//         //  `<option value='${response.id}'>${response.name}</option>`
//     console.log(response);

//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });



// import getPockemon from "./fetchPockemon.js";

// const refs = {
//   input: document.querySelector('[type="text"]'),
//   button: document.querySelector("button"),
//   container: document.querySelector(".container"),
// };

// refs.button.addEventListener("click", onBtnClick);

// function onBtnClick() {
//   const inputValue = refs.input.value.toLowerCase().trim();
//   getPockemon(inputValue).then((data) => {
//     console.log(data);
//     const markup = `<div><p>${data.name}</p><img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}"></div>`;
//     refs.container.innerHTML = markup;
//   });
// }

// getPockemon("pikachu").then((data) => console.log(data));



// export default function fetchPockemon (namePock){

//     return fetch (`https://pokeapi.co/api/v2/pokemon/${namePock}`).
//     then (response => {
//         if (!response.ok) {
//             throw new Error (response.status);
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.log(error)
//     })
// }
