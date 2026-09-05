"""Original, editable four-entrance school scene. No third-party models/textures.

Run with Blender 4.x: blender -b -t 2 -P artwork/blender/build_open_school.py
The render is an architectural interpretation, not the recovered source of the
earlier generated illustration. All meshes, materials and animation are editable.
"""
import bpy
import math
import os
import random
from mathutils import Vector

random.seed(49)
OUT = os.path.abspath('artwork/blender/generated')
os.makedirs(OUT, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.eevee.taa_render_samples = 64
scene.eevee.use_gtao = True
scene.eevee.gtao_distance = 3
scene.eevee.use_soft_shadows = True
scene.eevee.use_ssr = True
scene.render.resolution_x = 1280
scene.render.resolution_y = 720
scene.render.resolution_percentage = 100
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = 96
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.22,.30,.39,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value = .55
scene.view_settings.view_transform = 'AgX'

def material(name, color, metallic=0, rough=.48, texture=False):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*color, 1)
    p.inputs['Metallic'].default_value = metallic
    p.inputs['Roughness'].default_value = rough
    if texture:
        n = m.node_tree.nodes.new('ShaderNodeTexNoise')
        n.inputs['Scale'].default_value = 8
        n.inputs['Detail'].default_value = 3
        bump = m.node_tree.nodes.new('ShaderNodeBump')
        bump.inputs['Strength'].default_value = .17
        bump.inputs['Distance'].default_value = .045
        m.node_tree.links.new(n.outputs['Fac'], bump.inputs['Height'])
        m.node_tree.links.new(bump.outputs['Normal'], p.inputs['Normal'])
    return m

stone = material('Pale limestone', (.55,.58,.59), texture=True)
white = material('Warm travertine', (.76,.72,.62), texture=True)
blue = material('Applied AI / cobalt', (.016,.072,.53), .22, .32, True)
teal = material('Cybersecurity GRC / teal', (.025,.23,.24), .25, .35, True)
silver = material('Identity and access / brushed silver', (.51,.59,.62), .8, .27)
clay = material('AI governance / terracotta', (.52,.12,.047), .08, .45, True)
bronze = material('Door reveal / warm bronze', (.52,.31,.12), .7, .3)
dark = material('Ground / deep ink', (.025,.063,.11), .05, .65)
wood = material('Tree bark', (.12,.07,.03), rough=.8)
leaves = [material('Olive foliage '+str(i), c, rough=.85) for i,c in enumerate([
    (.16,.23,.085),(.22,.29,.12),(.29,.34,.16)])]

def finish(obj, name, mat, bevel=0):
    obj.name = name
    obj.data.materials.append(mat)
    if bevel:
        b = obj.modifiers.new('Soft stone edges', 'BEVEL')
        b.width = bevel
        b.segments = 3
        obj.modifiers.new('Weighted normals', 'WEIGHTED_NORMAL')
    return obj

def box(name, loc, size, mat, bevel=.035):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object
    o.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(o,name,mat,bevel)

def cylinder(name, loc, radius, depth, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=128, radius=radius, depth=depth, location=loc)
    return finish(bpy.context.object,name,mat,.025)

def arc(name, center, inner, outer, height, start, end, mat, base=0):
    steps=max(16,int(abs(end-start)/2))
    verts=[]
    for i in range(steps+1):
        a=math.radians(start+(end-start)*i/steps)
        for r,z in [(inner,base),(outer,base),(outer,base+height),(inner,base+height)]:
            verts.append((center[0]+r*math.cos(a),center[1]+r*math.sin(a),z))
    faces=[(0,3,2,1)]
    for i in range(steps):
        for j in range(4):
            k=i*4+j; q=i*4+(j+1)%4
            faces.append((k,q,q+4,k+4))
    faces.append(tuple(range(steps*4,steps*4+4)))
    mesh=bpy.data.meshes.new(name)
    mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);scene.collection.objects.link(o)
    return finish(o,name,mat,.025)

def arch(name, x,y, scale, mat):
    # A real extruded arch mesh; open doorway remains visible through its depth.
    n=64; verts=[]
    r=1.08*scale; outer=1.5*scale; spring=1.6*scale; depth=.48*scale
    for i in range(n+1):
        a=math.pi*i/n
        for radius,dy in [(r,-depth),(outer,-depth),(outer,depth),(r,depth)]:
            verts.append((x+radius*math.cos(a),y+dy,.38+spring+radius*math.sin(a)))
    faces=[(0,3,2,1)]
    for i in range(n):
        for j in range(4):
            faces.append((i*4+j,i*4+(j+1)%4,(i+1)*4+(j+1)%4,(i+1)*4+j))
    faces.append(tuple(range(n*4,n*4+4)))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new(name,mesh);scene.collection.objects.link(o);finish(o,name,mat,.025)
    for sign in [-1,1]:
        box(name+' pier',(x+sign*(r+outer)/2,y,.38+spring/2),(outer-r,depth*2,spring),mat)

