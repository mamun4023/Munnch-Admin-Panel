import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Moment from 'react-moment';
import { makeStyles } from "@mui/styles";
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
  Box,
  Switch
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { BannerListHead, BannerListToolbar, BannerMoreMenu } from '../sections/@dashboard/banner';
import {FetchBannerList} from '../redux/banner/fetchAll/action';
import {StatusToggler} from '../redux/banner/statusToggler/action';
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
    label: 'TITLE', 
    id: 'banerName', 
    alignRight: false 
  },
  { 
    label: 'IMAGE', 
    id: 'image', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'createdAt', 
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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CapitalizeFirstLetter (s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Banner() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bannerStatus, setBannerStatus] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.FetchBannerList.loading)

  const ActiveStatusHandler = ()=>{
    setBannerStatus("1");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  const InactiveStatusHandler = ()=>{
    setBannerStatus("0");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  useEffect(()=>{
    dispatch(FetchBannerList(bannerStatus,filterName, page, rowsPerPage, order))
  }, [dispatch, bannerStatus, filterName, page, rowsPerPage, order])

  const BannerList = useSelector(state=> state.FetchBannerList.data);

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

  const filteredBanners = applySortFilter(BannerList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredBanners.length === 0;

  const StatusToggleHandler = (id)=>{
    dispatch(StatusToggler(id))

    setTimeout(()=>{
      dispatch(FetchBannerList(bannerStatus, filterName, page, rowsPerPage))
    },1000)
  }

  return (
    <Page title="Munchh | Banner">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Banner Management
          </Typography>
          <Button
            variant='contained'
            component={RouterLink}
            to="/dashboard/banner/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Banner
          </Button>
        </Stack>
        <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <BannerListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} >
                <Button
                    variant= {bannerStatus === "1"? "contained": null}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {bannerStatus === "0"? "contained": null}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div>
          
         {loading? <Spinner/> : <Box>  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table 
                
              >
                <BannerListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredBanners
                    .map((row) => {
                      const { id, title, image,url, is_enabled, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell className= {classes.tableCell} align="left">{id}</TableCell>
                          <TableCell className= {classes.tableCell} align="left">{CapitalizeFirstLetter(title)}</TableCell>
                          <TableCell className= {classes.tableCell} align="left">
                            <Avatar  variant="square" style={{width : "70px"}} src= {image != null? image : url} />
                          </TableCell>
                          <TableCell className= {classes.tableCell} align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell} align="left">
                             <Switch 
                              onClick={()=> StatusToggleHandler(id)}
                              defaultChecked = {is_enabled}
                            />
                            </TableCell>
                          <TableCell className= {classes.tableCell} align="right">
                            <BannerMoreMenu 
                              id = {id}
                              status = {bannerStatus}
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
              filteredBanners.length === 0 || filteredBanners.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}  
        </Card>
      </Container>
    </Page>
  );
}
