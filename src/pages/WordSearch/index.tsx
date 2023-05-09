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
  const [eachWordMeaning, setEachWordMeaning] =
    useState<Partial<Dictionary[] | null>>(null);
  const [wordInfo, setWordInfo] = useState<[]>([]);
  const [phonetics, setPhonetics] = useState<Partial<Phonetics> | null>(null);
  const [translateWords, setTranslateWords] = useState("");
  const [translatedWords, setTranslatedWords] = useState<string[] | null>(null);
  const [smallWindow, setSmallWindow] = useState({
    is: false,
    index: 0,
  });
  useEffect(() => {
    // if (wordInfo) {
    //   const phoneticFilter = wordInfo[0]?.phonetics.filter(
    //     (element) => element.hasOwnProperty("text") && element.audio !== ""
    //   );

    //   if (phoneticFilter) {
    //     setPhonetics(phoneticFilter[0]);
    //     console.log(phoneticFilter[0]);
    //   }
    // }
    console.log(wordInfo);
  }, [wordInfo]);

  const encodedParams = new URLSearchParams();
  encodedParams.set("text", translateWords);
  encodedParams.set("to", "en");
  encodedParams.set("from", "ja");

  const options = {
    method: "POST",
    url: "https://nlp-translation.p.rapidapi.com/v1/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "f15ae8a9d7msh571de8bd79995dbp166412jsn047b3e5829eb",
      "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
    },
    data: encodedParams,
  };
  const submitWordTranslate = async () => {
    const response = await axios.request(options);
    console.log(response);

    setTranslatedWords(
      // response.data.data.translations[0].translatedText.split(" ")
      response.data.translated_text.en.split(" ")
    );

    console.log(translatedWords);
    translatedWords?.map((word, i) => {
      return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          // const phoneticFilter = data[0].phonetics.filter(
          //   (element) => element.hasOwnProperty("text") && element.audio !== ""
          // );

          // if (phoneticFilter) {
          //   setPhonetics(phoneticFilter[0]);
          //   console.log(phoneticFilter[0]);
          // }
          console.log(data);
          const wordName = data[0].word;
          const wordPhonetic = data[0].phonetics.filter(
            (element) => element.hasOwnProperty("text") && element.audio !== ""
          )[0];
          const wordUrl = data[0].sourceUrls[0];
          const wordMeaning = data.map((element) => {
            return element.meanings.map((meaning) => {
              return {
                definitions: meaning.definitions.map((def) => {
                  return {
                    definition: def.definition,
                    example: def.example,
                  };
                }),
                partOfSpeech: meaning.partOfSpeech,
              };
            });
          });

          setWordInfo((pre) => [
            ...pre,
            {
              meanings: wordMeaning,
              phonetic: wordPhonetic,
              sourceUrls: wordUrl,
              word: wordName,
            },
          ]);
          console.log(wordInfo, "data");
        });
    });
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
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: 350,
            }}
          >
            {translatedWords.map((word, index) => {
              return (
                <>
                  <div style={{ position: "relative" }}>
                    {smallWindow.is && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-220px",
                          width: "150px",
                          height: "200px",
                          background: "gray",
                        }}
                      >
                        {wordInfo[smallWindow.index].word}
                      </div>
                    )}
                    <motion.div
                      style={{ padding: 10, borderRadius: 15 }}
                      whileHover={{
                        backgroundColor: "lightgray",
                        cursor: "pointer",
                      }}
                      onHoverStart={() =>
                        setSmallWindow({
                          is: true,
                          index,
                        })
                      }
                      onHoverEnd={() =>
                        setSmallWindow({
                          is: false,
                          index,
                        })
                      }
                    >
                      {word}
                    </motion.div>
                  </div>
                </>
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
