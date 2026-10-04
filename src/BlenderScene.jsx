import {useEffect, useRef, useState} from 'react';

/** Silent background motion; the still remains available until playback succeeds. */
export function BlenderScene({heroRef, enabled}) {
  const videoRef=useRef(null);
  const [mobile,setMobile]=useState(false);
  const [visible,setVisible]=useState(true);
  const [foreground,setForeground]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [failed,setFailed]=useState(false);
  const shouldPlay=enabled&&visible&&foreground;
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting));
    if(heroRef.current)observer.observe(heroRef.current);
    const visibility=()=>setForeground(!document.hidden);
    visibility();document.addEventListener('visibilitychange',visibility);
    const narrow=window.matchMedia('(max-width:860px)');
    const resize=()=>setMobile(narrow.matches);
    resize();narrow.addEventListener('change',resize);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);narrow.removeEventListener('change',resize);};
  },[heroRef]);
  useEffect(()=>{
    const video=videoRef.current;
    let cancelled=false;
    if(shouldPlay){
      const source=mobile?'/media/open-school-blender-mobile-v1.mp4':'/media/open-school-blender-v1.mp4';
      if(video.getAttribute('src')!==source||failed){video.pause();setLoaded(false);video.src=source;video.load();}
      setFailed(false);
      video.muted=true;
      video.play().catch(error=>{if(!cancelled&&error.name!=='AbortError'){setFailed(true);setLoaded(false);setPlaying(false);}});
    }else video.pause();
    return()=>{cancelled=true;video.pause();};
  },[shouldPlay,mobile]);
  useEffect(()=>{
    heroRef.current?.classList.toggle('scene-loaded',loaded&&enabled&&!failed);
    heroRef.current?.classList.toggle('scene-running',playing&&shouldPlay&&!failed);
  },[heroRef,loaded,enabled,failed,playing,shouldPlay]);
  return <>
    <video ref={videoRef} className="school-blender-video" width="1280" height="548" autoPlay={shouldPlay&&!failed} muted loop playsInline preload="none" aria-hidden="true"
      onPlaying={()=>{if(!shouldPlay){videoRef.current.pause();return;}setFailed(false);setPlaying(true);setLoaded(true);}} onPause={()=>setPlaying(false)}
      onError={()=>{setFailed(true);setLoaded(false);setPlaying(false);}} />
    {failed&&<p className="visually-hidden" role="status">Motion unavailable. The still image remains visible.</p>}
  </>;
}
