import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { IconButton, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { CSVLink } from 'react-csv';
import Moment from 'react-moment';
import moment from 'moment';
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
import {FetchMerchantTransactionList} from '../../../redux/transactionHistory/merchant/action';
import {MerchantStatusToggler} from '../../../redux/withdraw/ApproveToggler/actions';
import Spinner from 'src/components/Spinner';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'ORDER ID', 
    id: 'orderID', 
    alignRight: false 
  },
  { 
    label: 'REFERENCE NUMBER',
    id: 'referenceNumber', 
    alignRight: false 
  },
  { 
    label: 'PAYMENT STATUS',
    id: 'referenceNumber', 
    alignRight: false 
  },
  { 
    label: 'PAYMENT MODE',
    id: 'referenceNumber', 
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
    return filter(array, (_user) => _user.bill_plz_payment?.bill_id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CapitalizedLetter (s){
  if (typeof s !== 'string') return ''
  return s.toUpperCase()
}

function LowerCase (s){
  if (typeof s !== 'string') return ''
  var removeUnderScore = s.replace(/_/g, "");
  let makeLowerCase =  removeUnderScore.toLowerCase();
  return makeLowerCase.charAt(0).toUpperCase() + makeLowerCase.slice(1)
}


export default function Withdrawal() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.MerchantTransaction.loading);

  useEffect(()=>{
    dispatch(FetchMerchantTransactionList(filterName, page, rowsPerPage, order));
  },[filterName, page, rowsPerPage, order])

  const TransactionList = useSelector(state => state.MerchantTransaction.data);

  let csvDATA = [];

  TransactionList?.forEach(data => {
    let obj = {
      id : data.id,
      orderId : data.order?.id,
      referenceNumber : data.bill_plz_payment?.bill_id,
      paymentStatus : LowerCase(data.order?.status),
      paymentMode : data.bill_plz_payment? "BillPlz" : "Wallet",
      date :  moment(data.bill_plz_payment?.created_at).format("DD-MM-YYYY hh:mm a")
    }
    csvDATA.push(obj)
  })


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

  const filteredTransaction = applySortFilter(TransactionList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredTransaction.length === 0;

  const StatusChangeHandler = (id) => {
    dispatch(MerchantStatusToggler(id))
  }

  
  const headers = [
    { label: "ID", key: "id" },
    { label: "ORDER ID", key: "orderId" },
    { label: "REFERENCE NUMBER",  key: "referenceNumber" },
    { label: "PAYMENT STATUS", key: "paymentStatus"},
    { label: "PAYMENT MODE", key: "paymentMode" },
    { label: "CREATED AT", key: "date" },
  ];


  return (
    <Page title="Munchh | Merchant Transaction">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
           Merchant Transaction History
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
                sx={{marginRight : 10}} 
                color ="primary"
              > 
                <CSVLink
                  headers={headers}
                  filename="transactions.csv"
                  data={csvDATA}>Download CSV</CSVLink>
              </Button>
            </div>
          </div>
          {loading? <Spinner/> :  <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <WithdrawalListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredTransaction
                    .map((row) => {
                      const { id, order, bill_plz_payment, store_withdraw, amount, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{order?.id}</TableCell>
                          <TableCell align="left">{ CapitalizedLetter(bill_plz_payment?.bill_id)}</TableCell>
                          <TableCell align="left">{ LowerCase(order?.status)}</TableCell>
                          <TableCell align="left">{bill_plz_payment?"BillPlz": "--"}</TableCell>
                          
                          {/* <TableCell align="left">{CapitalizeFirstLetter(store_withdraw?.store_bank?.holder_name)}</TableCell> */}
                         
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> 
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
              filteredTransaction.length === 0 || filteredTransaction.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}  
        </Card>
      </Container>
    </Page>
  );
}