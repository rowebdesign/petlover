
console.log("start");
let API_KEY='live_OpCCk2ripJyb3YLXsdtpkGMP7BB1oWf5cdN1CX9a8m3Xyw28IojOCYveSPKVZUA4';
let output="";
let dogsContainer=document.querySelector('#dogs');


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", {API_KEY});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


const fetchDogs= async () =>{
    //esto funciona bien, pero la forma más moderna es usar async/await para tener más control 
    // fetch("https://api.thedogapi.com/v1/breeds", requestOptions)
    //     .then(data => data.json())
    //     .then(dogs => console.log(dogs))
    //     .catch(error => console.log('error', error));
    const response= await fetch("https://api.thedogapi.com/v1/breeds", requestOptions);
    const responseJson= await response.json();
    console.log(response); //devuelve la respuesta de la promesa
    console.log(responseJson); //devuelve la data en formato json
    showAlldogs(responseJson);
}

const showAlldogs = (dogs) => {
    console.log("desde la funcion show", dogs)
    dogs.forEach(dog =>{
        let photo=dog["image"].url;
        let breed=dog["name"];
        let lifeSpan=dog["life_span"];
        let height=dog["height"].metric;
        let weight=dog["weight"].metric;
        let description=dog["temperament"];
        console.log(dog) 
        output+=`
                            <div class="dog">
                                <img class="dog__photo" src="${photo}" alt="">
                                <div class="dog__info">
                                    <p class="name">${breed}</p>
                                    <div class="info__description">
                                        <p class="info__p">Lifespan</p>
                                        <p class="lifespan">${lifeSpan}</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Temperament</p>
                                        <p class="temperament">${description}</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Height</p>
                                        <p class="height">${height} cm</p>
                                    </div>
                                    <div class="info__description">
                                        <p class="info__p">Weight</p>
                                        <p class="weight">${weight} kg</p>
                                    </div>
                                </div>
                            </div>
                            `
                            dogsContainer.innerHTML=output;
    });
}


document.addEventListener('DOMContentLoaded', async() => {
    await fetchDogs();
})

// let btnAllDogs=document.getElementById('showDogs');
// btnAllDogs.addEventListener("click",async () =>{
//     await fetchDogs();
// });
