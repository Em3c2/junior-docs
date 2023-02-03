(function () {
  const darkThemeButton = document.getElementById("theme-toggle");

  const stylesheets = {
    ayuHighlight: document.querySelector("[href$='ayu-highlight.css']"),
    tomorrowNight: document.querySelector("[href$='tomorrow-night.css']"),
    highlight: document.querySelector("[href$='highlight.css']"),
  };

  function get_theme() {
    let theme;
    try {
      theme = localStorage.getItem("mdbook-theme");
    } catch (e) {}
    if (theme === null || theme === undefined) {
      return default_theme;
    } else {
      return theme;
    }
  }

  function set_theme(theme, store = true) {
    let ace_theme;

    if (theme == "coal" || theme == "navy") {
      stylesheets.ayuHighlight.disabled = true;
      stylesheets.tomorrowNight.disabled = false;
      stylesheets.highlight.disabled = true;

      ace_theme = "ace/theme/tomorrow_night";
    } else if (theme == "ayu") {
      stylesheets.ayuHighlight.disabled = false;
      stylesheets.tomorrowNight.disabled = true;
      stylesheets.highlight.disabled = true;
      ace_theme = "ace/theme/tomorrow_night";
    } else {
      stylesheets.ayuHighlight.disabled = true;
      stylesheets.tomorrowNight.disabled = true;
      stylesheets.highlight.disabled = false;
      ace_theme = "ace/theme/dawn";
    }

    if (window.ace && window.editors) {
      window.editors.forEach(function (editor) {
        editor.setTheme(ace_theme);
      });
    }

    let previousTheme = get_theme();

    if (store) {
      try {
        localStorage.setItem("mdbook-theme", theme);
      } catch (e) {}
    }

    html.classList.remove(previousTheme);
    html.classList.add(theme);
  }

  // Set theme
  let theme = get_theme();
  set_theme(theme, false);

  // Toggle theme
  darkThemeButton.onclick = () => {
    let theme = get_theme();
    if (theme == "ayu") {
      set_theme("light");
    } else {
      set_theme("ayu");
    }
  };

  darkThemeButton.children[0].classList.replace("fa-paint-brush", "fa-adjust");
})();
