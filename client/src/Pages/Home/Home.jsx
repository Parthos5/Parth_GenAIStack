import React, { useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import AddStackBtn from "../../Components/AddStackBtn/AddStackBtn";
import StackCard from "../../Components/StackCard/StackCard";

export default function Home() {
  const [stacks, setStacks] = useState([]);
  return (
    <div className="homeDiv">
      {/* Home Section 1 */}
      <Navbar />

      {/* Home Section 2 */}
      <div className="hsect2 MyStacksSection">
        <p className="hsecthead">My Stacks</p>
        {/* <button className="addStackBtn">Add stack</button> */}
        <AddStackBtn />
      </div>

      {/* Home Section 3 */}
      <div className="hsect3 DisplayStackSect">
        <StackCard
          name="Chat with PDF"
          description="Chat with your pdf docs"
          id="12345"
        />
        <StackCard />
        <StackCard />
        <StackCard />
        <StackCard />
        <StackCard />
      </div>
    </div>
  );
}
