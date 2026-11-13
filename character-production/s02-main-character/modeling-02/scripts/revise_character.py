"""Modeling-only revision. Load the preserved 01 blend; save only in modeling-02.
All coordinates below describe a designed silhouette, not uncontrolled random blocks.
"""
import bpy,bmesh,math,json,sys
from mathutils import Vector
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT.parent/'modeling-01/source/s02-character-modeling-01.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE))
s=bpy.context.scene
col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY']
root=bpy.data.objects['S02_MainCharacter_UNAPPROVED_UNRIGGED']
root.name='S02_MainCharacter_MODELING_02_UNAPPROVED_UNRIGGED'
# Bake existing object transforms into mesh vertices before editing, preserving geometry.
for obj in list(col.objects):
 if obj.type=='MESH':
  matrix=obj.matrix_world.copy()
  for v in obj.data.vertices:v.co=matrix@v.co
  obj.matrix_world.identity()
M={}
for material in bpy.data.materials:
 for key,prefix in [('skin','Skin |'),('ear','Ear and'),('blush','Cheek |'),('hoodie','Cream hoodie'),('hoodshade','Cream seams'),('cord','Cord cotton'),('inner','Hood lining'),('pants','Charcoal trousers'),('pantshade','Trouser fold'),('pantlight','Trouser seam'),('hair','Black hair'),('hairmid','Hair lit'),('hairdark','Hair shadow'),('white','Warm eye'),('iris','Espresso eye'),('mouth','Mouth line'),('lime','Lime cord'),('olive','Olive shoe upper'),('sole','Olive outsole'),('toecap','Olive toe')]:
  if material.name.startswith(prefix):M[key]=material

def delete_prefix(prefixes):
 for obj in list(col.objects):
  if obj.type=='MESH' and obj.name.startswith(tuple(prefixes)):bpy.data.objects.remove(obj,do_unlink=True)

