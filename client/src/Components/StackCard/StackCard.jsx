import React from "react";
import './StackCard.css'
import arrowLink from '../../assets/arrowLink.png'

export default function StackCard(props) {
  const { name, description, id } = props;
  return (
    <div className="stackCardDiv">
      <div className="cardInfo">
        <p className="stackName">{name}</p>
        <p className="stackDesc">{description}</p>
      </div>
      <div className="cardLink">Edit Stack <img src={arrowLink} alt="" /></div>
    </div>
  );
}
