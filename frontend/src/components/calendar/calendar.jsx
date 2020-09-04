import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Discovery } from "aws-sdk";

export default props => {
  const [state, setState] = useState([{
      startDate: new Date(),
      endDate: null,
      key: "selection",
    }, ]);

    // useEffect(() => {
      
    // }, [state.endDate])

    const getDates = (state) => {
      let dateArray = new Array();
      let currentDate = state.startDate;
      while (currentDate <= state.endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }
    
    
    return ( 
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />


    );
}