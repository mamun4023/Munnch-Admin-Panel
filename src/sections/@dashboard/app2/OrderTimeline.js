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
// utils
import { fDateTime } from '../../../utils/formatTime';
import { useEffect } from 'react';
import {FetchOrderTimeLine} from '../../../redux/report/fetchOrderTimeline/action';

// ----------------------------------------------------------------------


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
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
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

  console.log("order time line data", OrderTimeLineData)


  const TIMELINES = [
    {
      title: 'Total Placed Order',
      order : OrderTimeLineData[5]?.total,
      type: 'order1'
    },


    {
      title: 'Total Delivered Order',
      order : OrderTimeLineData[2]?.total,
      type: 'order2'
    },

    // {
    //   title: 'Total Processed Order',
    //   order : OrderTimeLineData[5]?.total,
    //   type: 'order3'
    // },
    // {
    //   title: 'Shipping Order',
    //   order : OrderTimeLineData[0]?.total,
    //   type: 'order4'
    // },

    {
      title: 'Total Rejected Order',
      order : OrderTimeLineData[1]?.total,
      type: 'order5'
    }
  ];




  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
