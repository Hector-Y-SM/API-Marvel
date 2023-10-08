'use strict';

export const heroe = async(personaje)=>{
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${personaje}&limit=100&ts=1&apikey=30a4e8e03aa6f9cef12c052e96686d24&hash=f02cfd762990290fc23b4f3c9c9e1474`)
    const data = await response.json();
    return data;
}

export const heroeComic = async(titulo)=>{
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/comics?title=${titulo}&limit=100&ts=1&apikey=30a4e8e03aa6f9cef12c052e96686d24&hash=f02cfd762990290fc23b4f3c9c9e1474`);
    const data = await response.json();
    return data;
}

export const heroeSerie = async(titulo)=>{
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/series?title=${titulo}&limit=100&ts=1&apikey=30a4e8e03aa6f9cef12c052e96686d24&hash=f02cfd762990290fc23b4f3c9c9e1474`);
    const data = await response.json();
    return data;
}