import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload(props) {
    const changeHandler = (event) => {
        props.setTutor(previousState => {
            return { ...previousState, 
                selectedFile: event.target.files[0] }
        });
    };
    return (
    <Button component="label" variant="contained" onChange={changeHandler}>
        Upload file
        <VisuallyHiddenInput type="file" />
    </Button>
    );
}