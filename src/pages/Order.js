import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton , Button, Switch} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment'
// material
import {
  Card,
  Table,
  Stack,
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
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { OrderListHead, OrderListToolbar, OrderMoreMenu } from '../sections/@dashboard/order';
import {FetchOrderList} from '../redux/order/FetchAllOrder/action';
import Spinner from 'src/components/Spinner';
// ----------------------------------------------------------------------

const Data = [
  {
    "id" : "1",
    "userName" : "Rahul",
    "merchantName" : "Akram",
    "orderPrice" : "20",
    "foodItem" : [],
    "status" : "New",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "2",
    "userName" : "Rohid",
    "merchantName" : "Akram",
    "orderPrice" : "20",
    "foodItem" : [],
    "status" : "Ongoing",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "3",
    "userName" : "Yeasir",
    "merchantName" : "Akram",
    "orderPrice" : "20",
    "foodItem" : [],
    "status" : "Completed",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "5",
    "userName" : "Muskan",
    "merchantName" : "Akram",
    "orderPrice" : "20",
    "foodItem" : [],
    "status" : "Cancelled",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
]

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'NAME', 
    id: 'name', 
    alignRight: false 
  },
  { 
    label: 'ADDRESS', 
    id: 'address', 
    alignRight: false 
  },
  { 
    label: 'PRICE', 
    id: 'orderPrice',
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
    return filter(array, (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Order() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderData, setOrderData] = useState([]);
  const [orderStatus, setOrderStatus] = useState("new");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.OrderList.loading);


  const FetchOrder = (orderStatus)=>{
    // return data from api
    setOrderData(Data);
  }

  useEffect(()=>{
    // FetchOrder(orderStatus
    dispatch(FetchOrderList(page, rowsPerPage, order))
  },[page, rowsPerPage, order])

  const OrderList = useSelector(state => state.OrderList.data);


  console.log("Order Data", OrderList);


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
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
                <div style={{ marginTop : "25px" }} >
                  <Button
                      variant= {orderStatus === "new"? "contained": null}
                      onClick = {()=> setOrderStatus("new")}
                      disableElevation
                  >New</Button>

                  <Button
                    variant= {orderStatus === "ongoing"? "contained": null}
                    onClick = {()=> setOrderStatus("ongoing")}
                    disableElevation
                  >Ongoing</Button>

                   <Button
                    variant= {orderStatus === "completed"? "contained": null}
                    onClick = {()=> setOrderStatus("completed")}
                    disableElevation
                  >Completed</Button>

                   <Button
                    variant= {orderStatus === "cancelled"? "contained": null}
                    onClick = {()=> setOrderStatus("cancelled")}
                    disableElevation
                  >Cancelled</Button>    
                </div>
            </div>

          {loading? <Spinner/> : <> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={Data.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id,  paid_price, customer, merchantName, address, status, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        > 
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{customer?.name}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{paid_price}</TableCell> 
                          <TableCell align="left">
                            <Switch 
                              defaultChecked = {status}
                            />

                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY HH:mm a" >{created_at}</Moment>
                          </TableCell>   
                          <TableCell align="right">
                            {/* <Tooltip title = "View Order" > 
                            
                             </Tooltip> */}
                            {/* <MerchantMoreMenu /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}

                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
              page == 1 ? {disabled: true} : undefined
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
