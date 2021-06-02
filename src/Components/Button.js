import React from 'react';

function Button({attributes}){
    return(
        <button id={attributes.id} className={attributes.class}>{attributes.value}</button>
    )
}

export default Button;