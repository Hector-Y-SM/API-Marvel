'use strict';
//!Botones para desplegar las funciones 
const btnPersonaje = document.querySelector('.btnPersonaje');
const btnComic = document.querySelector('.btnComic');
const btnSerie = document.querySelector('.btnSerie');
const btnLimpiar = document.querySelector('.btnLimpiar');

//!Input desde que se realizan las busquedas y se obtienen los valores de ellas
const buscador = document.querySelector('.main_buscador_input');

//!Contenedor Principal y alternativo para guardar los div (varios e individuales)
const containerAllHeroe = document.querySelector('.main_heroes');
const containerAllComic = document.querySelector('.main_heroes_comic');
const containerAllSerie = document.querySelector('.main_heroes_serie');

import { heroe, heroeComic, heroeSerie } from "../fetch.js";
//?Funciomes para poder realizar la busqueda de cada boton
//!HEROE
async function searchHeroe(personaje){
    return await heroe(personaje.toLowerCase());
}
//// const superHeroe = await searchHeroe('Abyss');
//// console.log(superHeroe);
async function getHero(){
    const hero = await searchHeroe(buscador.value);
    if(hero.data.results == 0){alert('Este heroe no se encuentra dentro de los limites de datos que nos ofrece la api, o el nombre se ingreso de forma incorrecta.')}
    else{
    console.log(hero);
    deleteAllChilds();

    hero.data.results.forEach( heroe => {
        //?Contenedores para guardar los datos, foto y juntarlo en uno solo
        const containerHero = document.createElement('div')
        containerHero.className = 'containerHero';
        const containerHero_img = document.createElement('div');
        containerHero_img.className = 'containerHero_img';
        const containerHero_inf = document.createElement('div');
        containerHero_inf.className = 'containerHero_inf';

        //!Saca los datos del objeto
        const {description, thumbnail} = heroe
        
        //? Informacion 
        const name = document.createElement('h1');
        name.textContent = heroe.name;
        const descripcion = document.createElement('h3');

        //*Operador Ternario, parecido a un "if"
        description == ''|| description == null? descripcion.textContent = 'Descripcion no disponible' : descripcion.textContent = description

        //?Variables para obtener la foto del heroe
        let foto = thumbnail.path;
        let ext = thumbnail.extension;

        const imgHeroeName = document.createElement('img');
        imgHeroeName.src = `${foto}.${ext}`;
        imgHeroeName.alt = name;

        const txtComic = document.createElement('h4');
        txtComic.textContent = 'Comics en los que aparece:'
        //? "ulC" lista de comics.
        const ulC = document.createElement('ul');
        for(let i=0; i < heroe.comics.items.length; i++){
            const li = document.createElement('li');
            li.textContent = heroe.comics.items[i].name;
            ulC.append(li);
        }

        containerHero_img.append(imgHeroeName);
        containerHero_inf.append(name);
        containerHero_inf.append(descripcion);
        containerHero_inf.append(txtComic);
        containerHero_inf.append(ulC);
        containerHero.append(containerHero_img);  
        containerHero.append(containerHero_inf);
        containerAllHeroe.appendChild(containerHero);
    })
}}
btnPersonaje.onclick = getHero;

//!COMIC
async function searchComic(titulo){
    return await heroeComic(titulo.toLowerCase());
}

