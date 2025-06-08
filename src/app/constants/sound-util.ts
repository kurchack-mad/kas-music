interface Window {
  webkitAudioContext?: typeof AudioContext;
}

const audioPool: { [key: string]: AudioBufferSourceNode[] } = {};
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const loadSound = async (url: string): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

// Preload all sounds
export const preloadSounds = async (sounds: string[]) => {
  for (const sound of sounds) {
    if (!audioPool[sound]) {
      audioPool[sound] = [];
    }
    try {
      const buffer = await loadSound(sound);
      audioPool[sound].push(audioContext.createBufferSource());
      audioPool[sound][0].buffer = buffer;
    } catch (e) {
      console.error(`Error loading sound: ${sound}`);
    }
  }
};

export const playSound = async (sound: string, volume: number = 1) => {
  if (!audioPool[sound] || audioPool[sound].length === 0) {
    await preloadSounds([sound]);
  }

  let source = audioPool[sound].find(s => s.buffer && s.buffer.duration === 0);
  if (!source) {
    source = audioContext.createBufferSource();
    source.buffer = audioPool[sound][0].buffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode).connect(audioContext.destination);
    audioPool[sound].push(source);
  }

  source.start(0);
};

export const compareNotes = (note1: string, note2: string) => {
  const note1Index = CHROMATIC_SCALE.indexOf(`assets/sounds/${note1}.wav`);
  const note2Index = CHROMATIC_SCALE.indexOf(`assets/sounds/${note2}.wav`);

  return note1Index - note2Index;
};

export const CHROMATIC_SCALE: string[] = [
  'assets/sounds/a1.wav',
  'assets/sounds/bb1.wav',
  'assets/sounds/b1.wav',
  'assets/sounds/c2.wav',
  'assets/sounds/db2.wav',
  'assets/sounds/d2.wav',
  'assets/sounds/eb2.wav',
  'assets/sounds/e2.wav',
  'assets/sounds/f2.wav',
  'assets/sounds/gb2.wav',
  'assets/sounds/g2.wav',
  'assets/sounds/ab2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/bb2.wav',
  'assets/sounds/b2.wav',
  'assets/sounds/c3.wav',
  'assets/sounds/db3.wav',
  'assets/sounds/d3.wav',
  'assets/sounds/eb3.wav',
  'assets/sounds/e3.wav',
  'assets/sounds/f3.wav',
  'assets/sounds/gb3.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/ab3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/bb3.wav',
  'assets/sounds/b3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/db4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/eb4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/f4.wav',
  'assets/sounds/gb4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/ab4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/bb4.wav',
  'assets/sounds/b4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/db5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/eb5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/f5.wav',
  'assets/sounds/gb5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/ab5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/bb5.wav',
  'assets/sounds/b5.wav',
  'assets/sounds/c6.wav',
];

export const CMAJOR_SCALE: string[] = [
  'assets/sounds/c2.wav',
  'assets/sounds/d2.wav',
  'assets/sounds/e2.wav',
  'assets/sounds/f2.wav',
  'assets/sounds/g2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/b2.wav',
  'assets/sounds/c3.wav',
  'assets/sounds/d3.wav',
  'assets/sounds/e3.wav',
  'assets/sounds/f3.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/b3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/f4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/b4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/f5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/b5.wav',
  'assets/sounds/c6.wav',
];

export const GMAJOR_SCALE: string[] = [
  'assets/sounds/g2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/b2.wav',
  'assets/sounds/c2.wav',
  'assets/sounds/d2.wav',
  'assets/sounds/e2.wav',
  'assets/sounds/gb2.wav',
  'assets/sounds/g2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/b2.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/b3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/gb4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/b4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/gb5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/b5.wav',
  'assets/sounds/c6.wav',
  'assets/sounds/d6.wav',
  'assets/sounds/e6.wav',
  'assets/sounds/gb6.wav',
  'assets/sounds/g6.wav',
];

export const FMAJOR_SCALE: string[] = [
  'assets/sounds/f3.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/bb3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/f4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/bb4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/f5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/bb5.wav',
  'assets/sounds/c6.wav',
  'assets/sounds/d6.wav',
  'assets/sounds/e6.wav',
  'assets/sounds/f6.wav',
];

export const EMINOR_SCALE: string[] = [
  'assets/sounds/e2.wav',
  'assets/sounds/gb2.wav',
  'assets/sounds/g2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/b2.wav',
  'assets/sounds/c3.wav',
  'assets/sounds/d3.wav',
  'assets/sounds/e3.wav',
  'assets/sounds/gb3.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/b3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/gb4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/b4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/gb5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/b5.wav',
  'assets/sounds/c6.wav',
  'assets/sounds/d6.wav',
  'assets/sounds/e6.wav',
];

export const DMINOR_SCALE: string[] = [
  'assets/sounds/d2.wav',
  'assets/sounds/e2.wav',
  'assets/sounds/f2.wav',
  'assets/sounds/g2.wav',
  'assets/sounds/a2.wav',
  'assets/sounds/bb2.wav',
  'assets/sounds/c3.wav',
  'assets/sounds/d3.wav',
  'assets/sounds/e3.wav',
  'assets/sounds/f3.wav',
  'assets/sounds/g3.wav',
  'assets/sounds/a3.wav',
  'assets/sounds/bb3.wav',
  'assets/sounds/c4.wav',
  'assets/sounds/d4.wav',
  'assets/sounds/e4.wav',
  'assets/sounds/f4.wav',
  'assets/sounds/g4.wav',
  'assets/sounds/a4.wav',
  'assets/sounds/bb4.wav',
  'assets/sounds/c5.wav',
  'assets/sounds/d5.wav',
  'assets/sounds/e5.wav',
  'assets/sounds/f5.wav',
  'assets/sounds/g5.wav',
  'assets/sounds/a5.wav',
  'assets/sounds/bb5.wav',
  'assets/sounds/c6.wav',
  'assets/sounds/d6.wav',
];

export const SOUND_TRACKS = [
  {
    name: 'c major',
    value: CMAJOR_SCALE,
  },
  {
    name: 'g major',
    value: GMAJOR_SCALE,
  },
  {
    name: 'f major',
    value: FMAJOR_SCALE,
  },
  {
    name: 'e minor',
    value: EMINOR_SCALE,
  },
  {
    name: 'd minor',
    value: DMINOR_SCALE,
  },
  {
    name: 'chromatic',
    value: CHROMATIC_SCALE,
  },
];
