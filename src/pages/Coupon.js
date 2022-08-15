import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Box} from '@mui/material';
import Spinner from 'src/components/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';
import {makeStyles} from '@mui/styles';

// material
import {
  Card,
  Table,
  Stack,
  Switch,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { CouponListHead, CouponListToolbar, CouponMoreMenu } from '../sections/@dashboard/coupon';
import {FetchCouponList} from '../redux/coupon/fetchAll/action';
import {StatusToggler} from '../redux/coupon/statusToggler/action';
// ----------------------------------------------------------------------

const useStyles = makeStyles({
  tableCell: {
    padding: "10px 16px",
  }
});

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'CODE', 
    id: 'code', 
    alignRight: false 
  },
  { 
    label: 'COUPON TYPE', 
    id: 'discountType', 
    alignRight: false 
  },
  { 
    label: 'AMOUNT', 
    id: 'amount', 
    alignRight: false 
  },
  { 
    label: 'PERCENTAGE', 
    id: 'percentage', 
    alignRight: false 
  },
  { 
    label: 'MAX DISCOUNT', 
    id: 'max_discount', 
    alignRight: false 
  },
  { 
    label: 'START DATE', 
    id: 'start_date', 
    alignRight: false 
  },
  { 
    label: 'EXPIRE DATE', 
    id: 'expireDate', 
    alignRight: false 
  },
  { 
    label: 'VALID DAYS', 
    id: 'days', 
    alignRight: false 
  },
  { 
    label: 'STATUS', 
    id: 'is_active', 
    alignRight: false 
  },
  { 
    label: 'USAGE PER USER', 
    id: 'usage_per_user', 
    alignRight: false 
  },
  { 
    label: 'MINIMUM SPEND', 
    id: 'minimum_spend', 
    alignRight: false 
  },
  { 
    label: 'MAXIMUM SPEND', 
    id: 'maximum_spend', 
    alignRight: false 
  },
  { 
    label: 'MAXIMUM USAGE LIMIT', 
    id: 'maximum_usage_limit', 
    alignRight: false 
  },
  { 
    label: 'IS EXPIRE', 
    id: 'isExpire', 
    alignRight: false 
  },
  { 
    label: 'DESCRIPTION', 
    id: 'description', 
    alignRight: false 
  },
  { 
    label: 'UPDATED AT', 
    id: 'updated_at', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'created_at', 
    alignRight: false 
  },
];

// ----------------------------------------------------------------------

function ReduceDescription(data){
  let arr = data.split('');
  let reducer , message;
  if(arr.length > 50){
    reducer = arr.slice(1, 50);
    message = reducer.join('');
    return message+" ...";
  }
  message = arr.join('');
  return message
}

function SeperatedByComma(data){
  return data.join(', ')
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.code.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Coupon() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [couponStatus, setCouponStatus] = useState('1');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.CouponList.loading);
  
  const ActiveStatusHandler = ()=>{
    setCouponStatus("1");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  const InactiveStatusHandler = ()=>{
    setCouponStatus("0");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  useEffect(()=>{
    dispatch(FetchCouponList(couponStatus, filterName, page, rowsPerPage, order))
  }, [ dispatch, couponStatus, filterName, page, rowsPerPage, order])

  const CouponList = useSelector(state => state.CouponList.data);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredCoupons = applySortFilter(CouponList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredCoupons.length === 0;

  const StatusToggleHandler = (id)=>{
     dispatch(StatusToggler(id));
     setTimeout(()=>{
        dispatch(FetchCouponList(couponStatus, filterName, page, rowsPerPage, order))
     },1000)
  }

  return (
    <Page title="Munchh | Coupon">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Coupon Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/coupon/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Coupon
          </Button>
        </Stack>
        <Card>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
            <CouponListToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              <div style={{ marginTop : "25px" }} >
                <Button
                    variant= {couponStatus === "1"? "contained": "outlined"}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {couponStatus === "0"? "contained": "outlined"}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div> 
        {loading ? <Spinner/> : <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 3500 }}>
              <Table>
                <CouponListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredCoupons
                    .map((row) => {
                      const { 
                        id, 
                        code,
                        coupon_type,
                        max_discount,
                        amount,
                        days,
                        start_date,
                        end_date,
                        usage_per_user,
                        minimum_spend,
                        maximum_spend,
                        maximum_usage_limit,
                        is_active,
                        is_expired,
                        description,
                        created_at,
                        updated_at,
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell className= {classes.tableCell}  align="left">{id}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{code.toUpperCase()}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{coupon_type === 1 ? "Fixed" : "Percentage"}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{coupon_type === 1? "RM "+ amount?.toFixed(2): "--"}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{coupon_type === 2? amount : "--"}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{max_discount === 0? "--":"RM "+ max_discount?.toFixed(2)}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY" >{start_date}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY" >{end_date}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left"> { SeperatedByComma(days?days: ['empty'])}  </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Switch
                              onClick={()=>StatusToggleHandler(id)}
                              defaultChecked = {is_active? is_active : is_active}
                            />  
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{usage_per_user} Time</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">RM {minimum_spend?.toFixed(2)}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">RM {maximum_spend?.toFixed(2)}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{maximum_usage_limit} Time</TableCell>
                          <TableCell className= {classes.tableCell}  align="left"> {is_expired? "Yes" : "No"} </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{CapitalizeFirstLetter(ReduceDescription(description?description : "--"))}</TableCell> 
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{updated_at}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="right">
                            <CouponMoreMenu  
                              id = {id} 
                              status = {couponStatus}
                              filter = {filterName}
                              page = {page}
                              limit = {rowsPerPage}
                              order = {order}
                            />
                          </TableCell> 
                        </TableRow>
                      );
                    })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={-1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ page }) => {
              return `Page: ${page}`;
            }}
            backIconButtonProps={
              page === 1 ? {disabled: true} : undefined
            }
            nextIconButtonProps={
              filteredCoupons.length === 0 || filteredCoupons.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}   
        </Card>
      </Container>
    </Page>
  );
}
