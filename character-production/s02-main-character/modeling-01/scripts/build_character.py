"""Reference-guided polygon modeling study. No armature, animation or GLB export.
Front is -Y. Units meters, stylized 3.9-unit figure. Rebuilds only this file's scene.
"""
import bpy, bmesh, math, json, sys
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for d in list(bpy.data.materials): bpy.data.materials.remove(d)
scene=bpy.context.scene
scene.unit_settings.system='METRIC'
scene.render.engine='CYCLES'; scene.cycles.device='CPU';scene.cycles.samples=96
scene.cycles.use_denoising=False # This Blender build has no OpenImageDenoise support.
scene.render.threads_mode='FIXED';scene.render.threads=2
scene.render.resolution_x=960;scene.render.resolution_y=1200;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=-.15
scene.world.color=(.12,.12,.12)
world=scene.world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs['Color'].default_value=(.12,.14,.16,1);world.node_tree.nodes['Background'].inputs['Strength'].default_value=.25

def linear(v):return v/12.92 if v<.04045 else ((v+.055)/1.055)**2.4

def mat(name,h,rough=.78,fabric=False):
 m=bpy.data.materials.new(name);m.diffuse_color=tuple(linear(int(h[i:i+2],16)/255) for i in (0,2,4))+(1,)
 m.use_nodes=True;n=m.node_tree.nodes;bs=n.get('Principled BSDF');bs.inputs['Base Color'].default_value=m.diffuse_color;bs.inputs['Roughness'].default_value=rough;bs.inputs['Specular IOR Level'].default_value=.25
 if fabric:
  tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=180;tex.inputs['Detail'].default_value=2
  bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.12;bump.inputs['Distance'].default_value=.006
  m.node_tree.links.new(tex.outputs['Fac'],bump.inputs['Height']);m.node_tree.links.new(bump.outputs['Normal'],bs.inputs['Normal'])
 return m
M={
 'skin':mat('Skin | reference F2C8A0','F2C8A0'),
 'ear':mat('Ear and thumb shade','DDAE86'),
 'blush':mat('Cheek | muted D69A77','D69A77'),
 'hoodie':mat('Cream hoodie | reference F5EBDD','F5EBDD',.86,True),
 'hoodshade':mat('Cream seams and ribbing','D9CDB8',.88,True),
 'hoodlight':mat('Cord cotton','EEE3CE',.87,True),
 'hoodinner':mat('Hood lining','C4B69D',.91,True),
 'pants':mat('Charcoal trousers | reference 2B2B2B','2B2B2B',.87,True),
 'pantshade':mat('Trouser fold facets','242523',.9,True),
 'pantlight':mat('Trouser seam','363731',.9,True),
 'hair':mat('Black hair | reference 1A140F','1A140F',.78),
 'hairmid':mat('Hair lit facets','241C16',.8),
 'hairdark':mat('Hair shadow facets','14110E',.84),
 'white':mat('Warm eye whites','FFFAF0',.7),
 'iris':mat('Espresso eye','211B15',.73),
 'mouth':mat('Mouth line','75492E',.85),
 'lime':mat('Lime cord ends | reference B4CE43','B4CE43',.78),
 'olive':mat('Olive shoe upper','A1A13A',.82),
 'sole':mat('Olive outsole','72752D',.9),
 'toecap':mat('Olive toe panel','AFB33E',.83),
 'floor':mat('Warm charcoal stage','24272A',.92),
}
char=bpy.data.collections.new('CHARACTER | MODELING REVIEW ONLY');scene.collection.children.link(char)
studio=bpy.data.collections.new('STUDIO | render setup');scene.collection.children.link(studio)
root=bpy.data.objects.new('S02_MainCharacter_UNAPPROVED_UNRIGGED',None);char.objects.link(root)
root['status']='Modeling evaluation only — awaiting shape approval. No rig. No production readiness claim.'
root['visual_authority']='Approved Season 02 character design sheet in user message'
root['identity_authority']='Original Season 01 PixelCharacter.tsx and colors.ts (read only)'

def place(obj,collection=char,parent=root):
 for c in list(obj.users_collection):c.objects.unlink(obj)
 collection.objects.link(obj)
 if parent:obj.parent=parent
 return obj

