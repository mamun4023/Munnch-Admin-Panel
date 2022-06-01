import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {toast} from 'material-react-toastify';
import {Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';

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
import Spinner from 'src/components/Spinner';
import { TransactionListHead, TransactionToolbar } from '../sections/@dashboard/transactionHistory';
import {FetchTransactionList} from '../redux/transaction/fetch/action';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'ORDER ID', 
    id: 'orderId', 
    alignRight: false 
  },
  { 
    label: 'REFERENCE NUMBER', 
    id: 'referenceNumber', 
    alignRight: false 
  },
  { 
    label: 'AMOUNT', 
    id: 'amount', 
    alignRight: false 
  },
  { 
    label: 'PAYMENT STATUS', 
    id: 'paymentStatus', 
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Transactions() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userType, setUserType] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.Transaction.loading);

  useEffect(()=>{
    dispatch(FetchTransactionList(userType, filterName, page, rowsPerPage, order))
  },[userType, filterName, page, rowsPerPage, order])

  const TransactionList = useSelector(state => state.Transaction.data)
  // console.log("TransactionList Data", TransactionList);

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

  const filteredUsers = applySortFilter(TransactionList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const ToggleHandler = () => {
    toast.dark("Merchant has been disabled");
  }

  return (
    <Page title="Munchh | Transactions">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Transactions History
          </Typography>
        </Stack>
        <Card>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <TransactionToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} > 
                <Button
                    variant= {userType === "1"? "contained": null}
                    onClick = {()=> setUserType("1")}
                    disableElevation
                >User</Button>
                <Button
                    variant= {userType === "2"? "contained": null}
                    onClick = {()=> setUserType("2")}
                >Merchant</Button> 
              </div>
          </div>
          {loading?<Spinner/>: <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TransactionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const {id, customer, order, amount } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{order?.id}</TableCell>
                          <TableCell align="left">{"Transaction Id"}</TableCell>
                        
                          
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left"> {order?.status} </TableCell>

                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{order?.created_at}</Moment>
                          </TableCell>
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

          </Box>}
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
        </Card>
      </Container>
    </Page>
  );
}
