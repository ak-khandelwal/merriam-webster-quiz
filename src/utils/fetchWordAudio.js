import { useEffect, useState } from 'react';

function WordSpeaker(word) {
  const [audioUrl, setAudioUrl] = useState(null);
  useEffect(() => {
    let active = true;
    const fetchAudio = async () => {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      const url = data[0]?.phonetics?.find((p) => p.audio)?.audio;
      if (active) setAudioUrl(url || null);
    };
    if (word) fetchAudio();
    return () => {
      active = false;
    }; // cleanup
  }, [word]);

  return audioUrl; // ⬅️ just return the URL string
}

export default WordSpeaker;
