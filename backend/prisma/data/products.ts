import { columns } from './products/columns';
import { gameHeadphones } from './products/gameHeadphones';
import { gameMouse } from './products/gameMouses';
import { gamepads } from './products/gamepads';
import { keyboards } from './products/keyboards';
import { microphones } from './products/microphones';
import { webcamers } from './products/webcamers';

export const products = [
  ...gameMouse,
  ...keyboards,
  ...gameHeadphones,
  ...gamepads,
  ...webcamers,
  ...microphones,
  ...columns,
];
