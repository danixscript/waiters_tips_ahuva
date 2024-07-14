import * as React from 'react';


 function PopUp(props) {
  return (
<div className="popup flexCol center fixed">
    <div className="popUpSquare">
    <h2>{props.txt}</h2>
    <button onClick={props.func} >הבנתי</button>
    </div>
</div>
  );
}
export default PopUp