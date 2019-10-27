document
  .getElementById("login-form")
  .addEventListener("submit", async event => {
    event.preventDefault();
    const { result, timestamp, userName } = await fetch(
      "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php",
      {
        method: "POST",
        body: new FormData(event.target)
      }
    ).then(res => res.json());

    if (result === "valid") {
      localStorage.setItem("cs2550timestamp", `${userName} ${timestamp}`);
      window.location = "game.html";
    } else if (result === "invalid") {
      document.getElementById("login-form-error").innerHTML = "Incorrect username or password"
    }
  });
