import React, { useState} from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FormData from "form-data";
import {useSelector, useDispatch} from 'react-redux';
import {createRequest} from '../../actions/request_actions';

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
  
  const getDates = () => {
    const dateArray = [];
    let currentDate = state[0].startDate;

    while (currentDate <= state[0].endDate) {
      dateArray.push(new Date(currentDate));
      currentDate = currentDate.addDays(1);
    }

    return dateArray;
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    
    const dateRangeArray = getDates();

    const formData = new FormData();
    formData.append("postingId", id);
    formData.append("requestorId", currentUser.id);
    formData.append("requestorName", currentUser.firstName);
    formData.append("receiverId", props.posting.ownerId);
    formData.append("requestDates", dateRangeArray);
    formData.append("postingImage", props.posting.image);
    formData.append("postingTitle", props.posting.title);
    formData.append("amount", props.posting.price);

    dispatch(createRequest(formData));
    setTimeout(()=>{
      props.hideModal();
    }, 1)
  };
    
  const rentalButton = () => {
    if (currentUser.id === props.posting.ownerId) {
      return '';
    } else {
      return (
        <button className="modal-rent-button" onClick={handleSubmit}>
          Rent now!
        </button>
      )
    }
  }

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setState([item.selection])
        }}

        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      {rentalButton()}
    </div>
  );
}