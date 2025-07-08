document.addEventListener("DOMContentLoaded", function () {
    const passwordLengthInput = document.getElementById("passwordLength");
    const includeUppercaseCheckbox = document.getElementById(
      "includeUppercase"
    );
    const includeLowercaseCheckbox = document.getElementById(
      "includeLowercase"
    );
    const includeNumbersCheckbox = document.getElementById("includeNumbers");
    const includeSymbolsCheckbox = document.getElementById("includeSymbols");
    const generateRegenerateBtn = document.getElementById("generateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const generatedPasswordDisplay = document.getElementById(
      "generatedPassword"
    );
    const passwordText = document.getElementById("passwordText");
    const copyButton = document.getElementById("copyButton");

    generateRegenerateBtn.addEventListener("click", function () {
      if (generateRegenerateBtn.textContent === "Generate Password") {
        generatePassword();
        generateRegenerateBtn.textContent = "Regenerate Password";
      } else {
        generatePassword();
      }
    });

    resetBtn.addEventListener("click", resetInputs);

    copyButton.addEventListener("click", function () {
      const password = passwordText.textContent;
      if (password) {
        navigator.clipboard
          .writeText(password)
          .then(() => {
            alert("Password copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      } else {
        alert("No password to copy!");
      }
    });

    function generatePassword() {
      const length = parseInt(passwordLengthInput.value);

      if (!length || length < 6 || length > 128) {
        passwordText.textContent =
          "Error: Password length must be between 6 and 128.";
        generatedPasswordDisplay.classList.remove("text-green-600");
        generatedPasswordDisplay.classList.add("text-red-600");
        return;
      }

      const includeUppercase = includeUppercaseCheckbox.checked;
      const includeLowercase = includeLowercaseCheckbox.checked;
      const includeNumbers = includeNumbersCheckbox.checked;
      const includeSymbols = includeSymbolsCheckbox.checked;

      if (
        !includeUppercase &&
        !includeLowercase &&
        !includeNumbers &&
        !includeSymbols
      ) {
        passwordText.textContent =
          "Error: At least one character type must be selected.";
        generatedPasswordDisplay.classList.remove("text-green-600");
        generatedPasswordDisplay.classList.add("text-red-600");
        return;
      }

      const password = generateSecurePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );
      passwordText.textContent = password;
      generatedPasswordDisplay.classList.remove("text-red-600");
      generatedPasswordDisplay.classList.add("text-green-600");
    }

    function generateSecurePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    ) {
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_-+={}[]|;:<>,.?/~";

      let charPool = "";
      let guaranteedChars = "";

      if (includeUppercase) {
        charPool += uppercaseChars;
        guaranteedChars += uppercaseChars.charAt(
          Math.floor(Math.random() * uppercaseChars.length)
        );
      }
      if (includeLowercase) {
        charPool += lowercaseChars;
        guaranteedChars += lowercaseChars.charAt(
          Math.floor(Math.random() * lowercaseChars.length)
        );
      }
      if (includeNumbers) {
        charPool += numberChars;
        guaranteedChars += numberChars.charAt(
          Math.floor(Math.random() * numberChars.length)
        );
      }
      if (includeSymbols) {
        charPool += symbolChars;
        guaranteedChars += symbolChars.charAt(
          Math.floor(Math.random() * symbolChars.length)
        );
      }

      let remainingLength = length - guaranteedChars.length;
      let password = guaranteedChars;

      for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool.charAt(randomIndex);
      }

      password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

      return password;
    }

    function resetInputs() {
      passwordLengthInput.value = "";
      includeUppercaseCheckbox.checked = false;
      includeLowercaseCheckbox.checked = false;
      includeNumbersCheckbox.checked = false;
      includeSymbolsCheckbox.checked = false;
      passwordText.textContent = "";
      generateRegenerateBtn.textContent = "Generate Password";
      generatedPasswordDisplay.classList.remove("text-red-600");
      generatedPasswordDisplay.classList.remove("text-green-600");
    }
  });