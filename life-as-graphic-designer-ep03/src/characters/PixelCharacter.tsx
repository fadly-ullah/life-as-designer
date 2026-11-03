import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../data/colors';
import {CharacterAction, expressionFor} from './CharacterExpressions';

type Props={action?:CharacterAction; seated?:boolean; width?:number; flip?:boolean; speaking?:boolean; style?:React.CSSProperties};
// Articulated 2px-grid sprite. Head, brows, eyelids, jaw, upper arms,
// forearms, hands, knees and shoes are separately animated geometry.
export const PixelCharacter:React.FC<Props>=({action='idle',seated=false,width=360,flip=false,speaking=false,style})=>{
  const f=useCurrentFrame();
  const e=expressionFor(action);
  const breath=Math.sin(f/15)*1.1;
  const blink=f%127<4 || (action==='blinking'&&f%60<5);
  const typing=action==='typing';
  const phone=action==='reading';
  const thinking=action==='thinking'||action==='confused'||action==='frustrated';
  const surprise=action==='surprised';
  const happy=action==='happy';
  const arm=Math.sin(f/17)*2;
  const mouthOpen=(speaking||action==='talking')&&Math.floor(f/4)%3!==0;
  return <svg viewBox="0 0 160 224" width={width} height={width*1.4} aria-label={`Fadly ${action}`} style={{...style, imageRendering:'pixelated'}}>
    <g transform={flip?'translate(160 0) scale(-1 1)':undefined} shapeRendering="crispEdges">
      <ellipse cx="80" cy="216" rx="47" ry="5" fill={C.charcoal} opacity=".1"/>
      <g transform={`translate(0 ${breath})`}>
        {seated?<>
          <path d="M56 142H80V168H104V188H72V176H54Z" fill={C.charcoal}/>
          <path d="M82 144H106V166H122V184H100V174H82Z" fill="#282F29"/>
          <path d="M72 182H101V194H69V188H72ZM102 180H131V192H99V186H102Z" fill={C.shoe}/>
          <path d="M69 192H102V196H69ZM99 190H133V194H99Z" fill={C.darkOlive}/>
        </>:<>
          <path d="M55 142H78V198H54V164H52Z" fill={C.charcoal}/>
          <path d="M83 142H105V166H108V198H83Z" fill="#252D27"/>
          <rect x="58" y="155" width="4" height="36" fill="#343D33"/>
          <rect x="88" y="158" width="4" height="32" fill="#41473A"/>
          <g transform={`rotate(${happy?Math.sin(f/7)*4:0} 65 195)`}><path d="M52 194H77V206H44V200H52Z" fill={C.shoe}/><path d="M44 204H77V210H44Z" fill={C.darkOlive}/><rect x="52" y="198" width="16" height="3" fill={C.beige}/></g>
          <g transform={`rotate(${happy?-Math.sin(f/7)*4:0} 94 195)`}><path d="M83 194H107V200H116V206H83Z" fill={C.shoe}/><path d="M83 204H116V210H83Z" fill={C.darkOlive}/><rect x="90" y="198" width="16" height="3" fill={C.beige}/></g>
        </>}
        <path d="M58 90H102V96H110V106H106V148H54V106H50V96H58Z" fill={C.hoodieShade}/>
        <path d="M60 94H100V102H104V144H56V102H60Z" fill={C.hoodie}/>
        <path d="M60 94L71 105H89L101 94H94L86 99H73L66 94Z" fill="#AAA28C"/>
        <rect x="69" y="105" width="2" height="20" fill={C.white}/><rect x="89" y="105" width="2" height="20" fill={C.white}/>
        <rect x="68" y="121" width="4" height="5" fill={C.olive}/><rect x="88" y="121" width="4" height="5" fill={C.olive}/>
        <path d="M65 129H95V140H63V133Z" fill="#D7CEB9"/><rect x="70" y="131" width="20" height="2" fill={C.hoodieShade}/>
        <rect x="55" y="142" width="50" height="7" fill={C.hoodieShade}/>
        <g transform={`rotate(${surprise?18:happy?-12:arm} 54 104)`}>
          {surprise?<><path d="M54 99H42V112H31V85H21V118H27V125H43V119H55Z" fill={C.hoodie}/><path d="M21 86V74H25V68H31V85Z" fill={C.skinLight}/><rect x="21" y="84" width="11" height="5" fill={C.hoodieShade}/></>:
           typing?<g transform={`translate(0 ${Math.floor(f/3)%2*3})`}><path d="M42 100H56V124H72V136H43V130H39Z" fill={C.hoodie}/><rect x="67" y="124" width="14" height="10" fill={C.skinLight}/><rect x="71" y="122" width="8" height="3" fill={C.skin}/></g>:
           <><path d="M44 100H56V147H40V112Z" fill={C.hoodie}/><rect x="41" y="143" width="15" height="7" fill={C.hoodieShade}/><path d="M42 150H56V161H52V165H44V161H40V153Z" fill={C.skinLight}/><rect x="40" y="157" width="4" height="5" fill={C.skin}/></>}
        </g>
        <g transform={`rotate(${happy?Math.sin(f/8)*8:0} 107 104)`}>
          {surprise?<><path d="M106 100H118V113H129V85H141V118H135V126H119V120H106Z" fill={C.hoodie}/><path d="M130 86V70H136V76H141V86Z" fill={C.skinLight}/></>:
           thinking?<><path d="M105 101H119V114H130V96H120V86H140V118H134V126H118V119H105Z" fill={C.hoodie}/><path d="M119 88V76H110V68H117V72H129V88Z" fill={C.skinLight}/><rect x="114" y="66" width="12" height="5" fill={C.skin}/></>:
           action==='pointing'?<g transform={`rotate(${Math.sin(f/12)*3} 110 105)`}><path d="M105 100H120V106H137V120H119V116H105Z" fill={C.hoodie}/><path d="M137 106H144V102H156V107H146V116H137Z" fill={C.skinLight}/><rect x="136" y="106" width="4" height="13" fill={C.hoodieShade}/></g>:
           phone?<><path d="M106 101H119V132H105V141H94V129H106Z" fill={C.hoodie}/><rect x="92" y="125" width="15" height="12" fill={C.skinLight}/><g transform={`rotate(${-7+Math.sin(f/20)*2} 96 116)`}><rect x="86" y="106" width="18" height="29" fill={C.charcoal}/><rect x="89" y="110" width="12" height="19" fill={C.lime}/><rect x="93" y="132" width="4" height="2" fill={C.beige}/><rect x="91" y="114" width="8" height="2" fill={C.darkOlive}/><rect x="91" y="119" width="6" height="2" fill={C.darkOlive}/></g></>:
           typing?<g transform={`translate(0 ${Math.floor((f+3)/3)%2*3})`}><path d="M106 100H119V128H127V139H105V134H102Z" fill={C.hoodie}/><rect x="123" y="128" width="16" height="10" fill={C.skinLight}/></g>:
           <g transform={`rotate(${-arm} 108 104)`}><path d="M105 100H118V113H122V148H106Z" fill={C.hoodie}/><rect x="106" y="143" width="16" height="7" fill={C.hoodieShade}/><path d="M106 150H121V161H118V165H110V161H106Z" fill={C.skinLight}/></g>}
        </g>
        <g transform={`rotate(${e.tilt+Math.sin(f/27)*1.2} 80 86) translate(0 ${breath*.5})`}>
          <rect x="69" y="82" width="22" height="16" fill={C.skin}/>
          <path d="M45 38H115V78H109V86H101V91H59V87H51V80H45Z" fill={C.skinShade}/>
          <path d="M47 37H113V76H107V84H99V88H61V84H53V76H47Z" fill={C.skinLight}/>
          <rect x="41" y="56" width="8" height="17" fill={C.skin}/><rect x="112" y="56" width="8" height="17" fill={C.skin}/>
          <path d="M43 55V30H49V20H59V14H99V18H109V24H117V53H107V39H99V35H83V39H65V35H55V55Z" fill={C.hair}/>
          <path d="M50 29V24H60V20H94V24H73V28H59V36H50Z" fill="#343C30"/><rect x="99" y="25" width="8" height="6" fill="#343C30"/>
          <rect x="46" y="42" width="8" height="22" fill={C.hair}/><rect x="107" y="42" width="8" height="20" fill={C.hair}/>
          <g transform={`rotate(${-e.brow*2} 63 52)`}><rect x="57" y={50+e.brow} width="14" height="4" fill={C.hair}/></g>
          <g transform={`rotate(${e.brow*3} 98 52)`}><rect x="91" y={50-e.brow/2} width="14" height="4" fill={C.hair}/></g>
          <rect x="59" y={blink?62:58} width="9" height={blink?2:10} fill={C.charcoal}/><rect x="94" y={blink?62:58} width="9" height={blink?2:10} fill={C.charcoal}/>
          {!blink&&<><rect x="59" y="58" width="3" height="3" fill={C.white}/><rect x="94" y="58" width="3" height="3" fill={C.white}/></>}
          <path d="M79 64H83V72H88V75H78Z" fill={C.skin}/>
          {e.mouth==='open'||mouthOpen?<><rect x="75" y="77" width="14" height="9" fill={C.charcoal}/><rect x="78" y="83" width="8" height="3" fill="#C87E70"/></>:
           e.mouth==='smile'?<path d="M71 77H76V81H88V77H93V83H88V86H76V83H71Z" fill={C.charcoal}/>:
           e.mouth==='slant'?<path d="M73 81H80V78H91V81H82V84H73Z" fill={C.darkOlive}/>:<rect x="74" y="80" width="16" height="3" fill={C.darkOlive}/>}
          <rect x="54" y="71" width="8" height="3" fill="#DA9C7F"/><rect x="102" y="71" width="7" height="3" fill="#DA9C7F"/>
        </g>
      </g>
    </g>
  </svg>;
};
