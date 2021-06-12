import Footer from 'components/shared/Footer';
import Header from 'components/shared/Header';
import Tracker from 'components/tracker/Tracker';
import './App.css';
import './reset.css';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Tracker></Tracker>

      <Footer></Footer>
    </div>
  );
}

export default App;
