import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Moment from 'react-moment';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Switch
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import {FetchUserList} from '../redux/user/fetch/action';
import {Toggler} from '../redux/user/toggler/action';
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
    label: 'IMAGE',
    id: 'image',
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
    label: 'REFUND WALLET BALANCE',
    id: 'balance',
    alignRight: false
  },

  {
    label: 'REGISTER AT',
    id: 'registerAt',
    alignRight: false
  },
  {
    label: 'STATUS',
    id: 'status',
    alignRight: false
  }
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

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Banner() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userStatus, setUserStatus] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.FetchUsers.loading)

  const ActiveStatusHandler = ()=>{
    setUserStatus("1");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  const InactiveStatusHandler = ()=>{
    setUserStatus("0");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  useEffect(()=>{
    dispatch(FetchUserList(userStatus,filterName, page, rowsPerPage, order))
  }, [userStatus, filterName, page, rowsPerPage, order])

  const userList = useSelector(state=> state.FetchUsers.data);
  console.log("user Data", userList);

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

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;


  const toggleHandler = (id) => {
    dispatch(Toggler(id))
    setTimeout(()=>{
      dispatch(FetchUserList(userStatus, filterName, page, rowsPerPage, order))
    }, 1000)
  }

  return (
    <Page title="Munchh | Banner">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          {/* <Button
            variant='contained'
            component={RouterLink}
            to="/dashboard/banner/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Banner
          </Button> */}
        </Stack>
        <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <UserListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} >
                <Button
                    variant= {userStatus === "1"? "contained": null}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {userStatus === "0"? "contained": null}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div>

         {loading? <Spinner/> : <Box>  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1200 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id, name, email, profile_image, phone, wallet_data, status, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{CapitalizeFirstLetter(name)}</TableCell>
                          <TableCell align="left">
                            <Avatar  variant="square" style={{width : "70px"}} src= {profile_image} />
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">RM {wallet_data? wallet_data?.balance : "0"}</TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment>
                          </TableCell>
                          <TableCell align="right" >
                            <Tooltip title = "Change Status" > 
                              <Switch 
                                onClick={()=> toggleHandler(id)}
                                defaultChecked = {status == 1?true: false}
                              />
                            </Tooltip> 
                          </TableCell>
                          
                         
                          {/* <TableCell align="right">
                            <UserMoreMenu 
                              id = {id}
                              status = {bannerStatus}
                              filter = {filterName}
                              page = {page}
                              limit = {rowsPerPage}
                              order = {order} 
                            />
                          </TableCell> */}
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