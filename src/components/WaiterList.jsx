import * as React from "react";
import ButtonRemove from "./ButtonRemove";

function WaiterList(props) {
  return (
    <div className="list grid">
      <h2>רשימת עובדים</h2>
      {props.list.map((e) => {
           const date = new Date();
           const year = date.getFullYear();
           const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
           const day = String(date.getDate()).padStart(2, '0');
            var a = new Date(`${year}-${month}-${day}` + " " + e.houer);
            var b = new Date(`${year}-${month}-${day}` + " " + e.toHouer);
            // Check if end time is before start time, indicating it crosses midnight
            if (b < a) {
              b.setDate(b.getDate() + 1); // Add one day to the end time
            }
            var hours = Math.abs(b - a) / 36e5; 
            var decimals = hours - Math.floor(hours);
            

            // if(decimals < 0.5 ){
            //   return decimals
            // }else if(decimals > 0.5 || decimals<0.10){

            // }
            
        return (
          <div className="name flexRow bet" key={props.name}>
            <h3> {e.name}</h3>

            <p>{e.houer}</p>
            <p>{e.toHouer}</p>

            <p>{
            hours.toFixed(2)
              }</p>
 
            {/* <p>
              {e.job == "Washing"
                ? "שוטף"
                : e.job == "cook"
                ? "טבח"
                : e.job == "waiter"
                ? "מלצר"
                : e.job == "hostess"
                ? "מארחת"
                : ""}
            </p> */}
            <ButtonRemove func={props.removeWaiter} waiter={e.name} />
          </div>
        );
      })}
    </div>
  );
}
export default WaiterList;
