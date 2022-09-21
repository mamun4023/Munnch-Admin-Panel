import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import  {TextField, Box} from '@mui/material';

export default function DateFilterPopover({ anchorEl, open, handleClick, handleClose, children }) {

  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
    
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box 
            padding={1}
        > 
           {children}

        </Box>   
      </Popover>
    </div>
  );
}