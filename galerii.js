// See fail lisab GALERII lehele väikese interaktiivse küsimuse

// Ootame, kuni terve leht on laaditud
// DOMContentLoaded tähendab, et HTML on juba valmis, aga pildid võivad veel laadida
document.addEventListener("DOMContentLoaded", () => {

  // Otsin HTML-ist üles vastuste loendi (ul.answers) ja nupu (button.task-btn). Need eksisteerivad ainult kolmas.html lehel
  const answersList = document.querySelector(".answers");
  const answerButton = document.querySelector(".task-btn");

  // Kui seda loendit või nuppu pole (nt avaleht), siis lõpetan töö ära. Seda tehakse selleks, et JS ei annaks vigu teistel lehtedel
  if (!answersList || !answerButton) {
    return; // siinsel lehel pole küsimust, seega pole midagi teha
  }

  // Loon uue <p> elemendi, kuhu hakkame näitama, kas vastus oli õige või vale
  const resultText = document.createElement("p");
  resultText.className = "task-result";  // annan talle klassi, et CSS saaks kujundada
  resultText.textContent = "Vali kunstnik ja vajuta nuppu „Vasta“."; // algne juhis

  // Lisan selle loodud <p> elemendi küsimuse kasti lõppu
  answerButton.parentElement.appendChild(resultText);

  // Siia salvestan, millise vastuse kasutaja valis
  let selectedLi = null;

  // Kirjutan siia õige vastuse. Kontrollime hiljem selle järgi
  const correctAnswer = "Vincent van Gogh";

  // Võtan kõik <li> elemendid vastuste loendis ja teen nad klõpsatavaks
  answersList.querySelectorAll("li").forEach((li) => {

    // Iga li saab klikisündmuse
    li.addEventListener("click", () => {

      // Kui kasutaja valib mingi uue vastuse, eemaldan kõigilt teistelt li-elementidelt "selected" klassi, et ainult üks oleks korraga aktiivne
      answersList.querySelectorAll("li").forEach((item) => {
        item.classList.remove("selected");
      });

      // Märgin nüüd valitud rea "selected" klassiga (CSS teeb selle paksuks või rõhutatud kujuga)
      selectedLi = li;
      li.classList.add("selected");
    });
  });

  // Kui kasutaja vajutab nuppu "Vasta", kontrollime vastust
  answerButton.addEventListener("click", () => {

    // Kui pole midagi valitud, siis ütleme kasutajale, et peab kõigepealt ühe valima
    if (!selectedLi) {
      resultText.textContent = "Palun vali kõigepealt kunstnik.";
      resultText.classList.remove("correct", "wrong");
      return;
    }

    // Võrdlen valitud vastust õige vastusega
    if (selectedLi.textContent.trim() === correctAnswer) {
      
      // Kui õige, siis näitame rohelist teksti
      resultText.textContent = "Õige!";
      resultText.classList.add("correct");
      resultText.classList.remove("wrong");

    } else {

      // Kui vale, siis näitame punast teksti
      resultText.textContent = "Vale vastus, proovi uuesti.";
      resultText.classList.add("wrong");
      resultText.classList.remove("correct");
    }
  });
});
