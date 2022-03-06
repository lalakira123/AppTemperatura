let LATITUDE;
let LONGITUDE;
let idioma = "pt_br"; 
let apiKEY = "032efc511e5faab2711bfd5ad6f38d3b";
let unidade = "metric";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicao) => {
        LATITUDE = posicao.coords.latitude;
        LONGITUDE = posicao.coords.longitude;
        adicionarValorAPI();
    });
  } else {
    alert("O seu navegador não suporta a Geolocalização!");
  }
}

function adicionarValorAPI() {
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${apiKEY}&lang=${idioma}&units=${unidade}`);
    
    promise.then(pegarDados);

    promise.catch((erro) => {
        alert("Não foi possível acessar a temperatura da sua região");
        console.log(erro);
    });
}

function buscarDados() {
    const cidade = document.querySelector("input").value;
    const ENDPOINT_CITY = `http://api.openweathermap.org/geo/1.0/direct?q=`;
    const promise = axios.get(`${ENDPOINT_CITY}${cidade}&appid=${apiKEY}`);

    promise.then(verificarCidade)

    promise.catch((erro) => {
        alert("Não foi possível acessar!");
        console.log(erro);
    })
}

function verificarCidade(response) {
    LATITUDE = response.data[0].lat;
    LONGITUDE = response.data[0].lon;
    adicionarValorAPI();
}

function pegarDados(response) {
    let nomeCidade = response.data.name;
    let temperaturaAtual = response.data.main.temp.toFixed(0);
    let temperaturaMaxima = response.data.main.temp_max.toFixed(0); 
    let temperaturaMinima = response.data.main.temp_min.toFixed(0); 
    let sensacaoTermica = response.data.main.feels_like.toFixed(0);  
    let tempo = response.data.weather[0].main.toLowerCase();
    exibirNaTela(nomeCidade, temperaturaAtual, temperaturaMaxima, temperaturaMinima, sensacaoTermica, tempo);
}

function exibirNaTela(nomeCidade, temperaturaAtual, temperaturaMaxima, temperaturaMinima, sensacaoTermica, tempo) {
    document.querySelector(".quadro .lugar").innerHTML = nomeCidade;
    fundoTempo(tempo);
    document.querySelector(".quadro .temperatura").innerHTML += `${temperaturaAtual}ºC`;
    document.querySelector(".info-adicionais .temp-max").innerHTML = `Temperatura Máxima ${temperaturaMaxima}ºC`
    document.querySelector(".info-adicionais .temp-min").innerHTML = `Temperatura Mínima ${temperaturaMinima}ºC`
    document.querySelector(".info-adicionais .sensacao").innerHTML = `Sensação Térmica ${sensacaoTermica}ºC`
}

function fundoTempo(tempo) {
    if(tempo === "clear") {
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="sunny-outline"></ion-icon>`;
    } else if(tempo === "clouds") {
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="cloud-outline"></ion-icon>`;
    } else if(tempo === "rain") {
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="rainy-outline"></ion-icon>`;
    } else if(tempo === "thunderstorm") {
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="thunderstorm-outline"></ion-icon>`;
    } else if (tempo === "snow"){
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="snow-outline"></ion-icon>`;
    } else {
        document.querySelector(".quadro .temperatura").innerHTML = `<ion-icon name="cloudy-outline"></ion-icon>`;
    }
}

getLocation();

