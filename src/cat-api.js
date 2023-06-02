const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(123);
   return response.json();
  });
}

export function fetchCatByBreed(breedId){
return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
   return response.json();
  });
}



// const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
// const API_KEY = 'live_koRDcCasWzSGMAgXYyXLEbfjJGNt2UYlSgBzZ8EuG9ho3YmRQ5Q44NcaHo6RiV97';

// export const fetchBreeds = cityName => {
// //   const searchParams = new URLSearchParams({
// //     q: cityName,
// //     units: 'metric',
// //     appid: API_KEY,
// //   });

//     return fetch(`${BASE_URL}`)
//     .then(response => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
    
//     })
//         .then(data => {
//         console.log(data);
//     })
//         .catch(err => {
//     console.log(err);
//   });
// };

// fetch('https://api.thecatapi.com/v1/breeds')
//   .then(response => {
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

// export default function fetchPockemon (nameCat){

//     return fetch (`https://api.thecatapi.com/v1/breeds/${nameCat}`).
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
