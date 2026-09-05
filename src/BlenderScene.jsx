import {useEffect, useRef, useState} from 'react';

/** Opt-in real rendered motion. The approved still never depends on video. */
export function BlenderScene({heroRef, reducedMotion}) {
  const videoRef=useRef(null);
  const [enabled,setEnabled]=useState(false);
  const [visible,setVisible]=useState(true);
  const [foreground,setForeground]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting));
    if(heroRef.current)observer.observe(heroRef.current);
    const visibility=()=>setForeground(!document.hidden);
    visibility();document.addEventListener('visibilitychange',visibility);
    const narrow=window.matchMedia('(max-width:860px)');
    const resize=()=>{setEnabled(false);setLoaded(false);videoRef.current.pause();videoRef.current.removeAttribute('src');videoRef.current.load();};
    narrow.addEventListener('change',resize);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);narrow.removeEventListener('change',resize);};
  },[heroRef]);
  useEffect(()=>{
    if(reducedMotion){setEnabled(false);setLoaded(false);}
  },[reducedMotion]);
  useEffect(()=>{
    const video=videoRef.current;
    let cancelled=false;
    if(enabled&&visible&&foreground&&!reducedMotion&&!failed){
      if(!video.getAttribute('src'))video.src=window.matchMedia('(max-width:860px)').matches?'/media/open-school-blender-mobile-v1.mp4':'/media/open-school-blender-v1.mp4';
      video.play().catch(error=>{if(!cancelled&&error.name!=='AbortError'){setEnabled(false);setFailed(true);setLoaded(false);}});
    }else video.pause();
    return()=>{cancelled=true;video.pause();};
  },[enabled,visible,foreground,reducedMotion,failed]);
  useEffect(()=>{
    heroRef.current?.classList.toggle('scene-loaded',loaded&&!failed&&!reducedMotion);
    heroRef.current?.classList.toggle('scene-running',playing);
  },[heroRef,loaded,failed,reducedMotion,playing]);
  return <>
    <video ref={videoRef} className="school-blender-video" width="1280" height="548" muted loop playsInline preload="none" aria-hidden="true"
      onPlaying={()=>{setPlaying(true);setLoaded(true);}} onPause={()=>setPlaying(false)}
      onError={()=>{setFailed(true);setEnabled(false);setLoaded(false);setPlaying(false);}} />
    {!reducedMotion&&!failed&&<button type="button" className="scene-motion" data-scene-motion aria-pressed={enabled}
      onClick={()=>setEnabled(on=>!on)}>{playing?'Pause scene':enabled?'Loading scene…':'Play motion'}</button>}
    {failed&&<p className="scene-motion scene-error" role="status">Motion unavailable. The still image remains visible.</p>}
  </>;
}
