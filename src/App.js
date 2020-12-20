import './App.css';
import Form from './components/Form'
import { Container } from '@material-ui/core'
import Header from './components/Header'

function App() {
  return (
    <>
    <Header />
    <Container className="App">
      <Form />
    </Container>
    </>
  );
}

export default App;
