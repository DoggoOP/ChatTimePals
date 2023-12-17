const { OpenAI } = require('openai');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.post('/api/chat', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [{ role: "user", content: text }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    // Construct the request
    text = req.body.text;
    lang = req.body.languageCode;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: lang, ssmlGender: 'MALE'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await client.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    res.send(`data:audio/mp3;base64,${response.audioContent.toString('base64')}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/translate', async (req, res) => {
  try {
    // Construct the request
    text = req.body.text;
    lang = req.body.isoCode;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const [translations] = await translate.translate(text, lang);
    res.send(translations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});