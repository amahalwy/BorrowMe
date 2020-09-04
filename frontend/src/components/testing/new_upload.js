import React, {useState} from "react";
import ImageUploader from "react-images-upload";

// export default class Testing extends React.Component {
export default (props) => {
  const [picture, setPicture] = useState("");

  const onDrop= picture => {
    setPicture(picture)
  }

  debugger
  return (
    <ImageUploader
      withIcon={true}
      buttonText="Choose images"
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
}
