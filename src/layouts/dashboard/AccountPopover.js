import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import {FetchProfileData} from '../../redux/auth/profile/profile/action';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: 'eva:home-fill',
  //   linkTo: '/'
  // },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/profile'
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  //   linkTo: '/dashboard/setting'
  // }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const dispatch  = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    dispatch(FetchProfileData())
  },[])

  const Data = useSelector(state => state.Profile.data);

  const LogoutHandler = ()=>{
    localStorage.removeItem(process.env.REACT_APP_TOKEN);
    window.location.replace("/login");
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={Data.url} alt="Profile Pic" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        ))}
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={LogoutHandler} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
