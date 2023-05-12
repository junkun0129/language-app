type Definitions = {
  definition: string;
  example: string;
};
export type Meanings = {
  definitions: Definitions[];
  partOfSpeech: string;
};
type License = {
  name: string;
  url: string;
};
export type Phonetics = {
  audio: string;
  text: string;
};
export type Dictionary = {
  meanings: Meanings[];
  phonetic: Phonetics;
  sourceUrls: string[];
  word: string;
};
export type TranslateInfo = {
  text: string;
  source_lang: string;
  target_lang: string;
};
export const countries =
  "<li><em>Afrikaans</em> af</li><li><em>Albanian</em> sq</li><li><em>Amharic</em> am</li><li><em>Arabic</em> ar</li><li><em>Armenian</em> hy</li><li><em>Azerbaijani</em> az</li><li><em>Basque</em> eu</li><li><em>Belarusian</em> be</li><li><em>Bengali</em> bn</li><li><em>Bosnian</em> bs</li><li><em>Bulgarian</em> bg</li><li><em>Catalan</em> ca</li><li><em>Cebuano</em> ceb (ISO-639-2)</li><li><em>Chinese</em> (Simplified)	zh-CN (BCP-47)</li><li><em>Chinese</em> (Traditional)	zh-TW (BCP-47)</li><li><em>Corsican</em> co</li><li><em>Croatian</em> hr</li><li><em>Czech</em> cs</li><li><em>Danish</em> da</li><li><em>Dutch</em> nl</li><li><em>English</em> en</li><li><em>Esperanto</em> eo</li><li><em>Estonian</em> et</li><li><em>Finnish</em> fi</li><li><em>French</em> fr</li><li><em>Frisian</em> fy</li><li><em>Galician</em> gl</li><li><em>Georgian</em> ka</li><li><em>German</em> de</li><li><em>Greek</em> el</li><li><em>Gujarati</em> gu</li><li><em>Haitian</em> Creole	ht</li><li><em>Hausa</em> ha</li><li><em>Hawaiian</em> haw (ISO-639-2)</li><li><em>Hebrew</em> he**</li><li><em>Hindi</em> hi</li><li><em>Hmong</em> hmn (ISO-639-2)</li><li><em>Hungarian</em> hu</li><li><em>Icelandic</em> is</li><li><em>Igbo</em> ig</li><li><em>Indonesian</em> id</li><li><em>Irish</em> ga</li><li><em>Italian</em> it</li><li><em>Japanese</em> ja</li><li><em>Javanese</em> jw</li><li><em>Kannada</em> kn</li><li><em>Kazakh</em> kk</li><li><em>Khmer</em> km</li><li><em>Korean</em> ko</li><li><em>Kurdish</em> ku</li><li><em>Kyrgyz</em> ky</li><li><em>Lao</em> lo</li><li><em>Latin</em> la</li><li><em>Latvian</em> lv</li><li><em>Lithuanian</em> lt</li><li><em>Luxembourgish</em> lb</li><li><em>Macedonian</em> mk</li><li><em>Malagasy</em> mg</li><li><em>Malay</em> ms</li><li><em>Malayalam</em> ml</li><li><em>Maltese</em> mt</li><li><em>Maori</em> mi</li><li><em>Marathi</em> mr</li><li><em>Mongolian</em> mn</li><li><em>Myanmar</em> (Burmese)	my</li><li><em>Nepali</em> ne</li><li><em>Norwegian</em> no</li><li><em>Nyanja</em> (Chichewa)	ny</li><li><em>Pashto</em> ps</li><li><em>Persian</em> fa</li><li><em>Polish</em> pl</li><li><em>Portuguese</em> (Portugal, Brazil)	pt</li><li><em>Punjabi</em> pa</li><li><em>Romanian</em> ro</li><li><em>Russian</em> ru</li><li><em>Samoan</em> sm</li><li><em>Scots</em> Gaelic	gd</li><li><em>Serbian</em> sr</li><li><em>Sesotho</em> st</li><li><em>Shona</em> sn</li><li><em>Sindhi</em> sd</li><li><em>Sinhala</em> (Sinhalese)	si</li><li><em>Slovak</em> sk</li><li><em>Slovenian</em> sl</li><li><em>Somali</em> so</li><li><em>Spanish</em> es</li><li><em>Sundanese</em> su</li><li><em>Swahili</em> sw</li><li><em>Swedish</em> sv</li><li><em>Tagalog</em> (Filipino)	tl</li><li><em>Tajik</em> tg</li><li><em>Tamil</em> ta</li><li><em>Telugu</em> te</li><li><em>Thai</em> th</li><li><em>Turkish</em> tr</li><li><em>Ukrainian</em> uk</li><li><em>Urdu</em> ur</li><li><em>Uzbek</em> uz</li><li><em>Vietnamese</em> vi</li><li><em>Welsh</em> cy</li><li><em>Xhosa</em> xh</li><li><em>Yiddish</em> yi</li><li><em>Yoruba</em> yo</li><li><em>Zulu</em> zu</li>";
export const languageNames = countries
  .split("<li>")
  .map((e) => {
    return e
      .replace("<em>", "")
      .replace("</em>", "")
      .replace("</li>", "")
      .split(" ")[0];
  })
  .slice(1);
