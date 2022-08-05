import { useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {useDispatch, useSelector} from 'react-redux';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../../components/charts';
import {FetchTopCuisine} from '../../../redux/report/fetchTopCuisine/action';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function TopCuisines() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(FetchTopCuisine());
  },[dispatch])

  const ChartData = useSelector(state =>state.Top5Cuisine.data);

  const ChartNumber = [
    ChartData[0]?.total,
    ChartData[1]?.total,
    ChartData[2]?.total,
    ChartData[3]?.total,
    ChartData[4]?.total,
  ]

  const ChartLevels = [
    ChartData[0]?.cuisine_name,
    ChartData[1]?.cuisine_name,
    ChartData[2]?.cuisine_name,
    ChartData[3]?.cuisine_name,
    ChartData[4]?.cuisine_name,
  ]

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ChartLevels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Top 5 Popular Cuisine" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={ChartNumber} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
