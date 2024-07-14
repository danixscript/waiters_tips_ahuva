import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

 function InputText(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className='ltr without_ampm' value={props.valueW} type={props.inputType} onChange={props.func} id="outlined-basic" label={props.type} variant="outlined" />
  
    </Box>
  );
}
export default InputText
