// Load driver standings
fetch("https://ergast.com/api/f1/current/driverStandings.json")
  .then(res => res.json())
  .then(data => {
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const container = document.getElementById("standings-container");
    standings.forEach(driver => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>#${driver.position} - ${driver.Driver.givenName} ${driver.Driver.familyName}</h3>
        <p><strong>Team:</strong> ${driver.Constructors[0].name}</p>
        <p><strong>Points:</strong> ${driver.points}</p>
        <p><strong>Wins:</strong> ${driver.wins}</p>
        <p><a href="${driver.Driver.url}" target="_blank">More Info</a></p>
      `;
      container.appendChild(card);
    });
  });

// Load latest race results
fetch("https://ergast.com/api/f1/current/last/results.json")
  .then(res => res.json())
  .then(data => {
    const race = data.MRData.RaceTable.Races[0];
    const results = race.Results;
    const container = document.getElementById("results-container");

    results.forEach(result => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>#${result.position} - ${result.Driver.givenName} ${result.Driver.familyName}</h3>
        <p><strong>Team:</strong> ${result.Constructor.name}</p>
        <p><strong>Grid Start:</strong> ${result.grid}</p>
        <p><strong>Finish Time:</strong> ${result.Time?.time || "N/A"}</p>
      `;
      container.appendChild(card);
    });
  });
