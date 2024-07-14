import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

 function ButtonDelAll(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={props.func} color="secondary">אפס הכל</Button>
    
    </Stack>
  );
}
export default ButtonDelAll