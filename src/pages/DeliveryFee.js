import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Card, Table, Stack, Button, TableRow, TableBody, Box, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { DeliveryListHead, DeliveryListToolbar, DeliveryMoreMenu } from '../sections/@dashboard/deliveryFee';
import Spinner from '../components/Spinner';
import {DeliveryFeeList} from '../redux/deliveryFee/fetchAll/action';

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'DELIVERY RANGE ', 
    id: 'deliveryRange', 
    alignRight: false 
  },
  { 
    label: 'DELIVERY FEE', 
    id: 'deliveryFee', 
    alignRight: false 
  },

  { 
    label: 'UPDATED AT', 
    id: 'updateAt', 
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

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.range.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function DeliveryFee() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.DeliveryFee.loading);

  useEffect(()=>{
    dispatch(DeliveryFeeList(filterName, page, rowsPerPage, order))
  },[dispatch, filterName, page, rowsPerPage, order])

  const FeeList = useSelector(state => state.DeliveryFee.data);
  // console.log("Fee list", FeeList)

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

  // const filteredFee = applySortFilter(FeeList, getComparator(order, orderBy), filterName);
  const isUserNotFound = FeeList.length === 0;

  return (
    <Page title="Munchh | Delivery Fee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Delivery Fee Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/delivery_fee/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Range
          </Button>
        </Stack>
        <Card>
          <DeliveryListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
        {loading? <Spinner/> : <Box> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DeliveryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {FeeList
                    .map((row) => {
                      const { id, range, fee, updated_at,  created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{range+ " KM"}</TableCell>
                          <TableCell align="left">{fee + " RM"}</TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{updated_at}</Moment> 
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> 
                          </TableCell>   
                          <TableCell align="right">
                            <DeliveryMoreMenu 
                              id = {id}
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
              page === 1 ? {disabled: true} : undefined
            }
            nextIconButtonProps={
              FeeList.length === 0 || FeeList.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}  
        </Card>
      </Container>
    </Page>
  );
}