async function getComic(){
    const comic = await searchComic(buscador.value);
    if(comic.data.results == 0){alert(`Los comics de: ${buscador.value} no se encuentran dentro del limite de datos que ofrece la api, o el nombre se ingreso de forma incorrecta.`)}
    else{
    console.log(comic);
    deleteAllChilds();

    comic.data.results.forEach(comics =>{
        //?Contenedores para guardar los datos, foto y juntarlo en uno solo
        const containerComic = document.createElement('div');
        containerComic.className = 'containerComic';
        const containerComic_img = document.createElement('div');
        containerComic_img.className = 'containerComic_img';
        const containerComic_inf = document.createElement('div');
        containerComic_inf.className = 'containerComic_inf'

        const name = document.createElement('h1');
        name.textContent = comics.title;
        const descripcion = document.createElement('h4');
        //*Operador Ternario, parecido a un "if"
        comics.description == '' || comics.description == null? descripcion.textContent = 'Sin sinopsis': descripcion.textContent = comics.description;
        const paginas = document.createElement('p');
        paginas.textContent = `Numero de paginas: ${comics.pageCount}`;
        const precio = document.createElement('p');
        precio.textContent = `Precio: $${comics.prices[0].price} dlls`

        const imgComic = document.createElement('img');
        let foto = comics.thumbnail.path;
        let ext = comics.thumbnail.extension;

        imgComic.src = `${foto}.${ext}`;
        imgComic.alt = name;

        const txtPuesto = document.createElement('p');
        txtPuesto.textContent = 'Hecho por:'
        const ul = document.createElement('ul');
        //*Ciclo for para recorrer los datos de los creadores, extraerlos y ponerlos en la lista
        for(let i=0; i < comics.creators.items.length; i++){
            const li = document.createElement('li');
            li.textContent = `${comics.creators.items[i].name}---Role: ${comics.creators.items[i].role}`;
            ul.append(li);
        }

        containerComic_img.append(imgComic);
        containerComic_inf.append(name);
        containerComic_inf.append(descripcion);
        containerComic_inf.append(txtPuesto);
        containerComic_inf.append(ul);
        containerComic_inf.append(paginas);
        containerComic_inf.append(precio);
        containerComic.append(containerComic_img);//*Acomodar los datos de una forma en la que la foto se ponga arriba de la informacion
        containerComic.append(containerComic_inf);
        containerAllComic.appendChild(containerComic);
    })
}}
btnComic.onclick = getComic;
//!SERIE
async function searchSerie(titulo){
    return await heroeSerie(titulo.toLowerCase());
}

async function getSerie(){
    const serie = await searchSerie(buscador.value);
    if(serie.data.results == 0){alert(`Las series de: ${buscador.value} no se encuentran dentro del limite de datos que ofrece la api, o el nombre se ingreso de forma incorrecta.`)}
    else{
    console.log(serie);
    deleteAllChilds();

    serie.data.results.forEach(se =>{
        const containerSerie = document.createElement('div');
        containerSerie.className = 'containerSerie';
        const containerSerie_img = document.createElement('div');
        containerSerie_img.className = 'containerSerie_img';
        const containerSerie_inf = document.createElement('div');
        containerSerie_inf.className = 'containerSerie_inf';

        const name = document.createElement('h1');
        name.textContent = se.title;
        const descripcion = document.createElement('h3');
        se.description == '' || se.description == null? descripcion.textContent = 'Sin sinopsis': descripcion.textContent = se.description;

        //?Variables para obtener la foto del heroe
        let foto = se.thumbnail.path;
        let ext = se.thumbnail.extension;

        const imgSerie = document.createElement('img');
        imgSerie.src = `${foto}.${ext}`;
        imgSerie.alt = name;

        const txtCredores = document.createElement('h4');
        txtCredores.textContent = 'Hecho por:'
        const ul = document.createElement('ul');
        for(let i=0; i < se.creators.items.length; i++){
            const li = document.createElement('li');
            li.textContent = `${se.creators.items[i].name}----Role: ${se.creators.items[i].role}`;
            ul.append(li);
        }        

        containerSerie_img.append(imgSerie);
        containerSerie_inf.append(name);
        containerSerie_inf.append(descripcion);
        containerSerie_inf.append(txtCredores);
        containerSerie_inf.append(ul);
        containerSerie.append(containerSerie_img);
        containerSerie.append(containerSerie_inf);
        containerAllSerie.appendChild(containerSerie);
    })
}}
btnSerie.onclick = getSerie;

function deleteAllChilds(){
    //?Funcion para Evitar que se queden los hijos cada vez que se hace una nueva busqueda
    while(containerAllHeroe.firstChild){ containerAllHeroe.removeChild(containerAllHeroe.firstChild) }

    while(containerAllComic.firstChild){ containerAllComic.removeChild(containerAllComic.firstChild) }

    while(containerAllSerie.firstChild){ containerAllSerie.removeChild(containerAllSerie.firstChild) }
}

function clear(){
    deleteAllChilds();
    console.clear()
    buscador.value = '';
}
btnLimpiar.onclick = clear;