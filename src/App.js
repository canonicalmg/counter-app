import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
  
    // Don't let the user have negative values
    if (counters[index].value > 1) {
      counters[index].value--;
    }
  
    this.setState({ counters });
  };
  

  handleReset = () => {
    // Directly mutating the state (common mistake)
    this.state.counters.forEach(c => {
      c.value = 0;
    });
  
    // State is mutated directly, but React may not recognize this change
    this.setState({ counters: this.state.counters });
  };
  

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleRestart = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <NavBar
              totalCounters={
                this.state.counters.filter((c) => c.value > 0).length
              }
            />
            <Counters
              counters={this.state.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onRestart={this.handleRestart}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
