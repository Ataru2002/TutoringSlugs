import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// actually uploading the transcript

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
        if(event.target.files[0].type !== "application/pdf"){
            console.log(event.target.files[0].type);
            alert("File type must be pdf.");
            return;
        }

        fetch("http://localhost:8080/user/uploadTranscript", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/pdf"
            },
            body: event.target.files[0]
        }).then((res) => {
            if (res.status === 404) {
                window.location.href = "/signin";
            }
            else {
                alert("Success uploading transcript.");
            }
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <Button component="label" variant="contained" onChange={changeHandler}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}