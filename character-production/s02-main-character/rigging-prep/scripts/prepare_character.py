"""Non-destructive hierarchy preparation. No armature, weights, constraints, poses or export."""
import bpy,json,hashlib
from pathlib import Path
from mathutils import Matrix,Vector
R=Path(__file__).resolve().parents[1];BASE=R.parent/'modeling-04-final-polish/source/s02-character-model04-final-polish.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE));s=bpy.context.scene
root=bpy.data.objects['S02_MainCharacter_MODEL04_FINAL_POLISH_UNAPPROVED_UNRIGGED']
col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'];meshes=[o for o in col.objects if o.type=='MESH']
prep=bpy.data.collections.new('PREP | STATIC ORGANIZATION AND LANDMARKS');s.collection.children.link(prep)
def empty(name,parent):
 o=bpy.data.objects.new(name,None);prep.objects.link(o);o.parent=parent;o.matrix_parent_inverse=Matrix.Identity(4);o.matrix_basis=Matrix.Identity(4)
 o.empty_display_type='PLAIN_AXES';o.empty_display_size=.08;o.hide_render=True
 o['purpose']='Organizational identity-transform container only; NOT a bone, controller or animation binding.'
 return o
groups={}
def group(key,parent=None):
 groups[key]=empty('PREP_GROUP_'+key,groups[parent] if parent else root)
for key,parent in [('HEAD',None),('FACE','HEAD'),('HAIR','HEAD'),('TORSO',None),('ARM_L',None),('HAND_L','ARM_L'),('ARM_R',None),('HAND_R','ARM_R'),('LEG_L',None),('FOOT_L','LEG_L'),('LEG_R',None),('FOOT_R','LEG_R')]:group(key,parent)
def classify(n):
 if n.startswith('Hair |'):return 'HAIR','rigid_head_attachment'
 if n.startswith(('Eye white.','Pupil.','Eye glint.','Upper eyelid.','Brow.','Blush.','Neutral mouth','Nose |')):return 'FACE','planned_facial_nodes_or_morphs'
 if n.startswith(('Head |','Ear.','Ear inner.')):return 'HEAD','rigid_head'
 side='L' if '.L' in n else 'R' if '.R' in n else None
 if side and n.startswith(('Palm.','Thumb.','Finger crease.')):return 'HAND_'+side,'rigid_hand_with_optional_thumb'
 if side and n.startswith(('Sleeve |','Cuff |','Cuff rib.','Shoulder seam.')):return 'ARM_'+side,'sleeve_skinning_candidate_cuff_rigid'
 if side and n.startswith(('Trousers.','Trouser outer seam.','Hem fold.')):return 'LEG_'+side,'trouser_skinning_candidate_hem_rigid'
 if side and n.startswith(('Outsole.','Shoe upper.','Toe panel.','Ankle collar.','Tongue.')):return 'FOOT_'+side,'rigid_foot'
 return 'TORSO','torso_or_garment_follow_candidate'
mapping=[]
for o in meshes:
 key,policy=classify(o.name);world=o.matrix_world.copy();oldparent=o.parent.name if o.parent else None
 o.parent=groups[key];o.matrix_parent_inverse=Matrix.Identity(4);o.matrix_world=world
 mapping.append({'object':o.name,'oldParent':oldparent,'prepGroup':groups[key].name,'futurePolicy':policy,'actualBoneBinding':None,'weightsCreated':False})
def bb(o):
 p=[o.matrix_world@v.co for v in o.data.vertices]
 return Vector(tuple(min(v[i] for v in p) for i in range(3))),Vector(tuple(max(v[i] for v in p) for i in range(3)))
# Measured candidates, not authoritative anatomical pivots or active controls.
landmarks={}
def landmark(name,position,reason):
 o=empty('PREP_LANDMARK_'+name,root);o.location=position;o.empty_display_type='SPHERE';o.empty_display_size=.025;o.hide_set(True)
 o['purpose']='Candidate joint position only. Unbound and hidden; requires rigging placement review.'
 landmarks[name]={'object':o.name,'position':list(position),'basis':reason,'status':'CANDIDATE_NOT_BOUND'}
