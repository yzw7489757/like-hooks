import { useEffect, useRef } from 'react';
import useMergeState from './useMergeState';

const useSpeech = (text, opts = {}) => {
  const [state, setState] = useMergeState({
    isPlaying: false,
    volume: opts.volume || 1,
  });

  const uterranceRef = useRef(null);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = opts.volume || 1;
    utterance.onstart = () => setState({ isPlaying: true });
    utterance.onresume = () => setState({ isPlaying: true });
    utterance.onend = () => setState({ isPlaying: false });
    utterance.onpause = () => setState({ isPlaying: false });
    uterranceRef.current = utterance;
    window.speechSynthesis.speak(uterranceRef.current);
  }, [opts.volume, setState, text]);

  return state;
};
export default useSpeech;
