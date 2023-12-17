import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { OpenAI } from 'openai';
import ReactPlayer from 'react-player';


const emojiMap = {
  "😮": ["o", "e"],
  "😐": ["b", "p", "m"],
  "🙂": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z"],
  "😲": ["d", "l"],
  "😯": ["q", "u", "w", "y"],
  "😀": ["a", "i"]
};

const defaultEmoji = "🤗";

const toEmoji = char => {
  return (
    Object.keys(emojiMap).find(emoji =>
      emojiMap[emoji].includes(char.toLowerCase())
    ) || defaultEmoji
  );
};

function App() {
  const [chatResponse, setChatResponse] = useState('');
  const [text, setText] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emoji, setEmoji] = useState(defaultEmoji);
  const [submitted, setSubmitted] = useState(false);
  const [characterSubmitted, setCharacterSubmitted] = useState(false);
  const [chatHistory, setChatHistory] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languageCode, setLanguageCode] = useState('');
  const [languageSelected, setLanguageSelected] = useState(false);
  const [isoCode, setIsoCode] = useState('');



  const languages = {
    'Afrikaans (South Africa)': 'af-ZA',
    'Arabic': 'ar-XA',
    'Basque (Spain)': 'eu-ES',
    'Bengali (India)': 'bn-IN',
    'Bulgarian (Bulgaria)': 'bg-BG',
    'Catalan (Spain)': 'ca-ES',
    'Chinese (Hong Kong)': 'yue-HK',
    'Czech (Czech Republic)': 'cs-CZ',
    'Danish (Denmark)': 'da-DK',
    'Dutch (Belgium)': 'nl-BE',
    'Dutch (Netherlands)': 'nl-NL',
    'English (Australia)': 'en-AU',
    'English (India)': 'en-IN',
    'English (UK)': 'en-GB',
    'English (US)': 'en-US',
    'Filipino (Philippines)': 'fil-PH',
    'Finnish (Finland)': 'fi-FI',
    'French (Canada)': 'fr-CA',
    'French (France)': 'fr-FR',
    'Galician (Spain)': 'gl-ES',
    'German (Germany)': 'de-DE',
    'Greek (Greece)': 'el-GR',
    'Gujarati (India)': 'gu-IN',
    'Hebrew (Israel)': 'he-IL',
    'Hindi (India)': 'hi-IN',
    'Hungarian (Hungary)': 'hu-HU',
    'Icelandic (Iceland)': 'is-IS',
    'Indonesian (Indonesia)': 'id-ID',
    'Italian (Italy)': 'it-IT',
    'Japanese (Japan)': 'ja-JP',
    'Kannada (India)': 'kn-IN',
    'Korean (South Korea)': 'ko-KR',
    'Latvian (Latvia)': 'lv-LV',
    'Lithuanian (Lithuania)': 'lt-LT',
    'Malay (Malaysia)': 'ms-MY',
    'Malayalam (India)': 'ml-IN',
    'Mandarin Chinese': 'cmn-CN',
    'Marathi (India)': 'mr-IN',
    'Norwegian (Norway)': 'nb-NO',
    'Polish (Poland)': 'pl-PL',
    'Portuguese (Brazil)': 'pt-BR',
    'Portuguese (Portugal)': 'pt-PT',
    'Punjabi (India)': 'pa-IN',
    'Romanian (Romania)': 'ro-RO',
    'Russian (Russia)': 'ru-RU',
    'Serbian (Cyrillic)': 'sr-RS',
    'Slovak (Slovakia)': 'sk-SK',
    'Spanish (Spain)': 'es-ES',
    'Spanish (US)': 'es-US',
    'Swedish (Sweden)': 'sv-SE',
    'Tamil (India)': 'ta-IN',
    'Telugu (India)': 'te-IN',
    'Thai (Thailand)': 'th-TH',
    'Turkish (Turkey)': 'tr-TR',
    'Ukrainian (Ukraine)': 'uk-UA',
    'Vietnamese (Vietnam)': 'vi-VN'
};

