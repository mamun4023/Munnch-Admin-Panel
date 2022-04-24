import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

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
  TablePagination,
  Switch,
  Box
} from '@mui/material';
// components
import Page from '../components/Page';
import Spinner from 'src/components/Spinner';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { MerchantListHead, MerchantListToolbar, MerchantMoreMenu } from '../sections/@dashboard/merchant';
import Iconify from '../components/Iconify';
import {FetchMerchantList} from '../redux/merchant/fetchAll/action';
import {StatusToggler} from '../redux/merchant/statusToggler/action';
import {ApprovalToggler} from '../redux/merchant/aprovalToggler/action';

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
    label: 'EMAIL', 
    id: 'email',
    alignRight: false 
  },
  { 
    label: 'PHONE', 
    id: 'phone',
    alignRight: false 
  },
  { 
    label: 'STATUS', 
    id: 'status',
    alignRight: false 
  },
  { 
    label: 'APPROVAL', 
    id: 'approval',
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
    return filter(array, (_user) => _user.personal_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Merchant() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [merchantStatus, setMerchantStatus] = useState("1")


  const ActiveStatusHandler = ()=>{
    setMerchantStatus("1");
    setPage(1);
    setRowsPerPage(5)
    orderBy('asc');
  }

  const InactiveStatusHandler = ()=>{
    setMerchantStatus("0");
    setPage(1);
    setRowsPerPage(5)
    orderBy('asc');
  }

  useEffect(()=>{
    dispatch(FetchMerchantList(merchantStatus, filterName, page, rowsPerPage, order));
  },[merchantStatus, filterName, page, rowsPerPage, order])

  const MerchantList = useSelector(state => state.FetchMerchantList.data)
  const loading = useSelector(state => state.FetchMerchantList.loading);
  console.log("Merchant Data", MerchantList);

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

  const filteredUsers = applySortFilter(MerchantList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const StatusToggleHandler = (id) => {
    dispatch(StatusToggler(id))
    setTimeout(()=>{
      dispatch(FetchMerchantList(merchantStatus, filterName, page, rowsPerPage, order));
    }, 1000)
  }

  const ApprovalToggleHandler = (id) => {
    dispatch(ApprovalToggler(id));
  }

  return (
    <Page title="Munchh | Merchant">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Merchant Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/merchant/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Merchant
          </Button>
        </Stack>
        <Card>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <MerchantListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} > 
                <Button
                    variant= {merchantStatus === "1"? "contained": null}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                    variant= {merchantStatus === "0"? "contained": null}
                    onClick = {InactiveStatusHandler}
                >Inactive</Button> 
              </div>
          </div>
        {loading?<Spinner/> : <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <MerchantListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id, personal_name, email, phone, status, is_verified } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{personal_name}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            <Switch 
                               onClick={()=> StatusToggleHandler(id)}
                               defaultChecked = {status == 1?true: false}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Switch
                              onClick={()=> ApprovalToggleHandler(id)}
                              defaultChecked = {is_verified == 1?true: false}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <MerchantMoreMenu id = {id} />
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
        </Box> }
        </Card>
      </Container>
    </Page>
  );
}
