import React from 'react';
import {E} from '../data/episodeColors';
/** Small prop on the desk; the original face/rig is never repainted. */
export const Tissue:React.FC=()=> <svg width="68" height="58" viewBox="0 0 68 58" style={{position:'absolute',left:710,top:1175}} shapeRendering="crispEdges" aria-label="Tisu kecil di meja"><path d="M5 34H63V53H5Z" fill={E.beige}/><rect x="10" y="38" width="48" height="3" fill={E.darkOlive}/><path d="M18 35V18H23V8H32V4H42V13H48V28H52V35Z" fill={E.white}/><path d="M31 9V31H45" fill="none" stroke={E.line} strokeWidth="3"/></svg>;
