import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
export function HeroMedia() {
 const ref=useRef(null);const [playing,setPlaying]=useState(false);const [available,setAvailable]=useState(true);
 useEffect(()=>{
  const video=ref.current, motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection=navigator.connection;
  const pause=()=>video.pause();const preference=()=>{if(motion.matches)pause()};const visibility=()=>{if(document.hidden)pause()};const dataPreference=()=>{if(connection?.saveData)pause()};
  motion.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);
  connection?.addEventListener?.('change',dataPreference);
  if(!motion.matches&&!connection?.saveData&&!document.hidden){video.src='/media/learning-hero.mp4';video.play().catch(()=>setPlaying(false));}
  return()=>{video.pause();motion.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);connection?.removeEventListener?.('change',dataPreference)};
 },[]);
 const toggle=()=>{const v=ref.current;if(!v.paused){v.pause();return}if(!v.getAttribute('src'))v.src='/media/learning-hero.mp4';v.play().catch(()=>setPlaying(false));};
 return <><img className="hero-image" src="/media/learning-hero.webp" alt="Illustrative scene of a professional studying an AI workflow at her desk" fetchPriority="high"/><video ref={ref} className="hero-image hero-video" style={available?undefined:{display:'none'}} poster="/media/learning-hero.webp" muted loop playsInline preload="none" aria-hidden="true" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setPlaying(false);setAvailable(false)}}/>{available&&<button type="button" className="motion-control" onClick={toggle} aria-label={playing?'Pause hero motion':'Play hero motion'}>{playing?<Pause size={17} aria-hidden="true"/>:<Play size={17} aria-hidden="true"/>}<span>{playing?'Pause motion':'Play motion'}</span></button>}</>;
}