const languageISOCodeMap = {
  'Afrikaans (South Africa)': 'af',
  'Arabic': 'ar',
  'Basque (Spain)': 'eu',
  'Bengali (India)': 'bn',
  'Bulgarian (Bulgaria)': 'bg',
  'Catalan (Spain)': 'ca',
  'Chinese (Hong Kong)': 'zh-TW', 
  'Czech (Czech Republic)': 'cs',
  'Danish (Denmark)': 'da',
  'Dutch (Belgium)': 'nl',
  'Dutch (Netherlands)': 'nl',
  'English (Australia)': 'en',
  'English (India)': 'en',
  'English (UK)': 'en',
  'English (US)': 'en',
  'Filipino (Philippines)': 'fil',
  'Finnish (Finland)': 'fi',
  'French (Canada)': 'fr',
  'French (France)': 'fr',
  'Galician (Spain)': 'gl',
  'German (Germany)': 'de',
  'Greek (Greece)': 'el',
  'Gujarati (India)': 'gu',
  'Hebrew (Israel)': 'he',
  'Hindi (India)': 'hi',
  'Hungarian (Hungary)': 'hu',
  'Icelandic (Iceland)': 'is',
  'Indonesian (Indonesia)': 'id',
  'Italian (Italy)': 'it',
  'Japanese (Japan)': 'ja',
  'Kannada (India)': 'kn',
  'Korean (South Korea)': 'ko',
  'Latvian (Latvia)': 'lv',
  'Lithuanian (Lithuania)': 'lt',
  'Malay (Malaysia)': 'ms',
  'Malayalam (India)': 'ml',
  'Mandarin Chinese': 'zh-CN', 
  'Marathi (India)': 'mr',
  'Norwegian (Norway)': 'no',
  'Polish (Poland)': 'pl',
  'Portuguese (Brazil)': 'pt',
  'Portuguese (Portugal)': 'pt',
  'Punjabi (India)': 'pa',
  'Romanian (Romania)': 'ro',
  'Russian (Russia)': 'ru',
  'Serbian (Cyrillic)': 'sr',
  'Slovak (Slovakia)': 'sk',
  'Spanish (Spain)': 'es',
  'Spanish (US)': 'es',
  'Swedish (Sweden)': 'sv',
  'Tamil (India)': 'ta',
  'Telugu (India)': 'te',
  'Thai (Thailand)': 'th',
  'Turkish (Turkey)': 'tr',
  'Ukrainian (Ukraine)': 'uk',
  'Vietnamese (Vietnam)': 'vi'
};

const handleLanguageChange = (event) => {
  setSelectedLanguage(event.target.value);
  setIsoCode(languageISOCodeMap[event.target.value]);
};

const confirmSelection = () => {
  setLanguageCode(languages[selectedLanguage]);
  setLanguageSelected(true);
  setSelectedLanguage(selectedLanguage);
  setIsoCode(languageISOCodeMap[selectedLanguage]);
};

useEffect(() => {
  if (text.length > 0) {
    setEmoji(toEmoji(text[currentIndex]));
  }
}, [currentIndex]);


async function translateText(chatResponse) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  const response = await fetch('http://localhost:3001/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: chatResponse, isoCode: isoCode })
  });
  // Write the binary audio content to a local file
  const translated = await response.text(); // or response.text() if the data is text

  console.log(translated);
  ttsStart(translated);
}

async function ttsStart(translated) {
  // Performs the text-to-speech request
  const response = await fetch('http://localhost:3001/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: translated, languageCode: languageCode })
  });
  // Write the binary audio content to a local file
  const data = await response.text(); // or response.text() if the data is text
  
  console.log(data);
  setAudioUrl(data);
}


async function chatReq(text) {
  const context = `You are visiting an elderly person that may be schizophrenic. Please act as ${characterName} and talk with them and do not mention you are an AI assistant as that may break the illusion and their hearts. Here is the conversation so far: ${chatHistory}`;
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: context + " " + text })
  });

  const textResponse = await response.text();
  console.log('Server response:', textResponse);

  // Parse the response as JSON
  const data = JSON.parse(textResponse);
  if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
    return data.choices[0]?.message?.content || "";
  } else {
    // Handle the case where data.choices is not an array
    console.error('Unexpected response format:', data);
    return "";
  }
}

const handleCharacterSubmit = (e) => {
  e.preventDefault();
  setCharacterSubmitted(true);
};

const handleSubmit = async (e) => {
  console.log('handleSubmit called');
  setEmoji("🤔");
  e.preventDefault()
  setChatHistory(chatHistory + " The person you are talking to: " + text);
  // Send the text to the OpenAI API
  setText('');
  console.log(text)
  setSubmitted(true);
  const chatResponse = await chatReq(text);
  console.log(chatResponse);
  handleResponse(chatResponse);
  setChatHistory(chatHistory + "You:" + chatResponse);
}
  
const handleResponse = (chatResponse) => {
  translateText(chatResponse);
  if (chatResponse.length > 0) {
    let index = 0;
    const intervalId = setInterval(() => {
      setEmoji(toEmoji(chatResponse[index]));
      index++;
      if (index >= chatResponse.length) {
        clearInterval(intervalId);
      }
    }, 55);
  }
};

  return (
    <div className="App">
      <h1 className="App-title">Chat Time Pals</h1>
      <p className="App-intro">Chat with anyone you want to in your native language!</p>
      <header className="App-header">
        {!languageSelected ? (
        <>
          <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
            {Object.keys(languages).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <button className="confirm-language-button" onClick={confirmSelection}>Confirm Language</button>
        </>
        ) : (
          <p className="selected-language">Selected language: {selectedLanguage}</p>
        )}
        {!characterSubmitted ? (
        <form className="character-form" onSubmit={handleCharacterSubmit}>
          <input
            className="character-input"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Who do you want to talk to?"
          />
          <button className="submit-character-button" type="submit">Submit</button>
        </form>
        ) : (
          <p className="character-name">You are chatting with {characterName}</p>
        )}
        <div className='Emoji'>{emoji}</div>
        <form className="text-form" onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to say?"
        />
          <button className="submit-text-button" type="submit">Submit</button>
        </form>
        <ReactPlayer url={audioUrl} playing />
      </header>
    </div>
  );
}

export { App as default, toEmoji };