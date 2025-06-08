export interface Preset {
  name: string;
  selectedInstrument: string;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  soundTrackIndex: number | null;
  soundDirection: number;
  unsetBlockColor: string;
  blueBlockColor: string;
  redBlockColor: string;
  selectedColor: string;
  mergeSetColor: string;
  lineColor: string;
  lineColorSelectedParent: string;
  selectedChainColor: string;
}
