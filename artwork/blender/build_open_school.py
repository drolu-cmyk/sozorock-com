"""Editable 2.5D Blender camera projection, preserving each site's approved art.
This is not recovered full architectural geometry. Each .blend packs its raster
and editable relief surface/camera. No third-party models or external media.
"""
import bpy
import math
import os
import subprocess
from mathutils import Vector
ROOT = os.getcwd()
OUT = os.path.join(ROOT,'artwork/blender/generated')
os.makedirs(OUT,exist_ok=True)
US = os.path.join(ROOT,'public/assets/open-school-us-wide.webp')
market = 'us' if os.path.isfile(US) else 'ca'
asset_dir = os.path.join(ROOT,'public/assets' if market == 'us' else 'site/assets')

def render(source, width, height, suffix, name):
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.eevee.taa_render_samples = 8
    scene.eevee.use_gtao = False
    scene.eevee.use_ssr = False
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.render.fps = 24
    scene.frame_start = 1
    scene.frame_end = 96
    # Standard + emission preserves the approved artwork's colour treatment.
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.look = 'None'
    scene.view_settings.exposure = 0
    scene.view_settings.gamma = 1
    png = os.path.join(OUT, suffix+'-approved.png')
    subprocess.run(['ffmpeg','-y','-i',source,png],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    image = bpy.data.images.load(png)
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
    camera.name = 'Four-second looping projection camera'
    camera.data.type = 'ORTHO'
    camera.data.ortho_scale = aspect*.982
    scene.camera = camera
    for frame,x,y in [(1,-.07,-.015),(49,.07,.015),(97,-.07,-.015)]:
        camera.location = (x,y,5)
        camera.rotation_euler = (Vector((0,0,.07))-camera.location).to_track_quat('-Z','Y').to_euler()
        camera.keyframe_insert('location',frame=frame)
        camera.keyframe_insert('rotation_euler',frame=frame)
    scene.render.image_settings.file_format = 'PNG'
    frames = os.path.join(OUT, 'frames-'+suffix)
    os.makedirs(frames,exist_ok=True)
    scene.render.filepath = os.path.join(frames,'frame_')
    scene.frame_set(1)
    scene['medium'] = '2.5D camera projection of approved original artwork'
    scene['market'] = 'United States' if '/public/' in source else 'Canada'
    scene['source_notice'] = 'Not recovered full architectural geometry. Conceptual virtual learning.'
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,name+'.blend'),compress=True)
    bpy.ops.render.render(animation=True)
    
for suffix,width,height,name in [('wide',1280,548,'open-school'),('mobile',720,900,'open-school-mobile')]:
    source = os.path.join(asset_dir,'open-school-'+market+'-'+suffix+'.webp')
    assert os.path.isfile(source), 'Approved local artwork is required'
    render(source,width,height,suffix,name)
