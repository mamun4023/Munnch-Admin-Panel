// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import {useSelector} from 'react-redux';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: "#FFFFFF",
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: "#FFFFFF",
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

export default function TotalMerchant() {
  const TotalData = useSelector(state => state.Total.data);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="fa6-solid:shop" width={50} height={50} />
      </IconWrapperStyle>
      <Typography variant="h3">{TotalData?.totalMerchants? TotalData?.totalMerchants : 0}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Merchants
      </Typography>
    </RootStyle>
  );
}
