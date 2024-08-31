import React, { useState } from 'react';
import './index.css';

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let characters = letters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err);
      });
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>

      <input
        type="range"
        id="length"
        min="4"
        max="30"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <label htmlFor="length" >Password Length:   {length}</label>

      <label htmlFor="include-numbers">
        <input
          type="checkbox"
          id="include-numbers"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
        Include Numbers
      </label>

      <label htmlFor="include-symbols">
        <input
          type="checkbox"
          id="include-symbols"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
        Include Symbols
      </label>

      <button onClick={generatePassword} id="generate-btn">Generate Password</button>

      <div className="result">
        <p>Your Password:</p>
        <div id="password-display">{password}</div>
          <button onClick={copyToClipboard} id="copy-btn">Copy Password</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <PasswordGenerator />
    </div>
  );
}

export default App;

