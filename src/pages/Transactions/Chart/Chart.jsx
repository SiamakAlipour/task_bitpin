import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import api from 'utils/services/api';
import { GET } from 'utils/constants/index';

import 'chart.js/auto';

function Chart() {
  const params = useParams();
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    (async () => {
      await api('/mkt/markets/charts', GET).then((res) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        res.data.results.forEach((data) => {
          if (data.code === params.code) {
            return setCharts(data.chart);
          }
          return null;
        }),
      );
    })();
  }, [params.code]);

  return (
    <Line
      data={{
        labels: charts.map((data) => new Date(data.created_at * 1000).toLocaleTimeString()),
        datasets: [
          {
            label: params.code,
            data: charts.map((data) => data.price),
            backgroundColor: 'rgb(255, 238, 88)',
            borderColor: 'rgb(255, 238, 88)',
            color: '#FFF',
          },
        ],
      }}
    />
  );
}

export default Chart;
