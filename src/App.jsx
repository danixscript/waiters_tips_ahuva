import "./App.css";
import TipTable from "./components/TipTable";
import InputSide from "./components/InputSide";
import WorkerTable from "./components/WorkerTable";
import PopUp from "./components/PopUp";
import ButtonExel from "./components/ButtonExel";
import generatePDF from './components/GeneratePDF';
import sendPDFToWhatsApp from './components/SendPDFToWhatsApp';
import { useState } from "react";

function App() {
  const [WaiterArray, setWaiterArray] = useState([]);
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
      if (e.name === WaiterArray[i].name) {
        flag = true;
        setPopUp({ active: true, txt: "המלצר כבר קיים" });
        return;
      }
    }
    if (e.name === "" || e.houer === "" || e.toHouer === "") {
      flag = true;
      setPopUp({ active: true, txt: "נא למלא את כל הפרטים" });
      return;
    }
    if (!flag) {
      setWaiterArray([...WaiterArray, e]);
    }
  }

  function removeWaiter(e) {
    const arr = WaiterArray.filter((waiter) => waiter.name !== e);
    setWaiterArray(arr);
  }

  function clearAll() {
    setWaiterArray([]);
  }

  function getMoneyTip(e) {
    setTipMoney(e.target.value);
  }

  function startCalc() {
    let arrTable = [];
    let workersTable = [];
    let sum = 0;
    let sumCookHours = 0;

    for (let i = 0; i < WaiterArray.length; i++) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      let a = new Date(`${year}-${month}-${day} ${WaiterArray[i].houer}`);
      let b = new Date(`${year}-${month}-${day} ${WaiterArray[i].toHouer}`);

      if (b < a) {
        b.setDate(b.getDate() + 1);
      }

      let hours = Math.abs(b - a) / 36e5;
      let wholeHours = Math.floor(hours);
      let decimals = hours - wholeHours;

      function roundToNearestFive(decimals) {
        const decimalMinutes = Math.round(decimals * 60);
        const roundedMinutes = Math.round(decimalMinutes / 5) * 5;

        switch (roundedMinutes) {
          case 0: return 0.00;
          case 5: return 0.08;
          case 10: return 0.17;
          case 15: return 0.25;
          case 20: return 0.33;
          case 25: return 0.41;
          case 30: return 0.50;
          case 35: return 0.58;
          case 40: return 0.67;
          case 45: return 0.75;
          case 50: return 0.83;
          case 55: return 0.91;
          case 60: return 1.00;
          default: return decimals;
        }
      }

      decimals = roundToNearestFive(decimals);
      hours = wholeHours + decimals;

      WaiterArray[i].sumHours = hours;

      if (WaiterArray[i].job === "waiter") {
        sum += hours;
        arrTable.push(WaiterArray[i]);
      } else if (WaiterArray[i].job === "cook") {
        sumCookHours += hours;
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

  const handleGenerateAndSendPDF = () => {
    const columns = [
      { title: 'שם', field: 'name' },
      { title: 'משעה', field: 'houer' },
      { title: 'עד שעה', field: 'toHouer' },
      { title: 'משך שעות', field: 'sumHours' },
      { title: 'תפקיד', field: 'job' }
    ];

    const title = 'טבלת עובדים';

    const pdfBlob = generatePDF(TableWorkersArray, columns, title);
    sendPDFToWhatsApp(pdfBlob, '+972534273529'); // Replace with the recipient's phone number
  };

  return (
    <div className="flexCol center">
      {PopUpState.active === true ? (
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
      <ButtonExel func={handleGenerateAndSendPDF} />
      {/* <button onClick={handleGenerateAndSendPDF}>Generate and Send PDF</button> */}
      <br />
      <br />
      <footer>
        <h3>כל הזכויות שמורות לדניאל פיתוח אתרים &copy;</h3>
        <br /><br />
      </footer>
    </div>
  );
}

export default App;
