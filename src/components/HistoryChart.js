import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { graphRanges } from '../constants/appConstants'
import { getCryptoPriceGraphData } from '../services/currencyService'

const HistoryChart = ({ currencyName }) => {
    const [activeRange, setActiveRange] = useState(0),
        [options, setOptions] = useState({});

    useEffect(() => {
        const { value, unit } = graphRanges[activeRange]

        getCryptoPriceGraphData(currencyName, unit, value)
            .then(graphOptions => {
                setOptions(graphOptions)
            })

    }, [currencyName, activeRange])

    return (
        <div>
            <h3>Live Chart</h3>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div className="d-flex justify-content-end mt-2">
                {
                    graphRanges.map(({ label }, index) => (
                        <button
                            key={label}
                            className={`btn btn-graph ${index === activeRange ? "active" : ""}`}
                            onClick={() => setActiveRange(index)}
                        >
                            {label}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default HistoryChart;