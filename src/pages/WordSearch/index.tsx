import * as React from "react";
import { Component, useState, useEffect } from "react";
import { Box, TextField, Fab, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion } from "framer-motion";
import {
  Dictionary,
  Phonetics,
  TranslateInfo,
  languageNames,
} from "../../types";

import { countries } from "../../types";
import axios from "axios";
function WordSearch() {
  const [word, setWord] = useState("");
  const [wordInfo, setWordInfo] = useState<Partial<Dictionary[]> | null>(null);
  const [phonetics, setPhonetics] = useState<Partial<Phonetics> | null>(null);
  const [translateWords, setTranslateWords] = useState("");
  const [translatedWords, setTranslatedWords] = useState<string | null>(null);
  useEffect(() => {
    if (wordInfo) {
      const phoneticFilter = wordInfo[0]?.phonetics.filter(
        (element) => element.hasOwnProperty("text") && element.audio !== ""
      );

      if (phoneticFilter) {
        setPhonetics(phoneticFilter[0]);
        console.log(phoneticFilter[0]);
      }
    }
  }, [wordInfo]);

  const submitWordMeaning = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data), ";lll";
        setWordInfo(data);
      });
  };
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", translateWords);
  encodedParams.set("target", "en");
  encodedParams.set("source", "ja");

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "f15ae8a9d7msh571de8bd79995dbp166412jsn047b3e5829eb",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };
  const submitWordTranslate = async () => {
    const response = await axios.request(options);

    setTranslatedWords(response.data.data.translations[0].translatedText);
    // axios
    //   .post(`https://libretranslate.de/translate`, {
    //     q: "皮肉を言うのはやめよう",
    //     source: "ja",
    //     target: "en",
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   });
    // axios
    //   .post(`http://localhost:8000/translate/`, {
    //     translateWords,
    //   })
    //   .then((res) => console.log(res));
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "30%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h1>WordTranslate</h1>
          <TextField
            name="translateWords"
            onChange={(e) => setTranslateWords(e.target.value)}
          ></TextField>
          <Fab
            onClick={submitWordTranslate}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
          >
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            submit
          </Fab>
        </Paper>
        {translatedWords && (
          <Paper
            sx={{ display: "flex", width: 100, justifyContent: "space-around" }}
          >
            {translatedWords.split(" ").map((word) => {
              return (
                <motion.div
                  style={{ padding: 10, borderRadius: 15 }}
                  whileHover={{
                    backgroundColor: "lightgray",
                    cursor: "pointer",
                  }}
                >
                  {word}
                </motion.div>
              );
            })}
          </Paper>
        )}
        {/* {wordInfo && (
          <Paper
            elevation={3}
            sx={{
              width: "30%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "scroll",
            }}
          >
            <h1>{wordInfo[0]?.word}</h1>
            <h2>{phonetics?.text}</h2>
            <audio controls>
              <source src={phonetics?.audio} />
            </audio>
            <a href={wordInfo[0]?.sourceUrls}>wiki</a>
            {wordInfo &&
              wordInfo.map((info, i) => {
                return (
                  <>
                    {info?.meanings.map((mean, i) => {
                      return (
                        <>
                          <h3>{mean.partOfSpeech}</h3>
                          <div>
                            {mean.definitions.map((def, i) => {
                              return (
                                <>
                                  <div>definition: {def.definition}</div>
                                  {def.example && (
                                    <div>example: {def.example}</div>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
          </Paper>
        )} */}
      </div>
    </>
  );
}

export default WordSearch;
