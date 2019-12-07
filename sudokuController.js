// Render an html element
function e(name, children, { className, onClick, onChange, value } = {}) {
  const element = document.createElement(name);

  if (className) {
    element.className = className;
  }

  if (typeof onClick === "function") {
    element.addEventListener("click", onClick);
  }

  if (typeof onChange === "function") {
    element.addEventListener("change", onChange);
  }

  if (children) {
    addChildren(element, children);
  }

  if (value) {
    element.value = value;
  }

  return element;
}

function addChildren(element, children) {
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child) {
        let node = child;
        if (typeof child === "string") {
          node = document.createTextNode(child);
        }
        element.appendChild(node);
      }
    });
  } else if (typeof children === "string") {
    element.appendChild(document.createTextNode(children));
  } else {
    element.appendChild(children);
  }
}

const SudokuController = {
  initializedTimer: false,
  init() {
    return SudokuModel.loadBoards();
  },
  renderTimer(root) {
    // Reset Element contents
    root.innerHTML = "";

    if (!this.initializedTimer) {
      this.initializedTimer = true;
      SudokuModel.loadTimer();
    }

    setTimeout(() => {
      SudokuModel.tick();
      SudokuController.renderTimer(root);
      SudokuModel.saveTimer();
    }, 1000);

    const TimeSpent = () =>
      e("p", [
        "Time Spent: ",
        e(
          "em",
          `${SudokuModel.getMinutesSpent()} minutes and ${SudokuModel.getSecondsSpent()} seconds`
        )
      ]);

    root.appendChild(e("div", [TimeSpent()]));
  },
  render(root) {
    // Reset Element contents
    root.innerHTML = "";

    const width = Array.from(Array(3).keys());
    const height = Array.from(Array(3).keys());

    const handleCellClick = (x, y) => event => {
      // Reset element
      event.target.innerHTML = "";
      const input = e("input", null, { className: "editing-cell" });
      event.target.appendChild(input);
      input.focus();

      input.onblur = () => {
        const value = parseInt(input.value, 10);
        if (value > 0 && value <= 9) {
          // event.target.innerHTML = input.value;
          SudokuModel.setValueAt(x, y, parseInt(input.value, 10));
        }
        SudokuController.render(root);
      };
    };

    const Cell = (square, spot) => {
      const value = SudokuModel.getValueAt(square, spot);
      return e("td", value ? value.toString() : "", {
        className: "cell",
        onClick: handleCellClick(square, spot)
      });
    };

    const NineByNineSquare = square =>
      e(
        "table",
        e(
          "tbody",
          height.map(h =>
            e("tr", width.map(w => Cell(square, this.getSpot(h, w))))
          )
        ),
        { className: "square" }
      );

    const Table = () =>
      e(
        "table",
        e(
          "tbody",
          height.map(h =>
            e(
              "tr",
              width.map(w => e("td", NineByNineSquare(this.getSpot(h, w))))
            )
          )
        )
      );

    const handleDifficultyChange = event => {
      SudokuModel.setDifficulty(event.target.value);
      SudokuController.render(root);
    };

    const handleResetGame = async () => {
      SudokuModel.reset();
      await SudokuModel.loadBoards();
      SudokuController.render(root);
    };

    const Controls = () =>
      e(
        "div",
        [
          e("label", [
            "Select Difficulty: ",
            e(
              "select",
              [
                e("option", "Easy", { value: "easy" }),
                e("option", "Medium", { value: "medium" }),
                e("option", "Hard", { value: "hard" })
              ],
              {
                onChange: handleDifficultyChange,
                value: SudokuModel.getDifficulty()
              }
            )
          ]),
          e("button", "Reset game", { onClick: handleResetGame })
        ],
        { className: "flex space-between pt-3" }
      );

    root.appendChild(e("div", [Table(), Controls()]));
  },
  getSpot(height, width) {
    const spots = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    return spots[height][width];
  }
};
