import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Button 
        variant="outlined"
        onClick={() => console.log('click event')}
      >
        Sign In
      </Button>
    </div>
  );
}

export default App;
