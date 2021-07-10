class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rollArray: [], totalRoll: 0 };

    this.rollDice = this.rollDice.bind(this);
    this.addDice = this.addDice.bind(this);
    this.renderDiceItems = this.renderDiceItems.bind(this);
  }

  rollDice() {
    let newArray = [];
    for (var i = 0; i < 4; i++) {
      var fateDie = Math.floor(Math.random() * 3) - 1; //creates 0 to 2, subtracts 1 for -1 to 1
      newArray.push(fateDie);
    }
    //this is a callback function: setState is NOT sync, it's async, so right after it we want to set state, wait until it's updated, THEN throw addDice to make sure it's accurate; this way we check the current state
    this.setState({ rollArray: newArray }, this.addDice);
  }

  addDice() {
    let newArray = [...this.state.rollArray];
    var total = 0;
    newArray.map((arrayItem) => {
      total = total + arrayItem;
    });
    this.setState({ totalRoll: total });
  }

  //this returns span items based on the item in the state array to render. Could also be done with a component to keep things clean.
  renderDiceItems(item, index) {
    if (item === 1) {
      return "+";
    } else if (item === -1) {
      return "-";
    } else {
      return "";
    }
  }

  //render: if nothing: post a blank, otherwise render a div of +, -, and O for dice, then the total (seperate amount, nothing if 0)
  //button: activates above things
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1>Fate Dice Roller</h1>
            <div className="dice-roller">
              {/*If rollArray.length = 0; display blank div. Otherwise, map the rollArray state to render based on the output of the renderDiceItems function that generates what to post. */}
              {this.state.rollArray.length === 0 ? (
                <p className="roll-prompt">Click Roll to begin.</p>
              ) : (
                this.state.rollArray.map((item, index) => (
                  <span key={index} className="dice">
                    {this.renderDiceItems(item)}
                  </span>
                ))
              )}
              {this.state.rollArray.length === 0 ? (
                <span></span>
              ) : (
                <span className="dice-result">{this.state.totalRoll}</span>
              )}
            </div>
            <div className="roll-button">
              <p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.rollDice}
                >
                  Roll
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="instructions-text text-center col-8">
            <h5 className="lead">What are Fate dice?</h5>
            <p>
              Fate dice are rolled in the Fate Core tabletop roleplaying game to
              determine success on any task. Unlike games such as{" "}
              <i>Dungeons and Dragons</i>, a Fate die has +, - or a blank space
              on two sides each. You roll four of these and add them together -
              this generates a result between -4 and 4. This keeps the bell
              curve even, and makes having higher points in a skill modifier
              more valuable.
            </p>
            <p>
              You can{" "}
              <a href="https://www.drivethrurpg.com/product/114903/Fate-Core-System">
                get Fate Core for free at DriveThruRPG
              </a>{" "}
              or{" "}
              <a href="https://fate-srd.com/">
                read it online at the Fate SRD.
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
