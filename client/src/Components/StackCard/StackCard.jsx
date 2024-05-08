import React from "react";
import './StackCard.css'
import arrowLink from '../../assets/arrowLink.png'
import { Link } from "react-router-dom";

export default function StackCard(props) {
  const { name, description, cardId } = props;
  return (
    <div className="stackCardDiv">
      <div className="cardInfo">
        <p className="stackName">{name}</p>
        <p className="stackDesc">{description}</p>
      </div>
      <Link to="/edit">
      <div className="cardLink">Edit Stack <img src={arrowLink} alt="" /></div>
      </Link> 
    </div>
  );
}