def finish(obj,name,material,bevel=.012):
 obj.name=name;obj.data.materials.append(M[material]);place(obj)
 if bevel:
  mod=obj.modifiers.new('Small manufactured edge bevel | one facet','BEVEL');mod.width=bevel;mod.segments=1
  mod=obj.modifiers.new('Weighted planar normals','WEIGHTED_NORMAL');mod.keep_sharp=True;mod.weight=40
 return obj

def mesh(name,verts,faces,material,bevel=.008):
 data=bpy.data.meshes.new(name+' topology');data.from_pydata(verts,[],faces);data.update();bm=bmesh.new();bm.from_mesh(data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(data);bm.free();o=bpy.data.objects.new(name,data);char.objects.link(o)
 return finish(o,name,material,bevel)

def rect_ring(cx,cy,z,w,d,ch=.06):
 x=w/2;y=d/2;c=min(ch,x*.4,y*.4)
 return [(cx-x+c,cy-y,z),(cx+x-c,cy-y,z),(cx+x,cy-y+c,z),(cx+x,cy+y-c,z),(cx+x-c,cy+y,z),(cx-x+c,cy+y,z),(cx-x,cy+y-c,z),(cx-x,cy-y+c,z)]

def loft(name,rings,material,bevel=.009):
 # Structured chamfered contours: garment volume is shaped per level, not a cube body.
 verts=[v for r in rings for v in r];n=len(rings[0]);faces=[tuple(reversed(range(n)))]
 for j in range(len(rings)-1):
  for i in range(n):faces.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
 faces.append(tuple((len(rings)-1)*n+i for i in range(n)))
 return mesh(name,verts,faces,material,bevel)

def panel(name,loc,dim,material,bevel=.008,rot=None):
 # Extruded silhouette, with deliberately narrow hard edge bevels.
 x,y,z=loc;w,d,h=dim
 o=loft(name,[rect_ring(x,y,z-h/2,w,d,min(w,d)*.09),rect_ring(x,y,z+h/2,w,d,min(w,d)*.09)],material,bevel)
 if rot:
  # Move pivot to actual center before rotation so decorative locks stay attached.
  for v in o.data.vertices:v.co-=Vector(loc)
  o.location=loc;o.rotation_euler=rot
 return o

# LEGS: tapered polygon trousers with subtle knee and hem folds.
for side,s in [('L',-1),('R',1)]:
 x=s*.255
 loft('Trousers.'+side,[rect_ring(x,.055,.34,.365,.40,.045),rect_ring(x,.055,.43,.38,.42,.04),rect_ring(x,-.005,.79,.355,.39,.04),rect_ring(x,.025,1.03,.40,.435,.045),rect_ring(x,.035,1.53,.425,.45,.045)],'pants',.014)
 panel('Hem fold.'+side,(x,-.01,.425),(.38,.43,.11),'pantshade',.006)
 panel('Outer seam.'+side,(x+s*.183,.02,.9),(.018,.03,.77),'pantlight',.003)
 # Shoes: layered soles, angular toe, tongue and ankle collar, explicitly shaped footprint.
 loft('Outsole.'+side,[rect_ring(x,-.12,.035,.45,.76,.055),rect_ring(x,-.12,.105,.47,.77,.055)],'sole',.012)
 loft('Shoe upper.'+side,[rect_ring(x,-.12,.11,.465,.765,.055),rect_ring(x,-.14,.265,.45,.73,.05),rect_ring(x,.04,.36,.37,.39,.035)],'olive',.012)
 panel('Toe panel.'+side,(x,-.385,.223),(.435,.19,.19),'toecap',.009)
 panel('Ankle collar.'+side,(x,.055,.35),(.40,.38,.10),'olive',.009)
 panel('Tongue.'+side,(x,-.115,.335),(.23,.12,.085),'toecap',.007)
 # restrained seam across toe; not sporty extra laces absent from reference
 panel('Toe stitch.'+side,(x,-.487,.245),(.35,.007,.012),'olive',.002)

# BODY: silhouette broadens toward the shoulders, chest front flat for voxel identity.
loft('Hoodie torso | shaped cloth shell',[
 rect_ring(0,.025,1.46,.91,.54,.08),rect_ring(0,.015,1.57,.95,.58,.075),
 rect_ring(0,.015,1.94,.94,.59,.07),rect_ring(0,.035,2.21,1.005,.59,.075),
 rect_ring(0,.06,2.40,.86,.50,.07),rect_ring(0,.06,2.48,.56,.40,.06)],'hoodie',.018)
loft('Hoodie rib hem', [rect_ring(0,.02,1.46,.925,.56,.065),rect_ring(0,.02,1.57,.95,.57,.065)],'hoodshade',.009)
# Front kangaroo pocket: slanted upper corners, recessed lip and stitched panel.
verts=[(-.32,-.302,1.68),(.32,-.302,1.68),(.32,-.302,1.84),(.24,-.302,1.91),(-.24,-.302,1.91),(-.32,-.302,1.84)]
verts+=[(x,y-.038,z) for x,y,z in verts]
faces=[(5,4,3,2,1,0),(6,7,8,9,10,11)]+[(i,(i+1)%6,(i+1)%6+6,i+6) for i in range(6)]
mesh('Kangaroo pocket | angled opening',verts,faces,'hoodshade',.007)
panel('Pocket front',(0,-.347,1.775),(.54,.014,.155),'hoodie',.004)
panel('Pocket seam',(0,-.36,1.695),(.49,.009,.009),'hoodinner',.001)

# Neck and layered hood: open faceted ring, actual hollow geometry, folded back volume.
loft('Neck',[rect_ring(0,.04,2.39,.36,.33,.04),rect_ring(0,.04,2.77,.36,.34,.04)],'skin',.015)
# Hood back is a low-poly draped volume rather than a rounded pillow.
loft('Hood back folded fabric',[
 rect_ring(0,.225,2.15,.43,.29,.05),rect_ring(0,.29,2.27,.66,.42,.06),rect_ring(0,.235,2.48,.79,.48,.055),rect_ring(0,.15,2.55,.69,.42,.05)],'hoodie',.014)
# An eight-sided open collar ring with thickness and sloped interior.
outer=rect_ring(0,.025,2.49,.82,.62,.10);inner=rect_ring(0,.025,2.505,.47,.39,.06)
verts=outer+inner+[(x,y,z-.09) for x,y,z in outer]+[(x,y,z-.09) for x,y,z in inner]
faces=[]
for i in range(8):
 j=(i+1)%8;faces += [(i,j,8+j,8+i),(i,16+i,16+j,j),(8+i,8+j,24+j,24+i),(16+i,24+i,24+j,16+j)]
mesh('Open hood collar | thick faceted fabric',verts,faces,'hoodshade',.01)
for side,s in [('L',-1),('R',1)]:
 # Two folded front lips overlap naturally at the sternum.
 profile=[(s*.40,2.515),(s*.15,2.445),(s*.035,2.375),(s*.20,2.375),(s*.39,2.435)]
 verts=[(x,y,z) for y in [-.185,-.31] for x,z in profile]
 faces=[tuple(reversed(range(5))),tuple(range(5,10))]+[(i,(i+1)%5,(i+1)%5+5,i+5) for i in range(5)]
 mesh('Hood front folded rim.'+side,verts,faces,'hoodie',.012)
 panel('Cord cotton.'+side,(s*.198,-.326,2.18),(.039,.043,.48),'hoodlight',.006)
 panel('Lime cord end.'+side,(s*.198,-.335,1.953),(.064,.062,.105),'lime',.005)
 panel('Cord eyelet.'+side,(s*.198,-.323,2.421),(.064,.019,.053),'hoodinner',.005)

# SLEEVES: custom contour loft, slightly bent elbows with generous hoodie cuffs.
for side,s in [('L',-1),('R',1)]:
 loft('Upper sleeve.'+side,[rect_ring(s*.61,.055,1.91,.37,.43,.055),rect_ring(s*.59,.035,2.13,.36,.44,.055),rect_ring(s*.49,.04,2.35,.34,.43,.055)],'hoodie',.015)
 loft('Fore sleeve.'+side,[rect_ring(s*.65,-.015,1.61,.34,.40,.045),rect_ring(s*.65,.01,1.78,.34,.42,.045),rect_ring(s*.61,.055,1.98,.35,.42,.045)],'hoodie',.012)
 loft('Wide cuff.'+side,[rect_ring(s*.65,-.025,1.51,.38,.435,.045),rect_ring(s*.65,-.025,1.72,.38,.435,.045)],'hoodshade',.008)
 panel('Cuff face.'+side,(s*.65,-.25,1.61),(.33,.018,.16),'hoodie',.004)
 # Unified palm with a stepped thumb cut into the silhouette, not detached cubes.
 cx=s*.65;z=1.40
 poly=[(-.115,-.14),(.075,-.14),(.11,-.09),(.11,.09),(.07,.13),(-.115,.13)]
 verts=[(cx+s*x,y,z+zz) for y in [-.15,.115] for x,zz in poly]
 faces=[tuple(reversed(range(6))),tuple(range(6,12))]+[(i,(i+1)%6,(i+1)%6+6,i+6) for i in range(6)]
 mesh('Palm.'+side,verts,faces,'skin',.011)
 panel('Thumb.'+side,(cx-s*.11,-.171,1.405),(.095,.10,.17),'skin',.014)
 panel('Finger crease.'+side,(cx+s*.067,-.157,1.335),(.04,.006,.009),'ear',.001)

# HEAD: broad cheek planes and clipped chin corners. Hard-surface silhouette, no clay smoothing.
loft('Head | cheek and jaw topology',[
 rect_ring(0,0,2.655,1.12,.84,.065),rect_ring(0,-.015,2.735,1.25,.96,.06),
 rect_ring(0,0,2.93,1.30,.99,.045),rect_ring(0,0,3.36,1.30,.99,.045),
 rect_ring(0,.015,3.61,1.25,.96,.055)],'skin',.017)
for side,s in [('L',-1),('R',1)]:
 panel('Ear.'+side,(s*.66,.0,3.05),(.145,.27,.285),'skin',.018)
 panel('Ear inner.'+side,(s*.726,-.025,3.05),(.008,.14,.15),'ear',.006)
 # Rectangular whites, tall black pupils and small glints preserve the pixel identity.
 panel('Eye white.'+side,(s*.337,-.505,3.14),(.205,.021,.255),'white',.002)
 panel('Pupil.'+side,(s*.337+.025,-.519,3.137),(.103,.014,.217),'iris',.0015)
 panel('Eye glint.'+side,(s*.337+.002,-.528,3.215),(.032,.005,.041),'white',.001)
 panel('Brow.'+side,(s*.337,-.528,3.375),(.29,.044,.089),'hair',.003,rot=(0, s*-.045,0))
 panel('Blush.'+side,(s*.455,-.503,2.946),(.145,.009,.059),'blush',.002)
panel('Neutral mouth',(0,-.505,2.827),(.179,.013,.018),'mouth',.002)
# Subtle angular nose, tiny enough not to turn the face into a realistic sculpt.
mesh('Nose | restrained wedge',[(-.024,-.5,3.035),(.023,-.5,3.035),(.023,-.532,2.993),(-.024,-.532,2.993),(-.024,-.5,2.993),(.023,-.5,2.993)],[(0,1,2,3),(3,2,5,4),(0,3,4),(1,5,2),(0,4,5,1)],'skin',.002)

# HAIR: fitted sculpted cap plus deliberate asymmetrical stepped locks.
# Back and side shell follows skull; hidden seams overlap into one connected visual mass.
loft('Hair back cap',[
 rect_ring(0,.24,2.995,1.27,.64,.075),rect_ring(0,.19,3.15,1.47,.86,.065),
 rect_ring(0,.14,3.53,1.54,.99,.065),rect_ring(0,.12,3.78,1.39,.92,.06),
 rect_ring(0,.12,3.91,1.14,.74,.05)],'hairdark',.011)
# Crown is a modeled crest with stepped silhouette, offset toward the character's right.
locks=[
 ('Crown upper left',(-.37,.035,3.94),(.43,.84,.18),'hairmid'),
 ('Crown central',(.04,.03,3.90),(.50,.80,.16),'hair'),
 ('Crown right',(.42,.06,3.86),(.37,.76,.19),'hairmid'),
 ('Crown back',(.08,.44,3.77),(.95,.32,.25),'hair'),
 ('Top front sweep',(-.17,-.405,3.77),(.92,.33,.23),'hair'),
 ('Part ledge',(.43,-.36,3.66),(.56,.37,.19),'hairmid'),
 ('Left step outer',(-.67,-.21,3.57),(.30,.62,.35),'hairmid'),
 ('Left sweep',(-.43,-.49,3.60),(.54,.25,.29),'hair'),
 ('Front left lock',(-.61,-.50,3.41),(.25,.29,.31),'hairdark'),
 ('Front center sweep',(-.08,-.515,3.57),(.52,.25,.18),'hairmid'),
 ('Right fringe',(.39,-.50,3.52),(.57,.26,.18),'hair'),
 ('Right temple',(.678,-.23,3.31),(.21,.47,.49),'hairdark'),
 ('Left sideburn',(-.68,-.255,3.17),(.23,.36,.48),'hair'),
 ('Left lower lock',(-.704,.13,3.17),(.24,.34,.32),'hairmid'),
 ('Left back step',(-.64,.43,3.39),(.30,.35,.43),'hair'),
 ('Right side layered',(.73,.12,3.51),(.20,.52,.34),'hairmid'),
 ('Back ridge',(.03,.64,3.56),(1.29,.25,.27),'hair'),
 ('Back lower',(.0,.59,3.21),(1.13,.27,.31),'hairmid'),
]
for name,loc,dim,material in locks:panel('Hair | '+name,loc,dim,material,.01)
# Small planar groove at the part is shadow geometry, not a painted black stripe.
panel('Hair | side part recess',(.28,-.536,3.727),(.055,.022,.102),'hairdark',.002)

# Close the neck gap toward the approved tucked-hood silhouette.
head_prefixes=('Head |','Ear.','Ear inner.','Eye white.','Pupil.','Eye glint.','Brow.','Blush.','Neutral mouth','Nose |','Hair |','Hair back cap')
for obj in char.objects:
 if obj.name.startswith(head_prefixes):obj.location.z-=.075

# Studio floor and camera: same lights and scale for every angle.
bpy.ops.mesh.primitive_plane_add(size=2000,location=(0,0,.035));floor=bpy.context.object;floor.name='Evaluation floor';floor.data.materials.append(M['floor']);place(floor,studio,None)
def area(name,loc,power,size,color,target=(0,0,2)):
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='DISK';d.size=size;d.color=color
 o=bpy.data.objects.new(name,d);studio.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
area('Warm large key',(-3.4,-4.5,6.5),550,4.2,(1,.85,.66))
area('Soft neutral fill',(4,-2.8,4.1),180,4.0,(.90,.93,1))
area('Warm rim',(2.5,3.1,5.3),650,3.0,(1,.69,.40))
area('Front eye bounce',(-.2,-4.2,2.1),65,3.0,(1,.95,.88))
camdata=bpy.data.cameras.new('Evaluation camera');cam=bpy.data.objects.new('Evaluation camera',camdata);studio.objects.link(cam);scene.camera=cam
camdata.type='ORTHO';camdata.ortho_scale=4.65;camdata.lens=65;camdata.clip_end=5000
views={'front':(0,-8,2.6),'side':(8,0,2.6),'three-quarter':(5.7,-8,3.7),'back':(0,8,2.6)}
# Orthographic technical angles at near eye-level to expose proportions. 3/4 is mildly elevated.
def set_view(name):
 cam.location=views[name];target=Vector((0,0,1.98));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler()
set_view('three-quarter')
scene['approval_stage']='SHAPE REVIEW — stop before rigging'
scene['prohibited_next_steps']='Do not rig, export production GLB or animate until user approves shape.'
scene.render.filepath=str(ROOT/'evaluation/three-quarter.png')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/s02-character-modeling-01.blend'))
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
selected=args or ['front','side','three-quarter']
for name in selected:
 if name=='--build-only':continue
 set_view(name);scene.render.filepath=str(ROOT/f'evaluation/{name}.png');bpy.ops.render.render(write_still=True)
report={'stage':'shape evaluation only','approved':False,'rigged':False,'productionGLBExported':False,'blender':bpy.app.version_string,'meshObjects':len([o for o in char.objects if o.type=='MESH']),'palette':{k:list(v.diffuse_color) for k,v in M.items()},'views':selected,'characterHeightApprox':3.92,'orientation':'front=-Y, up=Z','notes':['Reference-matched polygon lofts, chamfered planes and asymmetrical layered hair.','Separate connected-looking components for modeling; deformation topology and joint binding deliberately deferred.','Source Season 01 read only; no previous S02 work overwritten.']}
(ROOT/'docs/model-manifest.json').write_text(json.dumps(report,indent=2))
