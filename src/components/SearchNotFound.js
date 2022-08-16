import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography  sx = {{color : "#636e72"}} gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
    </Paper>
  );
}