def branch(a,b,r):
    delta=Vector(b)-Vector(a)
    bpy.ops.mesh.primitive_cylinder_add(vertices=9,radius=r,depth=delta.length,location=(Vector(a)+Vector(b))/2)
    o=bpy.context.object;o.rotation_euler=delta.to_track_quat('Z','Y').to_euler()
    finish(o,'Olive branch',wood)

def tree(x,y,z,scale):
    branch((x,y,z),(x+.10*scale,y,z+1.5*scale),.085*scale)
    for i in range(14):
        a=i*2.39996
        radius=random.uniform(.4,.9)*scale
        p=(x+math.cos(a)*radius,y+math.sin(a)*radius,z+random.uniform(1.25,2.25)*scale)
        branch((x+.10*scale,y,z+1.1*scale),p,.024*scale)
        for j in range(3):
            bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=random.uniform(.21,.35)*scale,
                location=(p[0]+random.uniform(-.18,.18)*scale,p[1]+random.uniform(-.18,.18)*scale,p[2]))
            o=bpy.context.object;o.scale=(1.2,.8,.6);finish(o,'Olive canopy',leaves[(i+j)%3])

box('Infinite ink stage',(0,0,-.65),(200,200,.15),dark,0)
cylinder('School plinth',(0,0,-.18),7.25,.9,stone)
cylinder('Shared courtyard',(0,0,.30),6.95,.14,white)
arc('Outer crescent', (0,0),6.45,6.95,1.15,12,162,stone,.37)
arc('Front terrace edge',(0,0),6.85,7.1,.50,190,338,stone,-.05)
for radius,z in [(3.20,.45),(2.83,.35),(2.45,.25)]:
    arc('Forum seating',(0,-.1),radius-.24,radius,.17,5,175,white,z)
cylinder('Central garden rim',(0,-.1,.46),1.3,.19,stone)
cylinder('Garden soil',(0,-.1,.565),1.12,.035,dark)
tree(0,-.1,.60,1.25)
for i in range(15):
    a=i*2.39996
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=.13,location=(math.cos(a),-.1+math.sin(a),.65))
    finish(bpy.context.object,'Garden stone',stone)

arch('Applied AI outer arch',-3.50,2.6,1.22,blue)
arch('Applied AI inner arch',-3.50,3.45,.98,blue)
arc('GRC curved enclosure',(3.05,2.9),1.48,1.90,3.8,-30,215,teal,.38)
box('GRC entrance lintel',(3.05,1.7,3.6),(2.2,.60,.55),teal)
for x in [2.05,4.05]:box('GRC bronze jamb',(x,1.7,1.85),(.16,.65,2.96),bronze)
arc('Governance open rotunda',(3.75,-3.0),1.38,1.78,2.9,-25,280,clay,.38)
for x in [-4.85,-2.55]:box('IAM silver pier',(x,-3.1,1.82),(.52,.62,2.88),silver)
box('IAM silver lintel',(-3.70,-3.1,3.34),(2.82,.62,.22),silver)
for x in [-4.43,-2.97]:box('IAM inner reveal',(x,-3.0,1.70),(.07,.50,2.58),bronze,.01)
for x,y in [(-5.4,.2),(5.4,.2),(-1.4,5.25)]:
    cylinder('Raised garden',(x,y,.52),.68,.3,stone)
    cylinder('Garden inset',(x,y,.68),.60,.035,dark)
    tree(x,y,.7,.55)

def light(name,loc,energy,size,color,target):
    d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.shape='DISK';d.size=size;d.color=color
    o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=loc
    o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()

light('Soft daylight',(-6,-5,12),2200,8,(.79,.88,1),(0,0,0))
light('Warm late light',(4,6,9),2600,7,(1,.76,.48),(0,0,0))
light('Front fill',(0,-10,6),700,7,(.75,.84,1),(0,0,2))
for x,y in [(-3.5,3),(3,2.6),(3.75,-3),(-3.7,-2.8)]:
    light('Warm entrance light',(x,y,2.6),55,1,(1,.55,.22),(x,y-.4,.38))

bpy.ops.object.camera_add()
camera=bpy.context.object;camera.name='Looping architectural camera';scene.camera=camera
camera.data.type='ORTHO';camera.data.ortho_scale=19.4
for frame,angle in [(1,-76),(49,-68),(97,-76)]:
    a=math.radians(angle)
    camera.location=(17*math.cos(a),17*math.sin(a),12)
    camera.rotation_euler=(Vector((0,0,1.05))-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.keyframe_insert('location',frame=frame)
    camera.keyframe_insert('rotation_euler',frame=frame)
scene.render.image_settings.file_format='PNG'
scene.render.filepath=os.path.join(OUT,'frames','frame_')
os.makedirs(os.path.join(OUT,'frames'),exist_ok=True)
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,'open-school.blend'),compress=True)
bpy.ops.render.render(animation=True)
