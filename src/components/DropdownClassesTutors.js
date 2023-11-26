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
    temp.forEach((test) => {
        allClasses[test.courseName] = test.courseList;
    });
});

export default function DropdownClassesTutors(props) {
  const [classes, setClasses] = React.useState([]);

  const names = [];

  props.courses.forEach((department) => {
    Object.keys(allClasses[department]).forEach((courses) => {
        names.push(courses);
    });
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClasses(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    props.setTutor(previousState => {
        return { ...previousState, coursesTutored: event.target.value }
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Classes</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={classes}
          onChange={handleChange}
          input={<OutlinedInput label="Select Classes for Tutoring" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={classes.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}