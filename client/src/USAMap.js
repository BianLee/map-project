import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import "./USAMap.css";
import data from "./data.json"
import svgPanZoom from 'svg-pan-zoom';
import "./index.css"
import statesMap from "react-usa-map";
import UnitedStates from "./data/UnitedStates"

import {default as AL} from "./data/al.svg";
import {default as AK} from "./data/ak.svg";
import {default as AZ} from "./data/az.svg";
import {default as AR} from "./data/ar.svg";
import { default as CA } from './data/ca.svg';
import { default as CO } from './data/co.svg';
import { default as CT } from './data/ct.svg';
import { default as DE } from './data/de.svg';
import { default as FL } from './data/fl.svg';
import { default as GA } from './data/ga.svg';
import { default as HI } from './data/hi.svg';
import { default as ID } from './data/id.svg';
import { default as IL } from './data/il.svg';
import { default as IN } from './data/in.svg';
import { default as IA } from './data/ia.svg';
import { default as KS } from './data/ks.svg';
import { default as KY } from './data/ky.svg';
import { default as LA } from './data/la.svg';
import { default as ME } from './data/me.svg';
import { default as MD } from './data/md.svg';
import { default as MA } from './data/ma.svg';
import { default as MI } from './data/mi.svg';
import { default as MN } from './data/mn.svg';
import { default as MS } from './data/ms.svg';
import { default as MO } from './data/mo.svg';
import { default as MT } from './data/mt.svg';
import { default as NE } from './data/ne.svg';
import { default as NV } from './data/nv.svg';
import { default as NH } from './data/nh.svg';
import { default as NJ } from './data/nj.svg';
import { default as NM } from './data/nm.svg';
import { default as NY } from './data/ny.svg';
import { default as NC } from './data/nc.svg';
import { default as ND } from './data/nd.svg';
import { default as OH } from './data/oh.svg';
import { default as OK } from './data/ok.svg';
import { default as OR } from './data/or.svg';
import { default as PA } from './data/pa.svg';
import { default as RI } from './data/ri.svg';
import { default as SC } from './data/sc.svg';
import { default as SD } from './data/sd.svg';
import { default as TN } from './data/tn.svg';
import { default as TX } from "./data/tx.svg";
import { default as UT } from "./data/ut.svg";
import { default as VT } from "./data/vt.svg";
import { default as VA } from "./data/UnitedStates"; // ERROR at the moment
import { default as WA } from "./data/wa.svg";
import { default as WV } from "./data/wv.svg";
import { default as WI } from "./data/wi.svg";
import { default as WY } from "./data/wy.svg";
import { findByLabelText } from "@testing-library/react";

 

