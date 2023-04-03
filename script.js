const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeTcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i"),
  translateButton = document.querySelector("button");
selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    // console.log(country_code);
    // console.log(countries[country_code]);
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "hi-IN") {
      selected = "selected";
    }

    let option = `<option value="${country_code}" ${selected} >${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeTcon.addEventListener("click", () => {
  let tepmText = fromText.value,
    tempLan = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLan;

  fromText.value = toText.value;

  toText.value = tepmText;
});
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    // console.log(target);
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        console.log("From copy icon clicked");
        navigator.clipboard.writeText(fromText.value);
      } else {
        console.log("To copy icon clicked");
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utternce;
      if (target.id == "from") {
        utternce = new SpeechSynthesisUtterance(fromText.value);
        utternce.lang = selectTag[0].value;
      } else {
        utternce = new SpeechSynthesisUtterance(toText.value);
        utternce.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utternce);
    }
  });
});

translateButton.addEventListener("click", () => {
  let text = fromText.value,
    transLateFrom = selectTag[0].value,
    transLateTo = selectTag[1].value;
  let apiUri = `https://api.mymemory.translated.net/get?q=${text}%20World!&langpair=${transLateFrom}|${transLateTo}`;
  fetch(apiUri)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });

  // console.log(text, transLateFrom, transLateTo);
});

// const ,
//   toText = document.querySelector(".to-text"),
//
//   selectTag = document.querySelectorAll("select"),
//
//  ;

// selectTag.forEach((tag, id) => {
//   for (let country_code in countries) {
//     let selected;
//     if (i == 0 && country_code == "en-GB") {
//       selected = "selected";
//     } else if (id == 1 && country_code == "hi-IN") {
//       selected = "selected";
//     }
//   }
//   const option = `<option ${selected} value=${country_code}>${countries[country_code]}</potion>`;
//   tag.insertAdjacentHTML("beforeend", option);
// });