head=bpy.data.objects['Head | refined cheek-jaw planes'];lo,hi=bb(head)
landmark('HEAD_BASE',(0,.02,lo.z),'Approved jaw minimum Z; neck/head pivot candidate')
torso=bpy.data.objects['Hoodie torso | shoulder-chest-waist contour'];tl,th=bb(torso)
landmark('PELVIS',(0,.02,tl.z+.03),'Hoodie hem vicinity; pelvis pivot requires anatomical fit review')
landmark('CHEST',(0,.04,th.z-.22),'Upper torso extent; coarse chest reference')
for side in ['L','R']:
 sleeve=bpy.data.objects['Sleeve | continuous shaped elbow.'+side]
 rings=[]
 for start in range(0,len(sleeve.data.vertices),12):
  vs=list(sleeve.data.vertices)[start:start+12];rings.append(sum((sleeve.matrix_world@v.co for v in vs),Vector())/len(vs))
 rings.sort(key=lambda v:v.z)
 landmark('SHOULDER_'+side,rings[-1],'Center of highest sleeve loft ring')
 landmark('ELBOW_'+side,(rings[2]+rings[3])/2,'Mid sleeve loft-ring centers; not a validated hinge axis')
 cuff=bpy.data.objects['Cuff | shaped rib knit.'+side];cl,ch=bb(cuff)
 landmark('WRIST_'+side,((cl.x+ch.x)/2,(cl.y+ch.y)/2,cl.z+.03),'Cuff lower edge and hand junction vicinity')
 leg=bpy.data.objects['Trousers.'+side];ll,lh=bb(leg);cx=(ll.x+lh.x)/2
 hip=Vector((cx,.03,lh.z-.08));ankle=Vector((cx,.03,ll.z+.10))
 landmark('HIP_'+side,hip,'Upper trouser bounds; provisional joint center')
 landmark('KNEE_'+side,(hip+ankle)/2,'Mid hip-to-ankle reference; bend axis untested')
 landmark('ANKLE_'+side,ankle,'Lower trouser/ankle vicinity')
 shoe=bpy.data.objects['Shoe upper.'+side];sl,sh=bb(shoe)
 landmark('FOOT_'+side,((sl.x+sh.x)/2,(sl.y+sh.y)/2,sl.z+.08),'Shoe bounds; rigid foot origin candidate')
 landmark('TOE_'+side,((sl.x+sh.x)/2,sl.y+.05,sl.z+.05),'Shoe forward -Y extent; optional foot-roll reference')
col.name='CHARACTER | IDENTITY LOCKED | RIGGING PREP'
root.name='S02_MainCharacter_IDENTITY_LOCKED_RIG_PREP_NOT_RIGGED'
root['approved']=True;root['approval_scope']='Character visual identity ONLY, explicitly approved by user in TASK07.'
root['identity_locked']=True;root['identity_approved_by_user']=True;root['rigged']=False;root['rig_approved']=False;root['export_approved']=False
root['locked_source_commit']='aff455385918d8cb13d72123af824156bd771e6a';root['locked_source_sha256']=hashlib.sha256(BASE.read_bytes()).hexdigest()
root['status']='Identity approved/locked. Static rigging preparation only. No skeleton/weights/expressions/export implemented.'
s['approval_stage']='IDENTITY LOCKED BY USER TASK07 | RIGGING PREP ONLY | FULL RIG AND EXPORT NOT AUTHORIZED'
s.render.filepath='//../evaluation/neutral-three-quarter.png'
bpy.context.view_layer.update()
(R/'docs/hierarchy-bindings.json').write_text(json.dumps({'groups':{k:{'name':o.name,'parent':o.parent.name,'matrixBasis':[list(row) for row in o.matrix_basis],'type':'STATIC_ORGANIZATION_NOT_RIG_CONTROL'} for k,o in groups.items()},'meshes':mapping,'landmarks':landmarks,'rigCreated':False,'skinWeightsCreated':False},indent=2))
approval={'identityStatus':'APPROVED_LOCKED_BY_USER_TASK07','decisionSource':'Explicit user TASK07 decision in this conversation; this record does not approve rigging/export.','approvedSourceBranch':'feature/s02-character-model04-final-polish','approvedSourceCommit':'aff455385918d8cb13d72123af824156bd771e6a','approvedBlend':'modeling-04-final-polish/source/s02-character-model04-final-polish.blend','approvedBlendSHA256':hashlib.sha256(BASE.read_bytes()).hexdigest(),'concept':'Season02_Approved_Character_Concept.png','conceptSHA256':hashlib.sha256((R.parent/'Season02_Approved_Character_Concept.png').read_bytes()).hexdigest(),'identityLocked':True,'rigStatus':'NOT_BUILT_NOT_APPROVED','exportStatus':'NOT_EXPORTED_NOT_APPROVED','animationProductionStatus':'NOT_STARTED','nextGate':'Explicit user approval required before full rigging or GLB export.','historicalApprovalMetadata':'Older modeling files/reports retain their historical UNAPPROVED labels unchanged. This scoped TASK07 decision supersedes them for visual identity only.'}
(R/'docs/identity-lock.json').write_text(json.dumps(approval,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(R/'source/s02-character-rigging-prep.blend'))
print('PREP_SAVED',len(meshes),'meshes',len(groups),'static containers',len(landmarks),'candidate landmarks; no rig')
