export type CharacterAction = 'idle'|'breathing'|'blinking'|'talking'|'reading'|'typing'|'thinking'|'confused'|'surprised'|'pointing'|'frustrated'|'happy';
export const expressionFor = (action:CharacterAction) => ({
  tilt: action==='confused'?-7:action==='frustrated'?9:action==='reading'?5:0,
  brow: action==='confused'?3:action==='frustrated'?4:action==='surprised'?-4:0,
  mouth: action==='happy'?'smile':action==='surprised'?'open':action==='confused'||action==='frustrated'?'slant':'neutral',
});
