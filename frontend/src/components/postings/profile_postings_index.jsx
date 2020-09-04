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
              <div>
                <img src={posting.image} alt=""/>
              </div>
            </div>
            )
          })
        }
      </ul>
    </div>
  )
}
