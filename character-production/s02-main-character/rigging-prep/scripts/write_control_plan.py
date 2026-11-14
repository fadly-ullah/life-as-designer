"""Write an unbound recommendation contract; does not create any rig or animation."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]
def ctrl(name,range_,description,group='face',default=0):
 return {'name':name,'group':group,'range':range_,'neutralDefault':default,'description':description,'implementationStatus':'PLANNED_ONLY','binding':None}
controls=[
 ctrl('blink',[0,1],'Bilateral eyelid closure; 0=approved neutral open, 1=closed. Overrides eye-wide and hides pupil/glint leakage.'),
 ctrl('blinkL',[0,1],'Optional independent left blink, combined with global closure using max.'),
 ctrl('blinkR',[0,1],'Optional independent right blink, combined with global closure using max.'),
 ctrl('eyeDirectionX',[-1,1],'Head-local horizontal gaze. Translate pupil/glint together inside measured white bounds.'),
 ctrl('eyeDirectionZ',[-1,1],'Head-local vertical gaze (Blender Z; map local axis once on glTF import).'),
 ctrl('eyeSquint',[0,1],'Small upper/lower lid/white change, no neutral face replacement.'),
 ctrl('eyeWide',[0,1],'Conservative eye opening, neutral Basis unchanged; endpoint requires review.'),
 ctrl('browRaise',[-1,1],'Small symmetric brow raise/lower with original brow geometry.'),
 ctrl('browTiltL',[-1,1],'Restrained left brow angle for thinking/interest.'),
 ctrl('browTiltR',[-1,1],'Restrained right brow angle for thinking/interest.'),
 ctrl('mouthSmile',[0,1],'Subtle smile morph; neutral original line is exact Basis.'),
 ctrl('mouthOpenSmall',[0,1],'Small open shape for kaget/semangat; target art/topology not implemented.'),
 ctrl('mouthThought',[0,1],'Restrained asymmetric/thoughtful mouth variant derived from approved sheet.'),
 ctrl('mouthOffsetX',[-1,1],'Subtle lateral minimal-mouth adjustment; no speech-viseme system.'),
 ctrl('headPitch',[-1,1],'Normalized planned head nod; range in radians determined after clearance tests.','body'),
 ctrl('headYaw',[-1,1],'Normalized planned head turn; no hard-coded anatomical limit yet.','body'),
 ctrl('headRoll',[-1,1],'Restrained tilt; optional support for mikir/semangat.','body'),
 ctrl('torsoLean',[-1,1],'Small chest/spine lean after weighting validation.','body'),
 ctrl('breath',[0,1],'Subtle deterministic chest motion; not mesh inflation or physics.','body'),
]
for side in ['L','R']:
 for part in ['shoulderFK','elbowFK','wristFK','hipFK','kneeFK','footFK','handGrip']:
  controls.append(ctrl(part+'.'+side,[-1,1] if part!='handGrip' else [0,1],'Planned logical control; actual joint axes/limits or thumb scope must be validated.','body'))
expr={
 'neutral':{'label':'Netral','weights':{},'intent':'Exact approved neutral; all controls reset to their neutral defaults.'},
 'senang':{'label':'Senang','weights':{'mouthSmile':.40,'eyeSquint':.12,'browRaise':.08},'intent':'Restrained happy expression, original identity unchanged.'},
 'kaget':{'label':'Kaget','weights':{'browRaise':.55,'eyeWide':.20,'mouthOpenSmall':.50},'intent':'Small surprise, not exaggerated replacement eyes/mouth.'},
 'mikir':{'label':'Mikir','weights':{'browTiltL':.20,'browTiltR':-.10,'mouthThought':.25},'intent':'Restrained asymmetric interest; optional head/hand gesture is future posing only.'},
 'semangat':{'label':'Semangat','weights':{'mouthSmile':.65,'mouthOpenSmall':.15,'eyeSquint':.12,'browRaise':.15},'intent':'Energetic but recognizable; endpoint needs visual approval.'},
}
plan={'schemaVersion':'s02-rig-prep-recommendation-v1','identitySourceCommit':'aff455385918d8cb13d72123af824156bd771e6a','status':'PLANNED_UNBOUND_NOT_ANIMATION','actualBoneBindings':{},'actualMorphBindings':{},'controls':controls,'expressionPresets':expr,'presetValuesAre':'Proposed normalized starting weights only; not implemented or visually approved performance endpoints.','neutralReset':'Reset every driven transform/morph to approved rest before sampling absolute frame state. Neutral preset leaves all values at defaults.','combinationRules':['Interpolate expression weights from neutral; keep morph weights bounded 0..1.','Normalize competing mouthSmile/mouthOpenSmall/mouthThought budgets to avoid uncontrolled combined expansion.','Blink overrides eyeWide; independent closure=max(globalBlink, sideBlink).','Eye direction is independent from emotion presets; pupils and glints travel together.','Never move or recolor approved jaw/blush/face skin to fake an expression.'],'gazeSafety':'Derive separate left/right/up/down margins from actual pupil+glint and eye-white local bounds. Limit travel to ~80% of each available directional margin; do not assume symmetric travel or let glints escape white.','exportImplementation':'Planned head-attached transform nodes for gaze/brows, fixed-topology morphs for lids/mouth; no Blender-only drivers at runtime. Bake only after approval.','futurePerformanceAcceptance':['neutral round-trip exact','all five expression endpoints reviewed against concept','blink fully closes without white/glint leakage','gaze remains within eye whites','small mouth motion stays on face plane without z-fighting','same frame identical after arbitrary seeking']}
(R/'docs/animation-controls.json').write_text(json.dumps(plan,indent=2))
print('CONTROL_PLAN_WRITTEN',len(controls),'unbound logical controls')
