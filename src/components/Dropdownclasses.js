import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const names = [
  'CSE 101',
  'CMPM 80K',
  'AM 100',
  'MATH 100',
];

export default function Dropdownclasses(props) {
  const [classes, setClasses] = React.useState([]);

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
