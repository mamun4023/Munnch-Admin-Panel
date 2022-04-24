import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { IconButton, Button } from '@mui/material';
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
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { WithdrawalListHead, WithdrawalListToolbar, WithdrawalMoreMenu } from '../sections/@dashboard/withdrawal';
import {toast} from 'material-react-toastify';

// ----------------------------------------------------------------------

const Data = [
  {
    "id" : "1",
    "name" : "Tohid",
    "bankName" : "Federal USA",
    "accountNumber" : "45511256442",
    "amount" : "120",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "2",
    "name" : "Tohid",
    "bankName" : "Federal USA",
    "accountNumber" : "45511256442",
    "amount" : "120",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "3",
    "name" : "Tohid",
    "bankName" : "Federal USA",
    "accountNumber" : "45511256442",
    "amount" : "120",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
  {
    "id" : "4",
    "name" : "Tohid",
    "bankName" : "Federal USA",
    "accountNumber" : "45511256442",
    "amount" : "120",
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
    label: ' Merchant name', 
    id: 'name', 
    alignRight: false 
  },
  { 
    label: 'Bank Name', 
    id: 'SSMNumber', 
    alignRight: false 
  },
  { 
    label: 'Account number', 
    id: 'email',
    alignRight: false 
  },
  { 
    label: 'Account', 
    id: 'amount',
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Withdrawal() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [withdrawalStatus, setWithdrawalStatus] = useState("requested")

  const FetchWithdrawal = (withdrawalStatus)=>{
    // return data from api
    setWithdrawalData(Data);
  }

  useEffect(()=>{
    FetchWithdrawal(withdrawalStatus);
  },[withdrawalStatus])

  console.log("withdrawal Data", withdrawalData)

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
  const filteredUsers = applySortFilter(withdrawalData, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const ToggleHandler = () => {
    toast.dark("Withdraw has been Approved");
  }

  return (
    <Page title="Munchh | Withdrawal">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Withdrawal Management
          </Typography>
        </Stack>
        <Card>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              <WithdrawalListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
            <div style={{ marginTop : "25px" }}>
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
            </div>
          </div>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <WithdrawalListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, bankName, accountNumber, amount, createAt } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
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
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{bankName}</TableCell>
                          <TableCell align="left">{accountNumber}</TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">{createAt}</TableCell>   
                          <TableCell align="right">
                            <Tooltip title = "Approve Withdrawal" > 
                              <IconButton
                                onClick={ToggleHandler}
                                style = {{background : "#1e272e", color : "white"}}
                              > 
                                <Iconify icon="file-icons:pullapprove" width={24} height={24} />
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