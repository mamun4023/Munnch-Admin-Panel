import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Box,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Switch
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { BannerListHead, BannerListToolbar, BannerMoreMenu } from '../sections/@dashboard/bank';
import {FetchBankList} from '../redux/bank/fetchAll/action';
import {PopularToggler} from '../redux/bank/popularToggler/action';
import {StatusToggler} from '../redux/bank/statusToggler/action';
import Spinner from 'src/components/Spinner';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'BANK NAME', 
    id: 'banerName', 
    alignRight: false 
  },
  // { 
  //   label: 'SWIFT CODE', 
  //   id: 'swift_code', 
  //   alignRight: false 
  // },
  
  { 
    label: 'BANK LOGO', 
    id: 'image', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'createdAt', 
    alignRight: false 
  },
  { 
    label: 'POPULARITY', 
    id: 'popularity', 
    alignRight: false 
  },

  { 
    label: 'STATUS', 
    id: 'status', 
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

export default function Banner() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bankStatus, setBankStatus] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.FetchBankList.loading);

  const ActiveStatusHandler =()=>{
    setBankStatus("1");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  const InactiveStatusHandler = ()=>{
    setBankStatus("0")
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  useEffect(()=>{
    dispatch(FetchBankList(bankStatus, filterName, page, rowsPerPage, order))
  }, [bankStatus, filterName, page, rowsPerPage, order])

  const BankList = useSelector(state => state.FetchBankList.data)
  // console.log("Banner Data", BankList);

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

  const filteredUsers = applySortFilter(BankList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;


  const StatusTogglerHandler = (id)=>{
    dispatch(StatusToggler(id))
    setTimeout(()=>{
      dispatch(FetchBankList(bankStatus, filterName, page, rowsPerPage, order))
    },1000)
  }

  const PopularTogglerHandler = (id)=>{
    dispatch(PopularToggler(id))
  }

  return (
    <Page title="Munchh | Bank">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Bank Management
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to="/dashboard/bank/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Bank
          </Button>
        </Stack>
        <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <BannerListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} >
                <Button
                    variant= {bankStatus === "1"? "contained": null}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {bankStatus === "0"? "contained": null}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div>
        {loading? <Spinner/> : <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BannerListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id, name, image, is_popular, is_enabled,created_at, updated_at } = row;
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
                          <TableCell align="left">
                            <Avatar  variant="square" style={{width : "70px"}} src= {image} />
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> 
                          </TableCell>
                          <TableCell align="left">
                            <Switch 
                              onChange={()=> PopularTogglerHandler(id)}
                              defaultChecked = {is_popular?is_popular:is_popular}
                            />  
                          </TableCell>   
                          <TableCell align="left">
                            <Switch 
                              onChange={()=> StatusTogglerHandler(id)}
                              defaultChecked = {is_enabled?is_enabled: is_enabled}
                              
                            />  
                          </TableCell>
                          <TableCell align="right">
                            <BannerMoreMenu 
                              id = {id}
                              status = {bankStatus}
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
        </Box>}    
        </Card>
      </Container>
    </Page>
  );
}
