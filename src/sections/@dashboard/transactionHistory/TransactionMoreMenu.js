import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({verified}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        {verified? 
           <MenuItem sx={{ color: 'text.secondary' }}>
             <ListItemIcon>
               <Iconify icon="fontisto:toggle-off" width={24} height={24} />
             </ListItemIcon>
             <ListItemText primary="Unapprove" primaryTypographyProps={{ variant: 'body2' }} />
           </MenuItem>
        
        :  <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            
            <Iconify icon="fontisto:toggle-on" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        }
       
        <MenuItem component={RouterLink} to="/dashboard/merchant/menu" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="bxs:food-menu" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Menu" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
