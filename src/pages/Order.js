import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';
import { makeStyles } from '@mui/styles';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  MenuItem,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { OrderListHead, OrderListToolbar, OrderMoreMenu } from '../sections/@dashboard/order';
import {FetchOrderList} from '../redux/order/FetchAllOrder/action';
import Spinner from 'src/components/Spinner';
import {CapitalizeFirstLetter} from 'src/helperFunctions';

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
    label: 'USER NAME', 
    id: 'userName', 
    alignRight: false 
  },
  { 
    label: 'MERCHANT NAME', 
    id: 'merchantName', 
    alignRight: false 
  },
  { 
    label: 'RIDER NAME', 
    id: 'riderName', 
    alignRight: false 
  },
  { 
    label: 'TOTAL PRICE', 
    id: 'totalPrice',
    alignRight: false 
  },
  { 
    label: 'FOOD TYPE', 
    id: 'foodType',
    alignRight: false 
  },
  { 
    label: 'STATUS', 
    id: 'status',
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'createAt', 
    alignRight: false 
  },
];

// ----------------------------------------------------------------------

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
    return filter(array, (_user) => _user.customer?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function LowerCase(s){
  if (typeof s !== 'string') return ''
  var removeUnderScore = s.replace(/_/g, " ");
  let makeLowerCase =  removeUnderScore.toLowerCase();
  return makeLowerCase.charAt(0).toUpperCase() + makeLowerCase.slice(1)
}

function RiderStatus(data, rider, foodType){
  if(data === "ASSIGNING_DRIVER" && foodType === "Food Item")
    return "Assigning Rider"
  else if(data === "ON_GOING" && foodType === "Food Item")
    return rider
  else if(data === "PICKED_UP" && foodType === "Food Item")
    return rider
  else if(data === "COMPLETED" && foodType === "Food Item")
    return "Delivered Rider"
  else
    return "--"
}

export default function Order() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderStatus, setOrderStatus] = useState("ASSIGNING_DRIVER");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.OrderList.loading);

  useEffect(()=>{
    dispatch(FetchOrderList(page, rowsPerPage, order, orderStatus, filterName))
  },[dispatch, page, rowsPerPage, order, orderStatus, filterName])

  const OrderList = useSelector(state => state.OrderList.data);

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

  const filteredUsers = applySortFilter(OrderList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Munchh | Order">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Order Management
          </Typography>
        </Stack>
        <Card>
              <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
                <OrderListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
                <div style={{ marginTop : "25px" }} >
                <Stack
                   sx={{
                    marginRight : 5,
                    padding : 0,
                   }}
                > 
                 <TextField
                    fullWidth
                    select
                    size='small'
                    variant="outlined"
                    value={orderStatus}
                    onChange = {(e)=>setOrderStatus(e.target.value)}
                    >    
                      <MenuItem value= "ASSIGNING_DRIVER">Assigning </MenuItem>
                      <MenuItem value= "PENDING"> Pending </MenuItem>
                      <MenuItem value= "CANCELED"> Cancelled </MenuItem>
                      <MenuItem value= "EXPIRED"> Expired </MenuItem>
                      <MenuItem value= "REJECTED"> Rejected </MenuItem>
                      <MenuItem value= "ON_GOING"> On Going </MenuItem>
                      <MenuItem value= "PICKED_UP"> Picked Up </MenuItem>
                      <MenuItem value= "COMPLETED"> Completed </MenuItem>
                  </TextField>
                </Stack>
              </div>
          </div>
          {loading? <Spinner/> : <> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1400 }}>
              <Table>
                <OrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id,  paid_price, customer, store, order, rider_data, status, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        > 
                          <TableCell className= {classes.tableCell} align="left">{id}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{CapitalizeFirstLetter(customer?.name)}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{CapitalizeFirstLetter(store?.restaurant_name)}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{RiderStatus(status, rider_data?.rider_details?.name, order?.is_preorder?"Pre-Order" :"Food Item")}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">RM {paid_price?.toFixed(2)}</TableCell> 
                          <TableCell align="left">{order?.is_preorder?"Pre-Order" :"Food Item"}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{LowerCase(status)}</TableCell> 
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY HH:mm a">{created_at}</Moment>
                          </TableCell>   
                          <TableCell className= {classes.tableCell}  align="right">
                             <OrderMoreMenu id = {id} /> 
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
              filteredUsers.length === 0 || filteredUsers.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </>}
      </Card>
      </Container>
    </Page>
  );
}
