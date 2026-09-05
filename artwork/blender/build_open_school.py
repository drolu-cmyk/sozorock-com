"""Render the approved artwork through a shallow 2.5D Blender projection mesh.

This is an editable camera-projection project, not recovered full architectural
geometry. The original raster is packed unchanged into the .blend. Each repo
uses only its own approved image; there are no external asset downloads.
"""
import bpy
import math
import os
from mathutils import Vector

ROOT = os.getcwd()
US = os.path.join(ROOT, 'public/assets/open-school-us-wide.webp')
CA = os.path.join(ROOT, 'site/assets/open-school-ca-wide.webp')
SOURCE = US if os.path.isfile(US) else CA
assert os.path.isfile(SOURCE), 'Approved local artwork is required'
OUT = os.path.join(ROOT, 'artwork/blender/generated')
os.makedirs(os.path.join(OUT, 'frames'), exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.eevee.taa_render_samples = 8
scene.eevee.use_gtao = False
scene.eevee.use_ssr = False
scene.render.resolution_x = 1280
scene.render.resolution_y = 548
scene.render.resolution_percentage = 100
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = 144
# Standard + emission preserves the approved artwork's colour treatment.
scene.view_settings.view_transform = 'Standard'
scene.view_settings.look = 'Medium High Contrast' if False else 'None'
scene.view_settings.exposure = 0
scene.view_settings.gamma = 1
image = bpy.data.images.load(SOURCE)
image.pack()
aspect = image.size[0] / image.size[1]
material = bpy.data.materials.new('Unchanged approved artwork / camera projection')
material.use_nodes = True
nodes = material.node_tree.nodes
nodes.clear()
output = nodes.new('ShaderNodeOutputMaterial')
emission = nodes.new('ShaderNodeEmission')
texture = nodes.new('ShaderNodeTexImage')
texture.image = image
texture.interpolation = 'Linear'
texture.extension = 'EXTEND'
material.node_tree.links.new(texture.outputs['Color'], emission.inputs['Color'])
material.node_tree.links.new(emission.outputs[0], output.inputs['Surface'])
# A continuous, low-relief mesh: no cutout seams or fabricated moving people.
# Depth is deliberately shallow so the illustration's architecture stays stable.
nx, ny = 100, 48
verts, faces = [], []
for j in range(ny+1):
    v = j/ny
    for i in range(nx+1):
        u = i/nx
        foreground = math.exp(-(((u-.70)/.28)**4 + ((v-.47)/.45)**4))
        z = .14*foreground
        verts.append(((u-.5)*aspect, v-.5, z))
for j in range(ny):
    for i in range(nx):
        a = j*(nx+1)+i
        faces.append((a,a+1,a+nx+2,a+nx+1))
mesh = bpy.data.meshes.new('Shallow relief projection surface')
mesh.from_pydata(verts, [], faces)
mesh.update()
obj = bpy.data.objects.new('Approved artwork projection', mesh)
scene.collection.objects.link(obj)
obj.data.materials.append(material)
uv = mesh.uv_layers.new(name='Original full-frame UV')
for poly in mesh.polygons:
    poly.use_smooth = True
    for loop in poly.loop_indices:
        vertex = mesh.loops[loop].vertex_index
        uv.data[loop].uv = ((vertex % (nx+1))/nx, (vertex // (nx+1))/ny)
bpy.ops.object.camera_add(location=(0,0,5))
camera = bpy.context.object
camera.name = 'Six-second looping projection camera'
camera.data.type = 'ORTHO'
camera.data.ortho_scale = aspect*.982
scene.camera = camera
for frame,x,y in [(1,-.07,-.015),(73,.07,.015),(145,-.07,-.015)]:
    camera.location = (x,y,5)
    camera.rotation_euler = (Vector((0,0,.07))-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.keyframe_insert('location',frame=frame)
    camera.keyframe_insert('rotation_euler',frame=frame)
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = os.path.join(OUT,'frames','frame_')
scene.frame_set(1)
scene['medium'] = '2.5D camera projection of approved original artwork'
scene['market'] = 'United States' if SOURCE == US else 'Canada'
scene['source_notice'] = 'Not recovered full architectural geometry. Conceptual virtual learning.'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,'open-school.blend'),compress=True)
bpy.ops.render.render(animation=True)
