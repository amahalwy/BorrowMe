import React, { useState, useEffect} from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FormData from "form-data";
import {useSelector, useDispatch} from 'react-redux';
import {createRequest} from '../../actions/request_actions';
// import { Discovery } from "aws-sdk";
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
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user); 
  const id = props.posting._id;
    // useEffect(() => {
    //   setStart(props.calendarEvent.state);
    //   setEnd(props.calendarEvent.state);
    // }, [state.StatDate, state.endDate]);


  const getDates = () => {
    const dateArray = new Array();
    let currentDate = state[0].startDate;

    while (currentDate <= state[0].endDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1);
      console.log(currentDate)
    }

    return dateArray;
  }
   
  const handleSubmit = e => {
    e.preventDefault();
    
    const dateRangeArray = getDates();

    const formData = new FormData();
    formData.append("postingId", id);
    formData.append("requestorId", currentUser.id );
    formData.append("requestDates", dateRangeArray);
    // formData.append("startDate", state[0].startDate.toString());
    // formData.append("endDate", state[0].endDate.toString());
    // console.log(state[0].startDate);
    // console.log(state[0].startDate.toDateString());

    dispatch(createRequest(formData));
    // return axios.post('/api/requests', formData)
    // .then(req => res.json(req))
    // .catch
  };
    
    return (
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            // console.log(item)
            setState([item.selection])
            // console.log(state)
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