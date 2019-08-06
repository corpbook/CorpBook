import React from 'react';
import './Cards.css'
const Card= (props) => {
    return(
        <div id = 'Card' className='bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img id = 'img' alt='profilePic' src={props.url}/>
                <p>Name is : {props.name} {props.name2}</p>
                <p>Company is: {props.company}</p>
                <p>Current Position: {props.curPos}</p>
        </div>
    )
}

export default Card;