def mesh(name,vertices,faces,material,bevel=.012,segments=1):
 data=bpy.data.meshes.new(name+' | topology');data.from_pydata(vertices,[],faces);data.update()
 bm=bmesh.new();bm.from_mesh(data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(data);bm.free()
 o=bpy.data.objects.new(name,data);col.objects.link(o);o.parent=root;data.materials.append(M[material])
 if bevel:
  m=o.modifiers.new('Controlled edge refinement','BEVEL');m.width=bevel;m.segments=segments
  m=o.modifiers.new('Weighted planar normals','WEIGHTED_NORMAL');m.keep_sharp=True
 return o

def ring(cx,cy,z,w,d,c=.06):
 # Twelve-point clipped rectangle. Planar face remains broad; corners have two facets.
 x=w/2;y=d/2;c=min(c,x*.45,y*.45)
 pts=[(-x+c,-y),(x-c,-y),(x-c*.293,-y+c*.293),(x,-y+c),(x,y-c),(x-c*.293,y-c*.293),(x-c,y),(-x+c,y),(-x+c*.293,y-c*.293),(-x,y-c),(-x,-y+c),(-x+c*.293,-y+c*.293)]
 return [(cx+a,cy+b,z) for a,b in pts]

def loft(name,rings,material,bevel=.01,segments=1):
 n=len(rings[0]);v=[p for r in rings for p in r];f=[tuple(reversed(range(n)))]
 for j in range(len(rings)-1):
  f.extend((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i) for i in range(n))
 f.append(tuple((len(rings)-1)*n+i for i in range(n)))
 return mesh(name,v,f,material,bevel,segments)

def plate(name,loc,dim,material,bevel=.006,segments=1):
 x,y,z=loc;w,d,h=dim
 return loft(name,[ring(x,y,z-h/2,w,d,min(w,d)*.15),ring(x,y,z+h/2,w,d,min(w,d)*.15)],material,bevel,segments)

def line(name,points,material,radius=.004):
 # Closed editable six-sided tube: shared ring vertices and capped ends.
 rings=[];count=6
 for i,co in enumerate(points):
  tangent=Vector(points[min(i+1,len(points)-1)])-Vector(points[max(0,i-1)])
  tangent.normalize();reference=Vector((0,1,0))
  if abs(tangent.dot(reference))>.97:reference=Vector((1,0,0))
  u=tangent.cross(reference).normalized();v=tangent.cross(u).normalized()
  rings.append([tuple(Vector(co)+radius*(math.cos(2*math.pi*j/count)*u+math.sin(2*math.pi*j/count)*v)) for j in range(count)])
 return loft(name,rings,material,0)

def extrusion(name,profile,front,back,material,bevel=.008):
 v=[(x,y,z) for y in (back,front) for x,z in profile];n=len(profile)
 f=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
 return mesh(name,v,f,material,bevel,2)

# 1. Re-contour jaw/cheeks. Keep original identity features and the supplied palette.
delete_prefix(['Head |','Eye white.','Pupil.','Eye glint.','Brow.','Blush.','Neutral mouth','Nose |'])
loft('Head | refined cheek-jaw planes',[
 ring(0,.01,2.58,1.09,.84,.13),ring(0,-.005,2.625,1.20,.92,.12),
 ring(0,0,2.755,1.30,.985,.10),ring(0,0,2.92,1.325,.99,.095),
 ring(0,0,3.20,1.30,.99,.085),ring(0,.015,3.445,1.265,.96,.09),ring(0,.025,3.54,1.18,.90,.09)],'skin',.022,2)
for side,sign in [('L',-1),('R',1)]:
 x=sign*.314
 plate('Eye white.'+side,(x,-.5005,3.061),(.212,.010,.247),'white',.0025,2)
 plate('Pupil.'+side,(x+.024,-.5085,3.057),(.109,.007,.211),'iris',.0015)
 plate('Eye glint.'+side,(x+.004,-.514,3.133),(.030,.004,.036),'white',.001)
 plate('Upper eyelid.'+side,(x,-.509,3.184),(.212,.009,.017),'skin',.002)
 # Slight angled ends rather than a perfectly rectangular detached eyebrow.
 brow=[(x-.14,3.276),(x+.14,3.274+sign*.009),(x+.135,3.352+sign*.009),(x-.14,3.362)]
 extrusion('Brow.'+side,brow,-.519,-.488,'hair',.004)
 plate('Blush.'+side,(sign*.448,-.499,2.877),(.118,.006,.045),'blush',.004,2)
extrusion('Neutral mouth | original minimal line',[(-.085,2.754),(.084,2.750),(.084,2.765),(-.085,2.771)],-.505,-.493,'mouth',.0015)
mesh('Nose | small faceted bridge',[(-.021,-.495,2.976),(.021,-.495,2.976),(.023,-.522,2.937),(-.023,-.522,2.937),(-.023,-.495,2.937),(.023,-.495,2.937)],[(0,1,2,3),(3,2,5,4),(0,3,4),(1,5,2),(0,4,5,1)],'skin',.003,2)

# 2. Hair: directed sweep ribbons and sculpted multilevel tufts, not rows of equal cuboids.
delete_prefix(['Hair |','Hair back cap'])
loft('Hair | fitted dark foundation',[
 ring(0,.24,2.81,1.16,.63,.10),ring(0,.18,3.18,1.43,.88,.10),
 ring(0,.13,3.53,1.48,.99,.10),ring(0,.13,3.76,1.29,.87,.10),ring(0,.12,3.87,1.04,.70,.08)],'hairdark',.012)

def sweep(name,centers,heights,depths,material):
 # YZ cross-sections along X; broad planar steps sweep in depth and height.
 rings=[]
 for (x,y,z),h,d in zip(centers,heights,depths):
  c=.024;hy=d/2;hz=h/2
  rings.append([(x,y-hy+c,z-hz),(x,y+hy-c,z-hz),(x,y+hy,z-hz+c),(x,y+hy,z+hz-c),(x,y+hy-c,z+hz),(x,y-hy+c,z+hz),(x,y-hy,z+hz-c),(x,y-hy,z-hz+c)])
 return loft('Hair | '+name,rings,material,.009)

sweep('primary swept fringe',[(-.70,-.385,3.27),(-.62,-.49,3.46),(-.37,-.525,3.58),(-.09,-.55,3.565),(.20,-.55,3.46),(.50,-.49,3.40)],[.17,.25,.235,.21,.20,.12],[.23,.25,.27,.27,.24,.18],'hair')
sweep('upper offset sweep',[(-.65,-.23,3.53),(-.48,-.36,3.72),(-.21,-.405,3.79),(.12,-.425,3.73),(.43,-.39,3.59)],[.19,.23,.24,.21,.16],[.35,.36,.38,.35,.28],'hairmid')
sweep('left lifted crest',[(-.56,.03,3.71),(-.40,-.02,3.92),(-.14,.00,3.96),(.13,.02,3.88),(.34,.07,3.77)],[.17,.23,.24,.21,.17],[.43,.46,.46,.43,.37],'hair')
sweep('parted right ridge',[(.16,-.03,3.79),(.38,-.05,3.81),(.61,-.02,3.72),(.72,.04,3.58)],[.20,.23,.21,.14],[.44,.45,.43,.34],'hairmid')
sweep('rear crown fan',[(-.50,.38,3.65),(-.27,.39,3.83),(.02,.40,3.83),(.28,.41,3.75),(.48,.43,3.64)],[.18,.23,.23,.22,.16],[.40,.43,.42,.40,.34],'hair')
sweep('right tucked forelock',[(.20,-.40,3.61),(.43,-.49,3.50),(.65,-.34,3.43)],[.17,.18,.18],[.30,.28,.25],'hair')
# Tapered side locks follow forehead / temple / occiput, breaking the cap silhouette.
for side,sign in [('L',-1),('R',1)]:
 layouts=[
  ('sideburn',.678,-.292,2.91,3.35,.23,.31),
  ('temple',.744,-.27,3.23,3.60,.24,.34),
  ('high-side',.716,.035,3.49,3.82,.26,.41),
  ('mid-side',.789,.055,3.20,3.57,.23,.40),
  ('low-side',.738,.165,3.01,3.29,.23,.32),
  ('rear-high',.665,.415,3.45,3.75,.28,.39),
  ('rear-middle',.737,.412,3.17,3.51,.25,.38),
  ('rear-low',.623,.40,2.81,3.25,.25,.33),
 ]
 for idx,(name,x,y,z0,z1,w,d) in enumerate(layouts):
  offset=.018 if sign<0 and idx%2 else -.008
  loft(f'Hair | {side} {name}',[
   ring(sign*(x-.045),y+.025,z0+offset,w*.73,d*.79,.035),
   ring(sign*x,y,z0+(z1-z0)*.36+offset,w,d,.045),
   ring(sign*(x-.019),y-.022,z1+offset,w*.89,d*.91,.04)],['hair','hairmid','hairdark'][idx%3],.011)
# Back mosaic: staggered overlapping tufts, with a nape taper and no exposed large shell patch.
for tier,(z,w,h,y) in enumerate([(2.85,.34,.41,.60),(3.30,.39,.35,.68),(3.58,.42,.34,.67)]):
 for idx,x in enumerate([-.47,-.17,.16,.46]):
  shift=[.025,-.035,.035,-.02][idx]
  loft(f'Hair | back tier {tier+1} tuft {idx+1}',[
   ring(x+.025,y-.015,z+shift,w*.78,.20,.035),
   ring(x,y+.018,z+h*.45+shift,w,.26,.04),
   ring(x-.035,y-.005,z+h+shift,w*.90,.24,.04)],'hairmid' if (idx+tier)%3==0 else 'hair',.009)

# 3. Garment: continuous sleeve contour, draped hood and a single shaped kangaroo pouch.
delete_prefix(['Hoodie torso','Hoodie rib hem','Kangaroo pocket','Pocket front','Pocket seam','Hood back','Open hood','Hood front','Cord cotton.','Lime cord end.','Cord eyelet.','Upper sleeve.','Fore sleeve.','Wide cuff.','Cuff face.','Outer seam.'])
loft('Hoodie torso | shoulder-chest-waist contour',[
 ring(0,.025,1.46,.92,.55,.075),ring(0,.015,1.57,.965,.59,.08),ring(0,.015,1.76,.95,.605,.085),
 ring(0,.02,1.98,.945,.60,.085),ring(0,.04,2.21,1.00,.60,.09),ring(0,.065,2.365,.89,.53,.085),ring(0,.06,2.475,.56,.405,.07)],'hoodie',.018,2)
loft('Hoodie hem | rib band',[ring(0,.02,1.46,.935,.57,.08),ring(0,.02,1.555,.953,.58,.08)],'hoodshade',.008,2)
line('Hem seam | front',[(-.38,-.279,1.55),(0,-.289,1.55),(.38,-.279,1.55)],'hoodie',.004)
profile=[(-.305,1.665),(.305,1.665),(.31,1.785),(.22,1.92),(-.22,1.92),(-.31,1.785)]
extrusion('Kangaroo pouch | tailored angled silhouette',profile,-.348,-.291,'hoodie',.012)
line('Pouch bottom stitch',[(-.25,-.352,1.685),(0,-.357,1.681),(.25,-.352,1.685)],'hoodshade',.0035)
for side,sign in [('L',-1),('R',1)]:
 line('Pouch hand opening.'+side,[(sign*.297,-.353,1.765),(sign*.264,-.356,1.835),(sign*.221,-.353,1.904)],'inner',.006)
 line('Pouch opening stitch.'+side,[(sign*.278,-.355,1.76),(sign*.245,-.358,1.829),(sign*.208,-.355,1.889)],'hoodshade',.003)
# Dropped back hood. Its lower tip narrows and the rim is a real hollow opening.
loft('Hood | draped back shell',[
 ring(0,.245,2.10,.38,.23,.055),ring(0,.335,2.205,.56,.36,.07),ring(0,.325,2.36,.73,.44,.085),ring(0,.22,2.545,.78,.50,.09)],'hoodie',.018,2)
outer=ring(0,.025,2.53,.80,.62,.10);inner=ring(0,.025,2.54,.45,.36,.08)
# Back of neckline rises; front drops to a shallow V.
def shaped(points):
 return [(x,y,z+max(0,y)*.19-max(0,-y)*.08) for x,y,z in points]
outer=shaped(outer);inner=shaped(inner);n=len(outer)
v=outer+inner+[(x,y,z-.075) for x,y,z in outer]+[(x,y,z-.075) for x,y,z in inner];f=[]
for i in range(n):
 j=(i+1)%n;f += [(i,j,n+j,n+i),(i,2*n+i,2*n+j,j),(n+i,n+j,3*n+j,3*n+i),(2*n+i,3*n+i,3*n+j,2*n+j)]
mesh('Hood | open layered rim',v,f,'hoodie',.014,2)
line('Hood back seam',[(0,.373,2.115),(0,.526,2.225),(0,.549,2.365),(0,.47,2.52)],'hoodshade',.004)
for side,sign in [('L',-1),('R',1)]:
 # Neck folded lip is a tapered strip, not two shirt-collar rectangles.
 extrusion('Hood | front folded lip.'+side,[(sign*.39,2.53),(sign*.18,2.465),(sign*.025,2.438),(sign*.155,2.41),(sign*.37,2.456)],-.311,-.215,'hoodie',.013)
 plate('Cord eyelet.'+side,(sign*.195,-.319,2.477),(.059,.012,.045),'inner',.005,2)
 line('Cord cotton.'+side,[(sign*.195,-.329,2.485),(sign*.193,-.342,2.30),(sign*.202,-.348,2.135),(sign*.198,-.353,1.998)],'cord',.018)
 plate('Lime cord end.'+side,(sign*.198,-.353,1.999),(.055,.055,.092),'lime',.005,2)
 loft('Sleeve | continuous shaped elbow.'+side,[
  ring(sign*.65,-.018,1.645,.33,.39,.055),ring(sign*.646,.006,1.80,.34,.41,.06),ring(sign*.62,.041,1.94,.352,.43,.065),
  ring(sign*.602,.045,2.035,.36,.435,.065),ring(sign*.575,.035,2.18,.36,.435,.07),ring(sign*.495,.04,2.35,.34,.415,.065)],'hoodie',.018,2)
 loft('Cuff | shaped rib knit.'+side,[ring(sign*.65,-.025,1.51,.368,.42,.055),ring(sign*.65,-.025,1.55,.38,.43,.055),ring(sign*.65,-.025,1.705,.37,.425,.055)],'hoodshade',.011,2)
 for j in range(6):
  x=sign*.65-.135+j*.054
  line(f'Cuff rib.{side}.{j}',[(x,-.241,1.55),(x,-.241,1.675)],'hoodie',.0025)
 line('Shoulder seam.'+side,[(sign*.42,-.165,2.365),(sign*.53,-.18,2.28),(sign*.59,-.18,2.15)],'hoodshade',.0035)
 line('Trouser outer seam.'+side,[(sign*.444,.07,.46),(sign*.425,.07,.80),(sign*.455,.07,1.05),(sign*.462,.07,1.40)],'pantlight',.0025)
# Retained hand silhouettes: soften only tiny manufacturing edges, not into rounded clay.
for o in col.objects:
 if o.type=='MESH' and o.name.startswith(('Palm.','Thumb.','Ear.')):
  for mod in o.modifiers:
   if mod.type=='BEVEL':mod.width=.016;mod.segments=2

# 4. Explicit measured 3.65-head proportion. Uniform head scaling preserves facial aspect.
head_prefixes=('Head |','Ear.','Ear inner.','Eye white.','Upper eyelid.','Pupil.','Eye glint.','Brow.','Blush.','Neutral mouth','Nose |','Hair |')
bpy.context.view_layer.update()
head=[o for o in col.objects if o.type=='MESH' and o.name.startswith(head_prefixes)]
head_top=max((o.matrix_world@Vector(v)).z for o in head for v in o.bound_box)
chin=2.58;floor=.035;scale_head=.78;target=3.65
head_height=(head_top-chin)*scale_head
body_z=(target-1)*head_height/(chin-floor)
new_chin=floor+(chin-floor)*body_z
for o in list(col.objects):
 if o.type!='MESH':continue
 is_head=o in head
 for v in o.data.vertices:
  p=v.co
  if is_head:p.x*=scale_head;p.y*=scale_head;p.z=new_chin+(p.z-chin)*scale_head
  else:p.x*=.95;p.z=floor+(p.z-floor)*body_z
 # Account for coordinate scaling in small bevel widths only, not topology.
 for mod in o.modifiers:
  if mod.type=='BEVEL' and is_head:mod.width*=scale_head
# Slightly shorten shoe depth about the ankle to balance the revised leg/head ratio.
for o in col.objects:
 if o.type=='MESH' and o.name.startswith(('Outsole.','Shoe upper.','Toe panel.','Ankle collar.','Tongue.','Toe stitch.')):
  for v in o.data.vertices:v.co.y=.05+(v.co.y-.05)*.94
bpy.context.view_layer.update()
height=new_chin+head_height-floor
center=floor+height/2
cam=s.camera;cam.data.ortho_scale=height*1.19;cam.data.clip_end=5000
views={'front':(0,-10,center+.72),'side':(10,0,center+.72),'three-quarter':(-6.5,-9,center+1.30),'back':(0,10,center+.72)}
def set_view(name):
 cam.location=views[name];cam.rotation_euler=(Vector((0,0,center))-cam.location).to_track_quat('-Z','Y').to_euler()
set_view('three-quarter')
s.cycles.samples=96;s.cycles.use_denoising=False;s.render.threads=2
s.render.resolution_x=960;s.render.resolution_y=1200;s.render.resolution_percentage=100
s['approval_stage']='MODELING 02 | unapproved shape review only'
root['approved']=False;root['rigged']=False;root['head_count_measured']=target
root['status']='Revised modeling study only. Production topology / deformation / rig not approved.'
s.render.filepath=str(ROOT/'evaluation/three-quarter.png')
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/s02-character-modeling-02.blend'))
report={'stage':'modeling revision 02 / awaiting visual review','approved':False,'rigged':False,'GLBExported':False,'headCountDefinition':'floor-to-crown height / crown-to-chin height','headCount':height/head_height,'height':height,'headHeight':head_height,'headScaleUniform':scale_head,'bodyVerticalScale':body_z,'materialPaletteChanged':False,'baseSource':str(BASE.relative_to(ROOT.parent)),'blender':bpy.app.version_string,'renderResolution':[960,1200],'camera':'orthographic, same framing scale across all four views','conceptBinaryAvailable':False}
(ROOT/'docs/revision-metadata.json').write_text(json.dumps(report,indent=2)+'\n')
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['front','side','three-quarter','back']
for name in args:
 if name=='--build-only':continue
 set_view(name);s.render.filepath=str(ROOT/f'evaluation/{name}.png');bpy.ops.render.render(write_still=True)
