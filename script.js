'use strict';
// ///////////////////////////////////////
// const obtenirVoisinData = function (data) {
//   const html = `<article class="country">
//       <img class="country__img" src="${data[0].flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data[0].name}</h3>
//         <h4 class="country__region">${data[0].region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data[0].population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data[0].languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data[0].currencies[0].name}</p>
//        </div>
//      </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const obtenirPaysDataETvoisin = function (pays) {
//   //Ajax Call Pays 1
//   let request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${pays}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     // console.log(data);
//     //Voisin Pays 1
//     obtenirVoisinData(data);
//     //obtenir  Voisin Pays Information 2
//     const voisinPays = data[0].borders;
//     if (!voisinPays) return;
//     //Ajax Call Pays 2
//     let request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.eu/rest/v2/alpha/${voisinPays}`
//     );
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       obtenirVoisinData(data2);
//     });
//   });
// };
// obtenirPaysDataETvoisin('portugal');

//////////////////////////////////////////////////////////////////////////////////
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  ///Pays1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found(${response.status})`);
      }
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders[0];
      if (!neighbourCountry) return;
      ///Pays2
      fetch(`https://restcountries.eu/rest/v2/alpha/${neighbourCountry}`)
        .then(res => res.json().then(data => renderCountry(data, 'neighbour')))
        .catch(err => {
          console.log(err);
          renderError(`you seem to be having network problem ${err.message}`);
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        });
    });
};
btn.addEventListener('click', () => {
  getCountryData('portugal');
  getCountryData('italy');
});
//function for getting   the position
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

// const whereAmi = function (lat, lng) {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(
//           `vous avez un probleme avec votre réseaux ${res.status}`
//         );
//       return res.json();
//     })
//     .then(data => {})
//     .catch(err => console.log(err));
// };
// btn.addEventListener('click', whereAmi);

////////////////////////////////////////////////////////////////////////////////////////
//undersatanding how Async JS work, the Event loop and the diffrence between Call Back queue and MicroTasks queue

/*console.log("test Start");
setTimeout(() => {
  console.log("0 sec timer");
}, 0);
Promise.resolve("resolved Promise 1").then((res) => console.log(res));

Promise.resolve("Resolved Promise 2").then((res) => { 
  console.log(res);
});

console.log("test End");*/
