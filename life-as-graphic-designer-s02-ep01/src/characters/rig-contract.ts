// Binding contract only: resolve these against the actual approved rig after inspection.
// No assumed bone names and no procedurally generated substitute humanoid.
export type ActingControl='breath'|'blink'|'eyeDirection'|'headRotation'|'lean'|'arms'|'phone'|'mouse'|'typing'|'confused'|'surprised'|'thinking'|'focused';
export type RigApproval={modelFile:string;modelSha256:string;conceptFile:string;approvedByUser:boolean;boneBindings:Record<string,string>;expressionBindings:Record<string,string>};
export const performancePhases=['anticipation','action','reaction','settle'] as const;
