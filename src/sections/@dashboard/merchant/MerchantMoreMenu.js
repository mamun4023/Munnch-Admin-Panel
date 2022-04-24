import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import {RemoveMerchant} from '../../../redux/merchant/remove/action';
import {FetchMerchantList} from '../../../redux/merchant/fetchAll/action';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function UserMoreMenu({id}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const RemoveHandler = (id)=>{
    dispatch(RemoveMerchant(id))
    dispatch(FetchMerchantList(1))
  }

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

        <MenuItem onClick={()=>RemoveHandler(id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon    
          >
            <Iconify icon="ant-design:delete-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to= {`/dashboard/merchant/view/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="carbon:view-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to= {`/dashboard/merchant/update/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="clarity:note-edit-solid" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Update" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
       
        <MenuItem component={RouterLink} to="/dashboard/merchant/menu" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="bxs:food-menu" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Menu" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to= {`/dashboard/merchant/store/${id}`} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="dashicons:store" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Store" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>



      </Menu>
    </>
  );
}
