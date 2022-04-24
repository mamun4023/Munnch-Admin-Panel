import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import {Card, Table, Stack, Button, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { ContactListHead, ContactListToolbar, ContactMoreMenu } from '../sections/@dashboard/contact';

const Data = [
  {
    "id" : "1",
    "userName" : "Tohid",
    "userType" : "Merchant",
    "email" : "tohid@gmail.com",
    "message" : "We’re so excited that you’ve decided to purchase ",
    "createAt" : "2/1/2022",
    "updateAt" : "2/1/2022"
  },
]

const TABLE_HEAD = [
  { 
    label: 'ID',
    id: 'id', 
    alignRight: false 
  },
  { 
    label: 'User Name ', 
    id: 'userName', 
    alignRight: false 
  },
  { 
    label: 'User Type ', 
    id: 'userType', 
    alignRight: false 
  },
  { 
    label: 'Email', 
    id: 'email', 
    alignRight: false 
  },
  { 
    label: 'Message ', 
    id: 'message', 
    alignRight: false 
  },
  { 
    label: 'Updated At', 
    id: 'createAt', 
    alignRight: false 
  },
  { 
    label: 'Created At', 
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
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cuisineList, setCuisineList] = useState([]);

  const FetchCusineList = ()=>{
    // return data from API
    setCuisineList(Data);
  }

  useEffect(()=>{
    FetchCusineList();
  },[])

  console.log("Cuisine list", cuisineList)


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
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data.length) : 0;
  const filteredUsers = applySortFilter(cuisineList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Munchh | Cuisine">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Contact Us Management
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/cuisine/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Contact
          </Button> */}
        </Stack>
        <Card>
          <ContactListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

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
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, userName, userType, email, message, updateAt,  createAt } = row;
                      const isItemSelected = selected.indexOf(userName) !== -1;
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
                          <TableCell align="left">{userName}</TableCell>
                          <TableCell align="left">{userType}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{message}</TableCell>
                          <TableCell align="left">{updateAt}</TableCell>
                          <TableCell align="left">{createAt}</TableCell>   
                          <TableCell align="right">
                            <ContactMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
            count={Data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
