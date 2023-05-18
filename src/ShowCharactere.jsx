import React, { useEffect, useState } from 'react';
import naImg from './img/n-a.jpg';
import maleImg from './img/male.jpg';
import femaleImg from './img/female.jpg';

let characterImg
const ShowCharacter = () => {
    const url = 'https://swapi.py4e.com/api/people';
    const [character, setCharacter] = useState();

    useEffect(() => {
        const fetchData = async (apiUrl) => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };

        const getRandomCharacter = async (characterr) => {
            try {
                const randomId = Math.floor(Math.random() * characterr.count) + 1;
                const data = await fetchData(`${url}/${randomId}`);
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching random character:', error);
            }
        };

        const showRandomCharacter = async () => {
            const data = await fetchData(url);
            getRandomCharacter(data);
        };

        showRandomCharacter();
    }, []);

    if (character && character.gender === 'male') {
        characterImg = maleImg
    }
    else if (character && character.gender === 'female') {
        characterImg = femaleImg
    }
    else {
        characterImg = naImg
    }

    return (
        <div className='card'>
            {character ? (
                <div className='cardContent'>
                    <img src={characterImg} alt='' />
                    <h3>Name: {character.name}</h3>
                    <p>Height: {character.height}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Eye Color: {character.eye_color}</p>
                    <p>Birth Year: {character.birth_year}</p>
                </div>
            ) : (
                'Cargando...'
            )}
        </div>
    );
};

export default ShowCharacter;