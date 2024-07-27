import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function ButtonExel(props) {
  return (
    <Stack spacing={2} direction="row">
 
      <Button onClick={props.func} variant="contained" color="success">  שלח דוח לוואטסאפ </Button>
      
    </Stack>
  );
 
}
 export default ButtonExel