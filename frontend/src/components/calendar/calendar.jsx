import React, { useState, useEffect} from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Discovery } from "aws-sdk";
import FormData from "form-data";
import {useSelector} from 'react-redux';
import axios from 'axios';

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export default (props) => {
  const [state, setState] = useState([{
      startDate: new Date(),
      endDate: null,
      key: "selection",
    }, ]);

  const currentUser = useSelector(state => state.session.user); 
    // useEffect(() => {
    //   setStart(props.calendarEvent.state);
    //   setEnd(props.calendarEvent.state);
    // }, [state.StatDate, state.endDate]);


    const getDates = () => {
      const dateArray = new Array();
      let currentDate = state[0].startDate;
      // console.log(currentDate)
      // console.log(state[0].endDate)
      // console.log(currentDate !== state[0].endDate)
      while (currentDate <= state[0].endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
        console.log(currentDate)
      }
      // console.log(dateArray)
      return dateArray;
    }
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dateRangeArray = getDates();
    const formData = new FormData();
    formData.append("postingId", props.posting._id);
    formData.append("requestorId", currentUser.id );
    formData.append("startDate", state[0].startDate.toString());
    formData.append("endDate", state[0].endDate.toString());
    console.log(state[0].startDate);
    console.log(state[0].startDate.toDateString());

      return axios
        .post("/api/requests", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  };
    
    return (
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            console.log(item)
            setState([item.selection])
            console.log(state)
          }}

          moveRangeOnFirstSelection={false}
          ranges={state}
        />

        <button className="modal-rent-button" onClick={handleSubmit}>
          Rent now!
        </button>
      </div>
    );
}