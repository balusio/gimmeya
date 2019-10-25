import React from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
} from '@material-ui/core';

export default () => (
  <div className="context">
    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
    <Box component="span" m={1}>
      <TextField />
      <h1>HEELLO WORLD</h1>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Box>

  </div>
);
