import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Table, Stack, Button, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ContactListHead, ContactListToolbar, ContactMoreMenu } from '../sections/@dashboard/contact';
import {FetchContactList} from '../redux/contact/fetchList/action';

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'CUSTOMER ID', 
    id: 'customerId', 
    alignRight: false 
  },
  { 
    label: 'USER TYPE ', 
    id: 'userType', 
    alignRight: false 
  },
  { 
    label: 'EMAIL', 
    id: 'email', 
    alignRight: false 
  },
  { 
    label: 'MESSAGE ', 
    id: 'message', 
    alignRight: false 
  },
  { 
    label: 'UPDATED AT', 
    id: 'createAt', 
    alignRight: false 
  },
  { 
    label: 'CREATED AT', 
    id: 'updateAt', 
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

export default function Contact() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contactStatus, setContactStatus] = useState("1");
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(FetchContactList(contactStatus, filterName, page, rowsPerPage, order))
  },[contactStatus, filterName, rowsPerPage, page, order])

  const ContactList = useSelector(state => state.ContactList);

  console.log("Contact list", ContactList)

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

  return (
    <Page title="Munchh | Contact">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Contact Us Management
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
                    variant= {contactStatus === "1"? "contained": null}
                    onClick = {ActiveStatusHandler}
                    disableElevation
                >Active</Button>
                <Button
                   variant= {contactStatus === "0"? "contained": null}
                   onClick = {InactiveStatusHandler}
                   disableElevation
                >Inactive</Button> 
              </div>
          </div>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
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
                      const { id, userName, userType, email, message, created_at,  updated_at } = row;
                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{userName}</TableCell>
                          <TableCell align="left">{message}</TableCell>
                          <TableCell align="left">{updated_at}</TableCell>
                          <TableCell align="left">{created_at}</TableCell>   
                          <TableCell align="right">
                            <ContactMoreMenu />
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
              filteredContact.length === 0 || filteredContact.length < rowsPerPage? {disabled: true} : undefined
            }
          />
        </Card>
      </Container>
    </Page>
  );
}
