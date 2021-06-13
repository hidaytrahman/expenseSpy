import Footer from 'components/shared/Footer';
import Header from 'components/shared/Header';
import Tracker from 'components/tracker/Tracker';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <section className="section-highlight-area">
        <div className="container">
         <h3>Know your expense 😎</h3>
        </div>
      </section>
      <Tracker></Tracker>

      <Footer></Footer>
    </div>
  );
}

export default App;
