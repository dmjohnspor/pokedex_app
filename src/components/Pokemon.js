import React from 'react';

const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;

    return (
        <div>{`This is the Pokemon page for Pokemon #${pokemonId}`}</div>
    );
};

export default Pokemon;