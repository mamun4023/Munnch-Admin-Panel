import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {styled} from '@mui/material';
import Page from '../components/Page'

// components
import ProfileDetail from "../sections/profile/edit";
import ChangePassword from '../sections/profile/password';
import ProfilePic from '../sections/profile/profilePic';

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
}));

export default function Profile() {
  const [value, setValue] = React.useState("admin_detail");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
        <>
            <RootStyle  title = "Admin Profile" > </RootStyle>    
            <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab value= "admin_detail" label="Admin Details" > </Tab>
                    <Tab value="change_password" label="Change Password" />
                    <Tab value="change_Picture" label="Change Picture" />
                </Tabs>
            </Box>
            <Box>
                {
                    value == "admin_detail"? <ProfileDetail/> : null
                }
                {
                    value == "change_password"? <ChangePassword/> : null
                }
                {
                    value == "change_Picture"? <ProfilePic/> : null
                }
            </Box>
        </>
    );
}
