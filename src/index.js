import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';



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
  refs.error.classList.add('invisible')

fetchBreeds()
  .then(data => {
    allBreeds = data;
    const markup = data
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
      refs.select.insertAdjacentHTML('beforeend', markup);
      new SlimSelect({
  select: '#texas'
})
  })
    .catch(err => {
        refs.error.classList.remove('invisible')
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    console.log(err);
    })
    .finally(() => {
    setTimeout(() => {
      refs.select.classList.toggle('invisible')
      refs.catInfo.classList.toggle('invisible')
      refs.loader.classList.toggle('invisible')         
      }, 10000)
  });
}
loadCAtImg();


refs.select.addEventListener('change', onChangeSelect);
function onChangeSelect(event) {
    // loadCAtImg();
    // console.log(allBreeds);
  const selectValue = event.target.value;
    const breedInfo = allBreeds.find(breed => breed.id === selectValue);
    // loadCAtImg();
  console.log(breedInfo);
  fetchCatByBreed(selectValue).then(([breedImg]) => {
    console.log(breedImg);
    const catInfoMarkup = `
        <img src="${breedImg.url}" alt="${breedInfo.name}" width="300"/>
        <h2>${breedInfo.name}</h2>
        <p>${breedInfo.description}</p>
        <p><b>Temperament:</b>${breedInfo.temperament}</p>`;
    refs.catInfo.innerHTML = catInfoMarkup;
  })
}







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



