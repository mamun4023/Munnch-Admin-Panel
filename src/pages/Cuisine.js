import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';
import { makeStyles} from '@mui/styles';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
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
import { CuisineListHead,  CuisineListToolbar, CuisineMoreMenu } from '../sections/@dashboard/Cuisine';
import {FetchCuisineList} from '../redux/cuisine/fetchAll/action';
import {Toggler} from '../redux/cuisine/toggler/action';
import { Box } from '@mui/system';
import Spinner from 'src/components/Spinner';
// ----------------------------------------------------------------------

const useStyles = makeStyles({
  tableCell: {
    padding: "10px 16px",
  }
});

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'CUISINE NAME', 
    id: 'cuisine_name', 
    alignRight: false 
  },
  { 
    label: 'IMAGE ', 
    id: 'image', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT ', 
    id: 'createdAt', 
    alignRight: false 
  },
  { 
    label: 'POPULARITY ', 
    id: 'popularity', 
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
    return filter(array, (_user) => _user.cuisine_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Cuisine() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    dispatch(FetchCuisineList(filterName, page, rowsPerPage, order))
  }, [dispatch, filterName, page, rowsPerPage, order ])

  const CuisineList = useSelector(state => state.FetchCuisineList.data)
  const loading = useSelector(state => state.FetchCuisineList.loading);

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

const filteredCuisine = applySortFilter(CuisineList, getComparator(order, orderBy), filterName);
const isUserNotFound = filteredCuisine.length === 0;

const PopularToggleHandler = (id)=>{
  dispatch(Toggler(id))
}

  return (
    <Page title="Munchh | Cuisine">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Cuisine Management
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/cuisine/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Cuisine
          </Button>
        </Stack>
        <Card>
        <Box>  
          <CuisineListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
      
        {loading? <Spinner/>: <Box>  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CuisineListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredCuisine
                    .map((row) => {
                      const { id, cuisine_name, image, created_at, is_popular } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell className= {classes.tableCell} align="left">{id}</TableCell>
                          <TableCell className= {classes.tableCell} align="left">{CapitalizeFirstLetter(cuisine_name)}</TableCell>
                          <TableCell className= {classes.tableCell} align="left"> 
                            <Avatar  variant="square" style={{width : "70px"}} src= {image} />
                          </TableCell>
                          <TableCell className= {classes.tableCell} align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment> 
                          </TableCell>
                          <TableCell className= {classes.tableCell} align="left">
                            <Switch
                              onClick={()=> PopularToggleHandler(id)}
                              defaultChecked = {is_popular === 1?true: false}
                            />
                          </TableCell>
                          <TableCell className= {classes.tableCell} align="right">
                            <CuisineMoreMenu 
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
              filteredCuisine.length === 0 || filteredCuisine.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>} 
        </Box>
        </Card>
      </Container>
    </Page>
  );
}
