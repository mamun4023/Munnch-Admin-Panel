import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { IconButton, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  Switch,
  Avatar,
  TableBody,
  TableCell,
  Box,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { WithdrawalListHead, WithdrawalListToolbar, WithdrawalMoreMenu } from './index';
import {toast} from 'material-react-toastify';
import {FetchUserTransactionList} from '../../../redux/transactionHistory/User/action';
import {UserStatusToggler} from '../../../redux/withdraw/ApproveToggler/actions';
import Spinner from 'src/components/Spinner';

// ----------------------------------------------------------------------

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
    label: 'PROFILE IMAGE', 
    id: 'image', 
    alignRight: false 
  },
  { 
    label: 'EMAIL',
    id: 'email', 
    alignRight: false 
  },
  { 
    label: 'PHONE NUMBER',
    id: 'phone_number', 
    alignRight: false 
  },
  { 
    label: 'AMOUNT', 
    id: 'amount',
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'date', 
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


function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export default function Withdrawal() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [withdrawalStatus, setWithdrawalStatus] = useState("requested");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.UserTransaction.loading);

  useEffect(()=>{
    dispatch(FetchUserTransactionList(filterName, page, rowsPerPage, order));
  },[filterName, page, rowsPerPage, order])

  const TransactionList = useSelector(state => state.UserTransaction.data);

  console.log("TransactionList Data", TransactionList)

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

  const filteredUsers = applySortFilter(TransactionList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const StatusChangeHandler = (id) => {
    dispatch(UserStatusToggler(id))
  }

  return (
    <Page title="Munchh | User Transaction">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
           User Transaction History
          </Typography>
        </Stack>
        <Card>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              <WithdrawalListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
            {/* <div style={{ marginTop : "25px" }}>
              <Button
                variant={withdrawalStatus === "requested" ? "contained" : null}
                onClick={() => setWithdrawalStatus("requested")}
                disableElevation
              // style={ userStatus === "acitve"? { backgroundColor : "#636e72" }:null}
              >Requested</Button>
              <Button
                variant={withdrawalStatus === "approved" ? "contained" : null}
                onClick={() => setWithdrawalStatus("approved")}
                disableElevation
              >Approved</Button>
            </div> */}
          </div>
          
          {loading? <Spinner/> :  <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1200 }}>
              <Table>
                <WithdrawalListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id, customer, is_withdrawn, store_bank, amount, created_at } = row;
      
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{customer?.name}</TableCell>
                          <TableCell align="left">
                             <Avatar  variant="square" style={{width : "70px"}} src= {customer?.profile_image} />
                          </TableCell>
                          <TableCell align="left">{CapitalizeFirstLetter(customer?.email)}</TableCell>
                          <TableCell align="left">{customer?.phone}</TableCell>
                          <TableCell align="left">RM {amount}</TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{customer?.created_at}</Moment> 
                          </TableCell>   
              
                          <TableCell align="right">
                            {/* <MerchantMoreMenu /> */}
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
              page == 1 ? {disabled: true} : undefined
            }
            nextIconButtonProps={
              filteredUsers.length === 0 || filteredUsers.length < rowsPerPage? {disabled: true} : undefined
            }
          />
          
        </Box>}  
        </Card>
      </Container>
    </Page>
  );
}