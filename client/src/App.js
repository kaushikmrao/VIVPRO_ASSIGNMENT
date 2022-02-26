import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import { CSVLink } from "react-csv"
import { ScatterChart, Histogram } from './components/charts/charts'
import Table from "./components/table/Table"
import SongSearch from './components/SongSearch'
import './App.css';

function App() {
  const [data, setData] = useState([{}])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
      axios({
        method: "get",
        url: "http://127.0.0.1:5000/api/GetSongs",
      }).then( res => {
        setData(res.data);
        setLoadingData(false);
      })
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <SongSearch />
      <div className="data-table">     
        {loadingData ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="charts">
              <ScatterChart data={data}/>
              <Histogram data={data}/>
            </div>
            <Table data={data}/>
            <CSVLink data={data}>Download Data as CSV</CSVLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
