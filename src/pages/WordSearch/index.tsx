import * as React from "react";
import { Component, useState, useEffect } from "react";
import { Box, TextField, Fab, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Dictionary, Phonetics, TranslateInfo } from "../../types";
import axios from "axios";
function WordSearch() {
  const [word, setWord] = useState("");
  const [wordInfo, setWordInfo] = useState<Partial<Dictionary[]> | null>(null);
  const [phonetics, setPhonetics] = useState<Partial<Phonetics> | null>(null);
  const [translateWords, setTranslateWords] = useState<Partial<TranslateInfo>>({
    text: ["apple", "lkj"],
    target_lang: "JA",
  });
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
        console.log(data);
        setWordInfo(data);
      });
  };

  const submitWordTranslate = () => {
    // fetch("http://localhost:8000/translate", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     text: translateWords.text,
    //     source_lang: translateWords.source_lang,
    //     target_lang: translateWords.target_lang,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data, "data");
    //   });
    axios
      .post(`http://localhost:8000/translate/`, {
        translateWords,
      })
      .then((res) => console.log(res))
      .then((data) => console.log(data));
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
