import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const db = getFirestore();
let coursesRef = collection(db, "Courses");
let allClasses = {};
getDocs(coursesRef).then((snapshot) => {
    let temp = [];
    snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data() });
    });
    temp.map((obj) => {
        allClasses[obj.courseName] = obj.courseList;
    });
});

export default function DropdownClassesSearch(props) {

    let names = [];

    props.courses.forEach((department) => {
        let sortedArray = Object.keys(allClasses[department]).sort();
        sortedArray.forEach((courses) => {
            names.push(courses);
        });
    });


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        props.setClasses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Select Classes</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={props.classes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Classes" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={props.classes.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
