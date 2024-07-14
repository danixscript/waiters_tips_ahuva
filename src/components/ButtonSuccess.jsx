import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function ButtonSuccess(props) {
  return (
    <Stack direction="row" spacing={2}>
    
      <Button onClick={()=>{

props.func(props.waiter)
props.clear()

      }} variant="contained" color="success">
        שלח 
      </Button>
  
    </Stack>
  );
}
export default ButtonSuccess