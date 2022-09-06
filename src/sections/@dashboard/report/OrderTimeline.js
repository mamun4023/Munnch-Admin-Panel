import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
import { useEffect } from 'react';
import {FetchOrderTimeLine} from '../../../redux/report/fetchOrderTimeline/action';

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
 const { type, title, order } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'warning.main') ||
              (type === 'order4' && 'green') ||
              (type === 'order5' && 'error.secondary') ||
              (type === 'order6' && 'error.main') ||
              (type === 'order7' && 'red') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {/* {fDateTime(time)} */}
          {order}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(FetchOrderTimeLine())
  }, [dispatch])

  const OrderTimeLineData = useSelector(state => state.OrderTimeline.data);

  const TIMELINES = [
    {
      title: 'Total Assigning Driver Order',
      order : OrderTimeLineData[0]?.total? OrderTimeLineData[0]?.total : 0,
      type: 'order1'
    },
    {
      title: 'Total Ongoing Order',
      order : OrderTimeLineData[4]?.total? OrderTimeLineData[4]?.total : 0,
      type: 'order2'
    },
    {
      title: 'Total Pending Order',
      order : OrderTimeLineData[5]?.total? OrderTimeLineData[5]?.total : 0,
      type: 'order3'
    },
    {
      title: 'Total Completed Order',
      order : OrderTimeLineData[2]?.total? OrderTimeLineData[2]?.total : 0,
      type: 'order4'
    },
    {
      title: 'Total Cancelled Order',
      order : OrderTimeLineData[1]?.total? OrderTimeLineData[1]?.total : 0,
      type: 'order5'
    },
    {
      title: 'Total Expired Order',
      order : OrderTimeLineData[3]?.total? OrderTimeLineData[3]?.total : 0,
      type: 'order6'
    },
    {
      title: 'Total Rejected Order',
      order : OrderTimeLineData[6]?.total ? OrderTimeLineData[6]?.total : 0,
      type: 'order7'
    }
  ];

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
      // style = {{maxHeight : "500px"}}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem 
              key={item?.title} 
              item={item} 
              isLast={index === TIMELINES.length - 1} 
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
