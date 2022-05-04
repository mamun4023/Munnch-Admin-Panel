import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment'

// material
import {
  Card,
  Table,
  Stack,
  Box,
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
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import Spinner from 'src/components/Spinner';
import { NotifyListHead, NotifyListToolbar, NotifyMoreMenu } from '../sections/@dashboard/notify';
import {FetchNotification} from '../redux/notify/fetchAll/action';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'TITLE',
    id: 'title', 
    alignRight: false 
  },
  { 
    label: 'USER TYPE', 
    id: 'userType', 
    alignRight: false 
  },
  { 
    label: 'MESSAGE', 
    id: 'message', 
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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


function ReduceMessage(data){
  let arr = data.split('');
  let reducer , message;
  if(arr.length > 50){
    reducer = arr.slice(1, 50);
    message = reducer.join('');
    return message+" ...";
  }
  // reducer = arr.slice(1, 30);
  message = arr.join('');
  return message
}

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export default function Notification() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const loading = useSelector(state =>state.FetchNotificationList.loading)

  useEffect(()=>{
    dispatch(FetchNotification(filterName, page, rowsPerPage, order))
  },[filterName, page, rowsPerPage, order])

  const NotificationList = useSelector(state => state.FetchNotificationList.data)

  // console.log("Notification Data", NotificationList);

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

  const filteredUsers = applySortFilter(NotificationList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Munchh | Notify">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Notification Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/notify/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Notification
          </Button>
        </Stack>
        <Card>
          <NotifyListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
        {loading? <Spinner/> : <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1700 }}>
              <Table>
                <NotifyListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .map((row) => {
                      const { id, title,user_type_name, message, created_at  } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{ capitalizeFirstLetter(user_type_name)}</TableCell>
                          <TableCell align="left">
                              {message}
                            </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY HH:mm a" >{created_at}</Moment>
                          </TableCell>
                          <TableCell align="right">
                            {/* <NotifyMoreMenu /> */}
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
