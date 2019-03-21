import React from 'react';
import ReactDom from 'react-dom';

import Admin from "./Admin";


if(document.querySelector('#root')){
    ReactDom.render(<Admin />,document.querySelector('#root'));

}