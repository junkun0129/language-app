import * as React from "react";
import { Component, useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Fab,
  Paper,
  Card,
  IconButton,
  Tooltip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion } from "framer-motion";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { Dictionary, Phonetics } from "../../types";
import axios from "axios";
function WordSearch() {
  const player = useRef<HTMLAudioElement>(null);
  const [wordInfo, setWordInfo] = useState<Dictionary>();
  const [translateWords, setTranslateWords] = useState("");
  const [translatedWords, setTranslatedWords] = useState<string[] | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [smallWindow, setSmallWindow] = useState({
    is: false,
    word: "",
    index: 0,
  });

  useEffect(() => console.log(wordInfo, "wordInfo"), [wordInfo]);
  useEffect(() => {
    const setToWordInfo = async () => {
      if (smallWindow.word !== "") {
        console.log(smallWindow.word);
        const set = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${smallWindow.word}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "ooooooooooooooooooo");
            const wordName = data[0].word;
            const wordPhonetic = data[0].phonetics.filter(
              (element: Partial<Phonetics>) => element.hasOwnProperty("text")
            )[0].text;
            console.log(wordPhonetic);
            const wordAudio = data[0].phonetics.filter(
              (element: Partial<Phonetics>) => element.hasOwnProperty("audio")
            )[0].audio;
            console.log(wordAudio);
            const wordPhonetics = {
              audio: wordAudio,
              text: wordPhonetic,
            };
            const wordUrl = data[0].sourceUrls[0];
            const wordMeaning = data.map((element: Dictionary) => {
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
            console.log(wordMeaning[0].partOfSpeech, ";;;;;;;;;;;");
            setWordInfo({
              meanings: wordMeaning,
              phonetic: wordPhonetics,
              sourceUrls: wordUrl,
              word: wordName,
            });
          });
        await setIsPrepared(true);
        console.log(isPrepared);
      }
    };
    setToWordInfo();
    console.log(isPrepared);
    console.log(wordInfo);
    console.log(translatedWords);
  }, [smallWindow.word !== ""]);

  const encodedParams = new URLSearchParams();
  encodedParams.set("text", translateWords);
  encodedParams.set("to", "en");
  encodedParams.set("from", "ja");

  const TranslateOptions = {
    method: "POST",
    url: "https://nlp-translation.p.rapidapi.com/v1/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "f15ae8a9d7msh571de8bd79995dbp166412jsn047b3e5829eb",
      "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const lookUpWordsOptions = (word: string) => {
    return {
      method: "GET",
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    };
  };
  const submitWordTranslate = async () => {
    const translatedSentence = await axios.request(TranslateOptions);
    setTranslatedWords(translatedSentence.data.translated_text.en.split(" "));
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
            elevation={3}
            sx={{
              width: "30%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "95%",
                margin: "1rem",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {translatedWords.map((word, index) => {
                return (
                  <>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      {wordInfo &&
                        word === smallWindow.word &&
                        index === smallWindow.index && (
                          <>
                            <Card
                              sx={{
                                position: "absolute",
                                top: "-320px",
                                right: "-60px",
                                width: "280px",
                                height: "300px",
                                display: "flex",
                                backgroundColor: "lightgrey",
                                flexDirection: "column",
                              }}
                            >
                              <motion.div
                                onHoverStart={() =>
                                  setSmallWindow({
                                    is: true,
                                    word,
                                    index,
                                  })
                                }
                                onHoverEnd={() =>
                                  setSmallWindow({
                                    is: false,
                                    word: "",
                                    index,
                                  })
                                }
                                style={{ width: "100%", height: "100%" }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    height: "20%",
                                    border: "1px solid black",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>{wordInfo.word}</div>
                                  {/* {wordInfo.phonetic.text && (
                                  <div>{wordInfo.phonetic.text}</div>
                                )} */}
                                  <div>{wordInfo.phonetic.text}</div>
                                  <div>
                                    <audio
                                      id="player"
                                      ref={player}
                                      src={wordInfo.phonetic.audio}
                                    ></audio>
                                    <Tooltip title={"audio"}>
                                      <IconButton
                                        onClick={() =>
                                          player.current &&
                                          player.current.play()
                                        }
                                      >
                                        <VolumeDownIcon></VolumeDownIcon>
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "70%",
                                    border: "1px solid black",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    overflow: "scroll",
                                  }}
                                >
                                  {wordInfo.meanings.map((meaning, row) => {
                                    return meaning.map((mean, column) => {
                                      return (
                                        <div>
                                          <div
                                            style={{
                                              padding: "10px",
                                              backgroundColor: "grey",
                                              fontSize: "1.5rem",
                                            }}
                                          >
                                            {mean.partOfSpeech}
                                          </div>
                                          <div>
                                            {mean.definitions.map((def, i) => {
                                              return (
                                                <div
                                                  style={{
                                                    padding: "2px",
                                                    border: "1px solid black",
                                                  }}
                                                >
                                                  <div>
                                                    <div
                                                      style={{
                                                        fontSize: "1.2rem",
                                                      }}
                                                    >
                                                      ・definition
                                                    </div>
                                                    <div>{def.definition}</div>
                                                  </div>
                                                  <div>
                                                    <div
                                                      style={{
                                                        fontSize: "1.2rem",
                                                      }}
                                                    >
                                                      ・example
                                                    </div>
                                                    <div>{def.example}</div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    });
                                  })}
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "10%",
                                    border: "1px solid black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                  }}
                                >
                                  <div>memories</div>
                                </div>
                              </motion.div>
                            </Card>
                            <motion.div
                              style={{
                                position: "absolute",
                                width: "280px",
                                height: "80%",
                                right: "-60px",
                                top: "-20px",
                              }}
                              onHoverStart={() =>
                                setSmallWindow({
                                  is: true,
                                  word,
                                  index,
                                })
                              }
                              onHoverEnd={() =>
                                setSmallWindow({
                                  is: false,
                                  word: "",
                                  index,
                                })
                              }
                            ></motion.div>
                          </>
                        )}
                    </div>
                    <motion.div
                      style={{ padding: 5, borderRadius: 15 }}
                      whileHover={{
                        backgroundColor: "lightgray",
                        cursor: "pointer",
                      }}
                      onHoverStart={() =>
                        setSmallWindow({
                          is: true,
                          word,
                          index,
                        })
                      }
                      onHoverEnd={() =>
                        setSmallWindow({
                          is: false,
                          word: "",
                          index,
                        })
                      }
                    >
                      {word}
                    </motion.div>
                  </>
                );
              })}
            </div>
          </Paper>
        )}
      </div>
    </>
  );
}

export default WordSearch;
