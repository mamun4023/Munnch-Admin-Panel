import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton , Button} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
    label: 'User Name', 
    id: 'userName', 
    alignRight: false 
  },
  { 
    label: 'Merchant Name', 
    id: 'merchantName', 
    alignRight: false 
  },
  { 
    label: 'Price', 
    id: 'orderPrice',
    alignRight: false 
  },
  { 
    label: 'Status', 
    id: 'status',
    alignRight: false 
  },
  { 
    label: 'Created', 
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
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderData, setOrderData] = useState([])
  const [orderStatus, setOrderStatus] = useState("new");



  const FetchOrder = (orderStatus)=>{
    // return data from api
    setOrderData(Data);
  }

  useEffect(()=>{
    FetchOrder(orderStatus)
  })

  console.log("Order Data", orderData);


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
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data.length) : 0;
  const filteredUsers = applySortFilter(orderData, getComparator(order, orderBy), filterName);
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, userName, merchantName, orderPrice, status, createAt } = row;
                      const isItemSelected = selected.indexOf(userName) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        > 
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{userName}</TableCell>
                          <TableCell align="left">{merchantName}</TableCell>
                          <TableCell align="left">{orderPrice}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">{createAt}</TableCell>   
                          <TableCell align="right">
                            <Tooltip title = "View Order" > 
                              <IconButton
                                 component = {RouterLink}
                                 to = "/dashboard/order/view"
                                 style = {{background : "#1e272e", color : "white"}}
                              > 
                                <Iconify icon="carbon:view-filled" width={24} height={24} />
                              </IconButton>
                             </Tooltip>
                            {/* <MerchantMoreMenu /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
            count={Data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
