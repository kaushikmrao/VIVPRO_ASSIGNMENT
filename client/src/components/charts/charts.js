import { useMemo, useState, useEffect } from 'react'
import { Scatter, Bar } from 'react-chartjs-2'
import { Chart } from "react-google-charts"
import './charts.css'

export const ScatterChart = ({data}) => {
    const [scatterData, setScatterData] = useState([])

    const dataset = {
        datasets: [
            {
                label: "Energy vs. Loudness",
                data: scatterData,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    }
    const options = {

    }

    useEffect(() => { 
        data.map(song => {
            scatterData.push({x: song.energy, y: song.loudness})
        })
    }, []);

    return (
        <div className="chart">
            <Scatter data={dataset} options={options}/>
        </div>
    )
}

export const Histogram = ({data}) => {
    const [histogramData, setHistogramData] = useState([])
    const dataset = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: "Loudness Histogram",
                data: histogramData,
                backgroundColor: 'rgba(53, 156, 44, 1)',
            }
        ]
    }
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    useEffect(() => { 
        histogramData.push(['title', 'duration'])
        data.map(song => {
            histogramData.push([song.title, song.duration_ms])
        })
    }, []);

    return (
        <div className="chart">
            <Chart   
                height={"20vw"}
                chartType="Histogram"
                loader={<div>Loading Chart</div>} 
                data={histogramData}   
                options={{
                    title: 'Length of songs, in milliseconds'
                }}
            />
        </div>
    )
}