const USAMap = () => {
  
  const ref = useRef();
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState([[]]);
  const [coordinates, setCoordinates] = useState([[]]); 
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityState, setSelectedCityState] = useState("");

  const addToArr = () => {
    var hasSpecificValue = false; 
    const bn = data.filter((item) => item.city == inputValue);
    if (bn.length > 0) {
      hasSpecificValue = true; 
    }
    var alreadyIn = false; 
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] == inputValue) {
        alreadyIn = true; 
      }
    }
    if (hasSpecificValue && inputValue != "" && !alreadyIn) {
      const tempData = data.filter((item) => item.city == inputValue);
      if (array[0].length != 0) {
        setArray((prevArray) => [...prevArray, [inputValue, tempData[0].state]]);
      }
      else {
        setArray([[inputValue, tempData[0].state]]);
      }
      // const temp = data.filter((item) => array.includes(item.city));
      if (array[0].length != 0) {
        setCoordinates(prevMatrix => [...prevMatrix, [tempData[0].longitude, tempData[0].latitude]]);
      }
      else {
        setCoordinates([[tempData[0].longitude, tempData[0].latitude]]);
      }
      
    }
    setInputValue('');

  };
  const removeFromArr = () => {

    
        var index = 0;
        for (var i = 0; i < array.length; i++) {
          if (array[i][0] == selectedCity) {
            index = i; 
          }
        }
        if (array.length > 2) {
        console.log("index: " + index);
          setArray(array.filter((item) => { 
            return item[0] != selectedCity
        }))
      setSelectedCity("");
      console.log(coordinates)
      var tempC = coordinates[index]
      console.log(tempC);
      setCoordinates(coordinates.filter((item) => {
        return item[0] != tempC[0]
      }))
    }
  }


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleEnterPress();
    }
  };

  const handleEnterPress = () => {
      addToArr();
  };

 const selectCity = (param, paramTwo) => {
    if (selectedCity == param) {
      setSelectedCity("");
      setSelectedCityState("");
    }
    else {
      setSelectedCity(param);
      setSelectedCityState(paramTwo);
    }
  }

  useEffect(() => {  

    console.log("useEffect being run")
    const svg = d3.select(ref.current);
    const projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
    const path = d3.geoPath().projection(projection);
    const citiesUrl = "./cities.json"
  
    // "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

    const usUrl = "./states.json"
   //  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

   const filtered = "./filtered.json"


    d3.json(usUrl).then((usData) => {
      const states = feature(usData, usData.objects.states).features;
      // Draw the map
      svg
        .append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path)

        // Plot cities
        if (array[0].length != 0) {
          svg
          .append("g")
          .selectAll("circle")
          .data(coordinates)
          .enter()
          .append("circle")
          .attr("cx", (d) => projection(d)[0])
          .attr("cy", (d) => projection(d)[1])
          .attr("r", 4)
          .attr("fill", "green")
        }
      

  
    });
  }, [array]);
  var renderComponent;

  if (selectedCityState == "Alabama") {
    renderComponent = <img src={AL}/>
  }
  else if (selectedCityState == "Alaska") {
    renderComponent = <img src={AK}/>
  }
  else if (selectedCityState == "Arizona") {
    renderComponent = <img src={AZ}/>
  }
  else if (selectedCityState == "Arkansas") {
    renderComponent = <img src={AR}/>
  }
  else if (selectedCityState == "California") {
    renderComponent = <img src={CA}/>
  }
  else if (selectedCityState == "Colorado") {
    renderComponent = <img src={CO}/>
  }
  else if (selectedCityState == "Connecticut") {
    renderComponent = <img src={CT}/>
  }
  else if (selectedCityState == "Delaware") {
    renderComponent = <img src={DE}/>
  }
  else if (selectedCityState == "Florida") {
    renderComponent = <img src={FL}/>
  }
  else if (selectedCityState == "Georgia") {
    renderComponent = <img src={GA}/>
  }
  else if (selectedCityState == "Hawaii") {
    renderComponent = <img src={HI}/>
  }
  else if (selectedCityState == "Idaho") {
    renderComponent = <img src={ID}/>
  }
  else if (selectedCityState == "Illinois") {
    renderComponent = <img src={IL}/>
  }
  else if (selectedCityState == "Indiana") {
    renderComponent = <img src={IN}/>
  }
  else if (selectedCityState == "Iowa") {
    renderComponent = <img src={IA}/>
  }
  else if (selectedCityState == "Kansas") {
    renderComponent = <img src={KS}/>
  }
  else if (selectedCityState == "Kentucky") {
    renderComponent = <img src={KY}/>
  }
  else if (selectedCityState == "Louisiana") {
    renderComponent = <img src={LA}/>
  }
  else if (selectedCityState == "Maine") {
    renderComponent = <img src={ME}/>
  }
  else if (selectedCityState == "Maryland") {
    renderComponent = <img src={MD}/>
  }
  else if (selectedCityState == "Massachusetts") {
    renderComponent = <img src={MA}/>
  }
  else if (selectedCityState == "Michigan") {
    renderComponent = <img src={MI}/>
  }
  else if (selectedCityState == "Minnesota") {
    renderComponent = <img src={MN}/>
  }
  else if (selectedCityState == "Mississippi") {
    renderComponent = <img src={MS}/>
  }
  else if (selectedCityState == "Missouri") {
    renderComponent = <img src={MO}/>
  }
  else if (selectedCityState == "Montana") {
    renderComponent = <img src={MT}/>
  }
  else if (selectedCityState == "Nebraska") {
    renderComponent = <img src={NE}/>
  }
  else if (selectedCityState == "Nevada") {
    renderComponent = <img src={NV}/>
  }
  else if (selectedCityState == "New Hampshire") {
    renderComponent = <img src={NH}/>
  }
  else if (selectedCityState == "New Jersey") {
    renderComponent = <img src={NJ}/>
  }
  else if (selectedCityState == "New Mexico") {
    renderComponent = <img src={NM}/>
  }
  else if (selectedCityState == "New York") {
    renderComponent = <img src={NY}/>
  }
  else if (selectedCityState == "North Carolina") {
    renderComponent = <img src={NC}/>
  }
  else if (selectedCityState == "North Dakota") {
    renderComponent = <img src={ND}/>
  }
  else if (selectedCityState == "Ohio") {
    renderComponent = <img src={OH}/>
  }
  else if (selectedCityState == "Oklahoma") {
    renderComponent = <img src={OK}/>
  }
  else if (selectedCityState == "Oregon") {
    renderComponent = <img src={OR}/>
  }
  else if (selectedCityState == "Pennsylvania") {
    renderComponent = <img src={PA}/>
  }
  else if (selectedCityState == "Rhode Island") {
    renderComponent = <img src={RI}/>
  }
  else if (selectedCityState == "South Carolina") {
    renderComponent = <img src={SC}/>
  }
  else if (selectedCityState == "South Dakota") {
    renderComponent = <img src={SD}/>
  }
  else if (selectedCityState == "Tennessee") {
    renderComponent = <img src={TN}/>
  }
  else if (selectedCityState == "Texas") {
    renderComponent = <img src={TX}/>
  }
  else if (selectedCityState == "Utah") {
    renderComponent = <img src={UT}/>
  }
  else if (selectedCityState == "Vermont") {
    renderComponent = <img src={VT}/>
  }
  else if (selectedCityState == "Virginia") {
    renderComponent = <img src={VA}/>
  }
  else if (selectedCityState == "Washington") {
    renderComponent = <img src={WA}/>
  }
  else if (selectedCityState == "West Virginia") {
    renderComponent = <img src={WV}/>
  }
  else if (selectedCityState == "Wisconsin") {
    renderComponent = <img src={WI}/>
  }
  else if (selectedCityState == "Wyoming") {
    renderComponent = <img src={WY}/>
  }
  else {
    renderComponent = <UnitedStates/>
  }
  return (
    <>
    <center>
    <br/>
    <input type="text" value={inputValue} onKeyPress={handleKeyPress} onChange={handleInputChange} class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight" placeholder="Sacramento"/>
    <button onClick={addToArr} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Add
    </button>
    <div class="flex flex-row" style={{maxWidth: "95%", justifyContent: "center", textAlign: "left"}}>
      <div className="usa-map-container" style={{flexBasis: selectedCity.length == 0 ? "50%" : "70%", display: "flex", marginTop: "0.5rem"}}>
        <svg ref={ref} width="960" height="600" />
      </div>
      {selectedCity.length != 0 ? <>
        <div style={{flexBasis: selectedCity.length == 0 ? "50%" : "25%", margin: "2%"}}>
          <p class="text-2xl ...">{selectedCity}, {selectedCityState}</p>
          <div className="svgContainer">
              {renderComponent}
          </div>
          {/* <br/><p class="text">Population: </p>
          <p class="text">Last Visited: </p> */}
          <textarea id="message" rows="4" class="block p-4 w-full my-3 text-sm text-gray-900 rounded-lg border dark:placeholder-gray-400 bg-gray-200 resize-none" placeholder="Write your notes here..."></textarea>
          <button onClick={removeFromArr} class="shadow bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 w-full rounded" type="button">
            Remove From Map
          </button>

        </div>
      </> : <></>}
      <br/>
    </div>

    <br/>
    <div class="flex grid grid-cols-5  border border-solid border-gray-400 p-1" style={{maxWidth: "95%"}}>
    {
        array[0].length != 0 ? <>
          {array.map((item, i) => {
          return <>
          <div style={{cursor: "pointer", borderStyle: "solid", borderWidth: "2px", borderColor: selectedCity == item[0] ? "#D3D3D3" : "white"}}  class="m-1 p-2 px-2 rounded bg-gray-100 hover:bg-gray-200" data={item[0]} onClick={() => selectCity(item[0], item[1])}>
            <p key={i}>{item[0]}, {item[1]}</p>
          </div>
          </>
        })}
        </> : <></>
    }
    </div>
    <br/><br/>
    </center>

    </>

  );
};

export default USAMap;
