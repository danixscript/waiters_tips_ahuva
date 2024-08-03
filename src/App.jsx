import "./App.css";
import TipTable from "./components/TipTable";
import InputSide from "./components/InputSide";
// import WaiterList from "./components/WaiterList";
import { useEffect, useState } from "react";
import WorkerTable from "./components/WorkerTable";
import PopUp from "./components/PopUp";
import ButtonExel from "./components/ButtonExel";

function App() {
  const [WaiterArray, setWaiterArray] = useState([]);
  // const [WorkersArray, setWorkersArray] = useState([]);
  const [TableWorkersArray, setTableWorkersArray] = useState([]);
  const [TipMoney, setTipMoney] = useState(0);
  const [TipMoneyForHour, setTipMoneyForHour] = useState(0);
  const [tableArray, setTableArray] = useState([]);
  const [sumWaitersHours, setSumWaitersHours] = useState(0);
  const [sumCookHoursState, setSumCookHours] = useState(0);
  const [PopUpState, setPopUp] = useState({ active: false, txt: "" });

  function waiterFilter(e) {
    let flag = false;
    for (let i = 0; i < WaiterArray.length; i++) {
      if (e.name == WaiterArray[i].name) {
        flag = true;
        setPopUp({ active: true, txt: "המלצר כבר קיים" });
        return;
      }
    }
    if (e.name == "" || e.houer == "" || e.toHouer == "") {
      flag = true;
      setPopUp({ active: true, txt: "נא למלא את כל הפרטים" });

      return;
    }
    if (!flag) {
      setWaiterArray([...WaiterArray, e]);
    }
  }

  function removeWaiter(e) {
    console.log(e);

    const arr = WaiterArray.filter((waiter) => {
      return waiter.name != e;
    });
    setWaiterArray(arr);
  }

  function clearAll() {
    setWaiterArray([]);
  }
  function getMoneyTip(e) {
    console.log(e);
    setTipMoney(e.target.value);
    console.log(TipMoney);
  }

  function startCalc() {
    let arrTable = [];
    let workersTable = [];
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // today = mm + "," + dd;
    let sum = 0;
    let sumCookHours = 0;

    for (let i = 0; i < WaiterArray.length; i++) {
     
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
      const day = String(date.getDate()).padStart(2, '0');
      var a = new Date(`${year}-${month}-${day}` + " " + WaiterArray[i].houer );
      var b = new Date(`${year}-${month}-${day}` + " " + WaiterArray[i].toHouer);
      
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

      WaiterArray[i].sumHours = hours;

      if (WaiterArray[i].job == "waiter") {
        sum += hours;
      } else if (WaiterArray[i].job == "cook") {
        sumCookHours += hours;
      }

      if (WaiterArray[i].job == "waiter") {
        arrTable.push(WaiterArray[i]);
      } else {
        workersTable.push(WaiterArray[i]);
      }
    }
    let hafrasha = sum * 6;
    let tipFoeHour = (TipMoney - hafrasha) / sum;

    setTipMoneyForHour(tipFoeHour);
    setSumWaitersHours(sum);
    setSumCookHours(sumCookHours);
    setTableWorkersArray(workersTable);
    setTableArray(arrTable);
  }

  function clearPopUp() {
    setPopUp({ active: false, txt: "" });
  }

  return (
    <div className="flexCol center">
      {PopUpState.active == true ? (
        <div>
          <PopUp txt={PopUpState.txt} func={clearPopUp} />
        </div>
      ) : (
        ""
      )}
      <div className="nav w100">
        <h3>אהובה סגירת טיפים</h3>
      </div>
      <br />
      <div className="flexCol  bet w70">
        <InputSide
          getMoneyTip={getMoneyTip}
          startCalc={startCalc}
          clearAll={clearAll}
          waiterFilter={waiterFilter}
          list={WaiterArray}
          removeWaiter={removeWaiter}
        />

        {/* <WaiterList list={WaiterArray} removeWaiter={removeWaiter} /> */}
      </div>
      <br />

      <div className="w80">
        <TipTable
          TipMoneyForHour={TipMoneyForHour}
          sumWaitersHours={sumWaitersHours}
          array={tableArray}
        />
      </div>
      <br />
      <br />
      <br />
      <div className="w80">
        <WorkerTable array={TableWorkersArray} sumCookHoursState={sumCookHoursState} />
      </div>
      <br />
      <br />
      <br />
      <ButtonExel/>
      <br />
      <br />
      <footer>
        <h3 >כל הזכויות שמורות לדניאל פיתוח אתרים  &copy;</h3>
        <br /><br />
      </footer>
    </div>
  );
}

export default App;
