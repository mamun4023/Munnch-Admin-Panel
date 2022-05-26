import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {toast} from 'material-react-toastify';
import {Link as RouterLink } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
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
import SearchNotFound from '../components/SearchNotFound';
import { TransactionListHead, TransactionToolbar } from '../sections/@dashboard/transactionHistory';
import Iconify from '../components/Iconify';
// ----------------------------------------------------------------------

const Data = [
  { 
    "id" : "1",
    "Orderid" : "1045112214",
    "referenceNumber" : "45512254788",
    "paymentStatus" : true,
    "paymentMode" : "online",
    "paymentFailed" : "No",
    "createAt" : "3/4/2022"
  },
  { 
    "id" : "2",
    "Orderid" : "1045112214",
    "referenceNumber" : "45512254788",
    "paymentStatus" : true,
    "paymentMode" : "online",
    "paymentFailed" : "No",
    "createAt" : "3/4/2022"
  },
  { 
    "id" : "3",
    "Orderid" : "1045112214",
    "referenceNumber" : "45512254788",
    "paymentStatus" : true,
    "paymentMode" : "online",
    "paymentFailed" : "No",
    "createAt" : "3/4/2022"
  },
  { 
    "id" : "4",
    "Orderid" : "1045112214",
    "referenceNumber" : "45512254788",
    "paymentStatus" : false,
    "paymentMode" : "online",
    "paymentFailed" : "No",
    "createAt" : "3/4/2022"
  }
]


const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'Order ID', 
    id: 'orderId', 
    alignRight: false 
  },
  { 
    label: 'Reference Number', 
    id: 'name', 
    alignRight: false 
  },


  { 
    label: 'Payment mode', 
    id: 'paymentMode', 
    alignRight: false 
  },
  { 
    label: 'Payment Status', 
    id: 'paymentStatus', 
    alignRight: false 
  },
  // { 
  //   label: 'Payment Failed', 
  //   id: 'paymentFailed', 
  //   alignRight: false 
  // },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Merchant() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [merchantData, setMerchantData] = useState([]);
  const [merchantStatus, setMerchantStatus] = useState("active")

  const FetchMerchant = (merchantStatus)=>{
     // return data from API
     setMerchantData(Data);
  }

  useEffect(()=>{
    FetchMerchant();
  },[merchantStatus])

  console.log("Merchant Data", merchantData);

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
  const filteredUsers = applySortFilter(Data, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const ToggleHandler = () => {
    toast.dark("Merchant has been disabled");
  }

  return (
    <Page title="Munchh | Transaction">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Transaction History Management
          </Typography>
        </Stack>
        <Card>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <TransactionToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} > 
                {/* <Button
                    variant= {merchantStatus === "active"? "contained": null}
                    onClick = {()=> setMerchantStatus("active")}
                    disableElevation
                >Active</Button>
                <Button
                    variant= {merchantStatus === "inactive"? "contained": null}
                    onClick = {()=> setMerchantStatus("inactive")}
                >Inactive</Button>  */}
              </div>
          </div>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TransactionListHead
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
                      const {id, Orderid, referenceNumber, paymentStatus, paymentMode, createAt } = row;
                      const isItemSelected = selected.indexOf(Orderid) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          // tabIndex={-1}
                          // role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{Orderid}</TableCell>
                           <TableCell align="left">{referenceNumber}</TableCell>
                          <TableCell align="left">{paymentMode}</TableCell>
                          <TableCell align="left">   {paymentStatus?<Button color='success'> Approved</Button>: <Button color='error' > Pending </Button>} </TableCell>
                          <TableCell align="left">{createAt}</TableCell>
                          <TableCell align="right">
                             {/* <Tooltip title = "Disable Merchant" > 
                              <IconButton
                                onClick={ToggleHandler}
                                style = {{background : "#1e272e", color : "white"}}
                              > 
                                <Iconify icon="eva:person-delete-fill" width={24} height={24} />
                              </IconButton>
                             </Tooltip>  */}
                            {/* <MerchantMoreMenu verified = {true} /> */}
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
