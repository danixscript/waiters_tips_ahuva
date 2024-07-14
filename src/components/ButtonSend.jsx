import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function ButtonSend(props) {
  return (
    <Stack spacing={2} direction="row">
 
      <Button onClick={props.func} variant="contained">בצע ספירת טיפים </Button>
      
    </Stack>
  );
 
}
 export default ButtonSend