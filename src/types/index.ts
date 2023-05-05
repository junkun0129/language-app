type Definitions = {
  definition: string;
  example: string;
};
type Meanings = {
  definitions: Definitions[];
  partOfSpeech: string;
  synonyms: string[];
};
type License = {
  name: string;
  url: string;
};
type Phonetics = {
  audio: string;
  license: License;
  sourceUrl: string;
};
export type Dictionary = {
  license: {
    name: string;
    url: string;
  };
  meanings: Meanings[];
  phonetic: string;
  phonetics: Phonetics[];
  sourceUrls: string[];
  word: string;
};
