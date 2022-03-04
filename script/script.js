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
        exibirInputs();
    });

}

function exibirInputs() {
    const elemento = document.querySelector("header")
    elemento.classList.remove("escondido")
}

function buscarDados() {
    const lat = document.querySelector("input.latitude").value;
    const lon = document.querySelector("input.longitude").value;
    if(lat !== "" && lon !== "") {
        LATITUDE = lat;
        LONGITUDE = lon;
        adicionarValorAPI();
    } else {
        alert("Dados não podem ser vazios!");
    }
}

function pegarDados(response) {
    console.log(response.data);
    let nomeCidade = response.data.name;
    let temperaturaAtual = response.data.main.temp.toFixed(0);
    let temperaturaMaxima = response.data.main.temp_max.toFixed(0); 
    let temperaturaMinima = response.data.main.temp_min.toFixed(0); 
    let sensacaoTermica = response.data.main.feels_like.toFixed(0);  
    exibirNaTela(nomeCidade, temperaturaAtual, temperaturaMaxima, temperaturaMinima, sensacaoTermica);
}

function exibirNaTela(nomeCidade, temperaturaAtual, temperaturaMaxima, temperaturaMinima, sensacaoTermica) {
    document.querySelector(".quadro .lugar").innerHTML = nomeCidade;
    document.querySelector(".quadro .temperatura").innerHTML = `${temperaturaAtual}ºC`;
    document.querySelector(".info-adicionais .temp-max").innerHTML = `Temperatura Máxima ${temperaturaMaxima}ºC`
    document.querySelector(".info-adicionais .temp-min").innerHTML = `Temperatura Mínima ${temperaturaMinima}ºC`
    document.querySelector(".info-adicionais .sensacao").innerHTML = `Sensação Térmica ${sensacaoTermica}ºC`
}   

getLocation();

