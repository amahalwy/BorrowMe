import React from 'react'

export default props => {

  if (!props.filterList) return "";

  return (
    <div>
      <ul>
        {
          props.filterList.map(posting => {
            return (
              <div>
                <img src={posting.image} alt=""/>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}
