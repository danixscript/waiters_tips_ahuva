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
         var wholeHours = Math.floor(hours);
         var decimals = hours - wholeHours;
         
         // Function to round decimals to the nearest 0 or 5 minutes
         function roundToNearestFive(decimals) {
           const decimalMinutes = Math.round(decimals * 60); // Convert decimals to minutes
           const roundedMinutes = Math.round(decimalMinutes / 5) * 5; // Round to nearest 5 minutes
         
           switch (roundedMinutes) {
             case 0:
               return 0.00;
             case 5:
               return 0.08;
             case 10:
               return 0.17;
             case 15:
               return 0.25;
             case 20:
               return 0.33;
             case 25:
               return 0.41;
             case 30:
               return 0.50;
             case 35:
               return 0.58;
             case 40:
               return 0.67;
             case 45:
               return 0.75;
             case 50:
               return 0.83;
             case 55:
               return 0.91;
             case 60:
               return 1.00; // Rounds to the next hour
             default:
               return decimals; // Just in case, although all cases should be handled
           }
         }
         
         // Round the decimals
         decimals = roundToNearestFive(decimals);
         
         // Add the rounded decimals back to the whole hours
         hours = wholeHours + decimals;
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
