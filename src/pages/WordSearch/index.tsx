import * as React from "react";
import { Component, useState, useEffect } from "react";
import { Box, TextField, Fab, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Dictionary } from "../../types";
function WordSearch() {
  const [word, setWord] = useState("");
  const [wordInfo, setWordInfo] = useState<Partial<Dictionary[]> | null>(null);

  useEffect(() => {
    console.log(wordInfo);
  }, [wordInfo]);
  const submitWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWordInfo(data);
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
          <TextField onChange={(e) => setWord(e.target.value)}></TextField>
          <Fab
            onClick={submitWord}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
          >
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            submit
          </Fab>
        </Paper>
        {wordInfo && (
          <Paper
            elevation={3}
            sx={{
              width: "30%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              overflow: "scroll",
            }}
          >
            {wordInfo &&
              wordInfo.map((info, i) => {
                return (
                  <div>
                    {info && (
                      <div>
                        <div>{i}:</div>
                        <div>
                          meaning:{" "}
                          {info.meanings.map((meaning, i) => {
                            return (
                              <>
                                <div>{meaning.partOfSpeech}</div>
                                <div>
                                  {meaning.definitions.map((def, i) => {
                                    return (
                                      <div>
                                        <div>definition: {def.definition}</div>
                                        <div>example: {def.example}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {info.sourceUrls.map((source, i) => {
                          return <a href={source}>{source}</a>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </Paper>
        )}
      </div>
    </>
  );
}

export default WordSearch;
