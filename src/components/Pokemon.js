import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUppercase } from '../utils';

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            })
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, height, weight, types, sprites } = pokemon
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites
        return (
            <>
                <Typography variant='h1'>
                    {`${id}`}. {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: '300px', height: '300px' }} src={fullImageUrl} />
                <Typography variant='h3'>Pokemon Info</Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography variant='h6'>Types:</Typography>
                {types.map(typeInfo => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}> {`${name}`}</Typography>
                })}
            </>
        );
    };

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography> Pokemon not found </Typography>}
            {pokemon !== undefined && (
                <Button variant='contained' onClick={() => history.push('/')}>Back to Pokedex</Button>
            )}
        </>
    );
};

export default Pokemon;