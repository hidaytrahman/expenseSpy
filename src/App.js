import Footer from "components/shared/Footer";
import Header from "components/shared/Header";
import Tracker from "components/tracker/Tracker";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <section className="section-highlight-area">
        <div className="container">
          <h3>Track your expenses! 💸</h3>
          <p>
            Keeping track of your expenses is an important part of managing your
            overall finances.
          </p>
        </div>
      </section>
      <Tracker />
      <Footer />
    </div>
  );
}

export default App;
