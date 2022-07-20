import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'react-moment';

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
  Box,
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
import { MenuListHead, MenuListToolbar, MenuMoreMenu } from '../sections/@dashboard/menuItem';
import {FetchMenuList} from '../redux/menu/fetchAll/action';
import {StockToggler} from '../redux/menu/stockToggler/action';
import {BestSellerToggler} from '../redux/menu/bestSellerToggler/action';
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
    label: 'PRICE', 
    id: 'price', 
    alignRight: false 
  },
  { 
    label: 'DESCRIPTION', 
    id: 'description', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'createdAt', 
    alignRight: false 
  },
  { 
    label: 'ITEM TYPE', 
    id: 'itemType', 
    alignRight: false 
  },
  { 
    label: 'IN STOCK', 
    id: 'inStock', 
    alignRight: false 
  },
  { 
    label: 'BEST SELLER', 
    id: 'bestSeller', 
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

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function MenuItem() {
  const {id} = useParams();
  const storeId = id;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuData, setMenuData] = useState([]);
  const [menuStatus, setMenuStatus] = useState("true");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.FetchAllMenu.loading);

  useEffect(()=>{
    dispatch(FetchMenuList(storeId,filterName, page, rowsPerPage, order ))
  },[dispatch, storeId, filterName, page, rowsPerPage, order])

  const MenuList = useSelector(state => state.FetchAllMenu.data);
  console.log("menu item data", MenuList)

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

  const filteredItems = applySortFilter(MenuList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredItems.length === 0;

  const StockTogglerHandler =(id)=>{
      dispatch(StockToggler(id))
  }

  const BestSellerTogglerHandler = (id)=>{
    dispatch(BestSellerToggler(id))
  }

  return (
    <Page title="Munchh | Menu Item">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
              Menu Item Management
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to= {`/dashboard/merchant/menu/create/${id}`}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Item
          </Button>
        </Stack>
        <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <MenuListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              {/* <div>
                <Button
                    variant= {menuStatus === "true"? "contained": null}
                    onClick = {()=> setMenuStatus("true")}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {menuStatus === "false"? "contained": null}
                   onClick = {()=> setMenuStatus("false")}
                   disableElevation
                >Inactive</Button> 
              </div> */}
          </div>

        {loading? <Spinner/> : <Box>  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1500 }}>
              <Table>
                <MenuListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredItems
                    .map((row) => {
                      const { id, name, image, price, food_item_type, in_stock, description, best_seller, created_at} = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{CapitalizeFirstLetter(name)}</TableCell>
                          <TableCell align="left">
                            <Avatar  variant="square" style={{width : "70px"}} src= {image} />
                          </TableCell>
                          
                          <TableCell align="left">RM {price}  </TableCell>
                          
                          <TableCell align="left" sx={{ maxWidth: 300 }}>
                             {CapitalizeFirstLetter(description)}
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD-MM-YYYY HH:mm a" >{created_at}</Moment> 
                          </TableCell>
                          <TableCell align="left">{food_item_type}</TableCell>
                          <TableCell align="left">
                           <Switch
                              onChange={()=>StockTogglerHandler(id)}
                              defaultChecked={in_stock === 1?true : false}
                           />  
                          </TableCell>
                          <TableCell align="left">
                            <Switch
                                onChange={()=>BestSellerTogglerHandler(id)}
                                defaultChecked={best_seller === 1?true : false}
                            />  
                          </TableCell>   
                          <TableCell align="right">
                            <MenuMoreMenu 
                              id = {id}
                              storeId = {storeId}
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
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
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
              filteredItems.length === 0 || filteredItems.length < rowsPerPage? {disabled: true} : undefined
            }
          />
      </Box>} 
        </Card>
      </Container>
    </Page>
  );
}
