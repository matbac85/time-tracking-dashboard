fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    const cardsList = document.getElementById("cards-list");
    const buttonDaily = document.getElementById("button-daily");
    const buttonWeekly = document.getElementById("button-weekly");
    const buttonMonthly = document.getElementById("button-monthly");

    function updateCards(timeframe) {
      json.forEach((item) => {
        const card = document.getElementById(item.index);
        const cardTimeframe = card.querySelector(".card__timeframe");
        let cardPreviousTimeframe = card.querySelector(
          ".card__previous-timeframe"
        );

        cardTimeframe.textContent = `${item.timeframes[timeframe].current}hrs`;

        if (cardPreviousTimeframe) {
          cardPreviousTimeframe = document.createElement("span");
          cardPreviousTimeframe.classList.add("card__previous-timeframe");
          card
            .querySelector(".card__timeframe")
            .appendChild(cardPreviousTimeframe);
        }

        cardPreviousTimeframe.textContent = `previous - ${item.timeframes[timeframe].previous}hrs`;
      });
    }

    buttonDaily.addEventListener("click", () => {
      updateCards("daily");
    });

    buttonWeekly.addEventListener("click", () => {
      updateCards("weekly");
    });

    buttonMonthly.addEventListener("click", () => {
      updateCards("monthly");
    });

    json.forEach((item) => {
      const card = document.createElement("li");
      const cardDecoration = document.createElement("div");
      const cardIcon = document.createElement("img");
      const cardContent = document.createElement("div");
      const cardTitle = document.createElement("h2");
      const cardTimeframe = document.createElement("p");
      const cardPreviousTimeframe = document.createElement("span");

      cardTitle.textContent = item.title;
      cardIcon.src = item.iconURL;
      cardDecoration.classList.add("card__decoration");
      card.style.backgroundColor = item.backgroundColor;
      card.classList.add("card");
      card.id = item.index;
      cardContent.classList.add("card__content");
      cardTimeframe.classList.add("card__timeframe");
      cardPreviousTimeframe.classList.add("card__previous-timeframe");

      cardTimeframe.textContent = `0hrs`;
      cardPreviousTimeframe.textContent = `previous - 0hrs`;

      cardsList.appendChild(card);
      card.appendChild(cardDecoration);
      cardDecoration.appendChild(cardIcon);
      card.appendChild(cardContent);
      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardTimeframe);
      cardTimeframe.appendChild(cardPreviousTimeframe);
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données:",
      error
    );
  });
