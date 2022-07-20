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
  Button,
  TableRow,
  TableBody,
  Avatar,
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
import { FoodListHead,  FoodListToolbar, FoodMoreMenu } from '../sections/@dashboard/Food';
import {FetchFoodList} from '../redux/food/fetchAll/action';
import { Box } from '@mui/system';
import Spinner from 'src/components/Spinner';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'FOOD NAME', 
    id: 'name', 
    alignRight: false 
  },
  { 
    label: 'IMAGE', 
    id: 'image', 
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
    return filter(array, (_user) => _user.food_type_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Food() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    dispatch(FetchFoodList(filterName, page, rowsPerPage, order))
  }, [dispatch, filterName, page, rowsPerPage, order])

  const FoodList = useSelector(state => state.FetchFoodList.data)
  const loading = useSelector(state => state.FetchFoodList.loading);

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

  const filteredFood = applySortFilter(FoodList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredFood.length === 0;

  return (
    <Page title="Munchh | Food">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Food Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/food/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Food
          </Button>
        </Stack>
        <Card>
          <FoodListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {loading?<Spinner/>: <Box> 
            <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <FoodListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredFood
                    .map((row) => {
                      const { id, food_type_name, image, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{CapitalizeFirstLetter(food_type_name)}</TableCell>
                          <TableCell> 
                            <Avatar  variant="square" style={{width : "70px"}} src= {image} />
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> 
                          </TableCell>
                          <TableCell align="right">
                            <FoodMoreMenu 
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
              filteredFood.length === 0 || filteredFood.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}
        </Card>
      </Container>
    </Page>
  );
}
