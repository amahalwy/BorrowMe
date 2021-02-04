import React from "react";
import PostIndexItem from "./postings_index_item";

export default (props) => {
  if (!props.filterList) return "";

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(2);

  return (
    <div style={{ position: "relative", margin: "auto", width: "100%" }}>
      <div>
        <button
          style={{ position: "absolute", top: "40%" }}
          disabled={start < 3}
          onClick={() => {
            setStart(start - 3);
            setEnd(end - 3);
          }}
        >
          Left
        </button>
      </div>
      <div style={{ display: "flex" }}>
        {props.filterList.slice(start, end + 1).map((posting) => {
          return (
            <PostIndexItem
              key={posting._id}
              posting={posting}
              showModal={props.showModal}
              hideModal={props.hideModal}
            />
          );
        })}
      </div>
      <div>
        <button
          style={{ position: "absolute", top: "0", right: "0" }}
          disabled={props.filterList.length - end <= 1}
          onClick={() => {
            setStart(start + 3);
            setEnd(end + 3);
          }}
        >
          Right
        </button>
      </div>
    </div>
  );
};
