import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function ButtonRemove(props) {
  return (
    <Stack direction="row" spacing={2}>
    
      <Button onClick={()=>{
       props.func(props.waiter)
      }} variant="outlined" color="error">
        הסר נבחר
      </Button>
    </Stack>
  );
}
export default ButtonRemove