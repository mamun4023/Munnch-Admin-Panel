import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import Tooltip from '@mui/material/Tooltip';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
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
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import Spinner from 'src/components/Spinner';
import { LoyaltyListHead, LoyaltyListToolbar, LoyaltyMoreMenu } from '../sections/@dashboard/loyalty';
import {GetLoyaltyData, GetWithdrawData} from '../redux/settings/actions';

// ----------------------------------------------------------------------


const TABLE_HEAD = [

  { 
    label: 'LOYALTY LEVEL',
    id: 'loyalty_level', 
    alignRight: false 
  },
  {
    label: 'MINIMUM WITHDRAW', 
    id: 'minimum_withdraw', 
    alignRight: false 
  },
];

// ----------------------------------------------------------------------


export default function Loyalty() {
  const [Loyalty_level, setLoyalty_level] = useState();
  const [withdraw, setWithdraw] = useState();


  const FetchData = ()=>{
    GetLoyaltyData()
      .then(res =>{
        const response = res.data.data.merchant_variable;
        setLoyalty_level(response);
      })

    
    GetWithdrawData()
      .then(res =>{
        const response = res.data.data.merchant_variable;
        setWithdraw(response);
      })
  }

  useEffect(()=>{
    FetchData();
  }, [])


  return (
    <Page title="Munchh | Settings">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/settings/update"
            startIcon={<Iconify icon="clarity:note-edit-solid" />}
          >
            Update
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LoyaltyListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                        <TableRow
                          hover
                        >
                          <TableCell align="left"> {Loyalty_level?.value} </TableCell>
                          <TableCell align="left"> {withdraw?.value}</TableCell>   
                        </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
