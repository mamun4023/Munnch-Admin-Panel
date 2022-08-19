import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import Moment from 'react-moment';
import { makeStyles } from '@mui/styles';
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
  Box,
  Switch
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ContactListHead, ContactListToolbar, UserContactMoreMenu } from './index';
import {FetchContactList} from '../../../redux/contact/user/fetchAll/action';
import {StatusToggler} from '../../../redux/contact/statusToggler/action';
import Spinner from 'src/components/Spinner';
import {CapitalizeFirstLetter} from 'src/helperFunctions';
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
    label: 'USER NAME', 
    id: 'userName', 
    alignRight: false 
  },
  { 
    label: 'EMAIL', 
    id: 'email', 
    alignRight: false 
  },
  { 
    label: 'MESSAGE', 
    id: 'message', 
    alignRight: false 
  },
  { 
    label: 'UPDATED AT', 
    id: 'updatedAt', 
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
    return filter(array, (_user) => _user.customer?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Contact() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contactStatus, setContactStatus] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector(state => state.UserContactList.loading)

  const ActiveStatusHandler = ()=>{
    setContactStatus("1");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  const InactiveStatusHandler = ()=>{
    setContactStatus("0");
    setPage(1);
    setRowsPerPage(5);
    setOrder('desc')
  }

  useEffect(()=>{
    dispatch(FetchContactList(contactStatus,filterName, page, rowsPerPage, order))
  }, [contactStatus, filterName, page, rowsPerPage, order])

  const ContactList = useSelector(state=> state.UserContactList.data);

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

  const filteredContact = applySortFilter(ContactList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredContact.length === 0;

  const StatusToggleHandler = (id)=>{
    dispatch(StatusToggler(id))

    setTimeout(()=>{
      dispatch(FetchContactList(contactStatus, filterName, page, rowsPerPage))
    },1000)
  }

  return (
    <Page title="Munchh | Contact">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            User Contact
          </Typography>  
        </Stack>
        <Card>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
              <ContactListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
              <div style={{ marginTop : "25px" }} >
                <Button
                    variant= {contactStatus === "1"? "contained": "outlined"}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {contactStatus === "0"? "contained": "outlined"}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div>
         {loading? <Spinner/> : <Box>  
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1200 }}>
              <Table>
                <ContactListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredContact
                    .map((row) => {
                      const { id, customer , message, status, updated_at, created_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell className= {classes.tableCell}  align="left">{id}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{customer?.name}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left">{customer?.email}</TableCell>
                          <TableCell className= {classes.tableCell}  align="left" sx={{ maxWidth: 300 }}>
                            {CapitalizeFirstLetter(message)}
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{updated_at}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                            <Moment format="DD-MM-YYYY hh:mm a" >{created_at}</Moment>
                          </TableCell>
                          <TableCell className= {classes.tableCell}  align="left">
                             <Switch 
                              onClick={()=> StatusToggleHandler(id)}
                              defaultChecked = {status}
                            />
                            </TableCell>
                          <TableCell className= {classes.tableCell}  align="right">
                            <UserContactMoreMenu 
                              id = {id}
                              status = {contactStatus}
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
              filteredContact.length === 0 || filteredContact.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Box>}  
        </Card>
      </Container>
    </Page>
  );
}
