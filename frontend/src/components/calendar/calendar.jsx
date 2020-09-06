import React, { useState, useEffect} from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Discovery } from "aws-sdk";
import FormData from "form-data";
import {useSelector} from 'react-redux';


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


    const getDates = (state) => {
      let dateArray = new Array();
      let currentDate = state.startDate;
      while (currentDate <= state.endDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postingId", props.posting._id);
    formData.append("requestorId", currentUser.id );
    formData.append("startDate", state[0].startDate);
    formData.append("endDate", state[0].endDate);
    debugger

      return axios
        .post("/api/requests", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  };
    
    return (
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />

        <button className="modal-rent-button" onClick={handleSubmit}>
          Rent now!
        </button>
      </div>
    );
}