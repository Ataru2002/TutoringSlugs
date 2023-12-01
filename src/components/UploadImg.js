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

        fetch("http://localhost:8080/user/uploadProfilePhoto", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "image/jpeg"
            },
            body: event.target.files[0]
        }).then((res) => {
            if (res.status === 404) {
                window.location.href = "/signin";
            }
            else {
                res.json().then(obj => {
                    props.setTutor(previousState => {
                        return {
                            ...previousState,
                            profilePhoto: obj.fileName
                        }
                    });
                    alert("Success uploading image.");
                })
            }
        }).catch((err) => {
            console.log(err);
        });

    };
    return (
        <Button component="label" variant="contained" onChange={changeHandler}>
            Upload Image
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}