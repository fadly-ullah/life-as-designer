"""Offline Indonesian Whisper ASR. Never edits/trims/replaces the source MP3."""
from pathlib import Path
import argparse, json, subprocess, hashlib, re
import numpy as np
import sherpa_onnx

p=argparse.ArgumentParser()
p.add_argument('--audio',default='public/audio/ep06-voiceover.wav')
p.add_argument('--model-dir',required=True)
p.add_argument('--output',default='out/voice-transcription.json')
args=p.parse_args()
source=Path(args.audio); model=Path(args.model_dir)
if not source.is_file():raise SystemExit(f'Latest voice missing: {source}')
pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-f','f32le','-ac','1','-ar','16000','-'])
samples=np.frombuffer(pcm,dtype='<f4').copy()
duration=len(samples)/16000
silence=subprocess.run(['ffmpeg','-hide_banner','-i',str(source),'-af','silencedetect=noise=-33dB:d=0.20','-f','null','-'],capture_output=True,text=True,check=True)
silences=[]
pending=None
for line in silence.stderr.splitlines():
 s=re.search(r'silence_start: ([\d.]+)',line)
 e=re.search(r'silence_end: ([\d.]+)',line)
 if s:pending=float(s.group(1))
 if e and pending is not None:silences.append([pending,float(e.group(1))]);pending=None
cuts=[0.0]
while duration-cuts[-1]>27:
 target=cuts[-1]+21
 candidates=[(a+b)/2 for a,b in silences if cuts[-1]+15<(a+b)/2<cuts[-1]+26]
 cuts.append(min(candidates,key=lambda n:abs(n-target)) if candidates else target)
cuts.append(duration)
encoder=next(model.glob('*-encoder.int8.onnx'))
decoder=next(model.glob('*-decoder.int8.onnx'))
tokens=next(model.glob('*-tokens.txt'))
recognizer=sherpa_onnx.OfflineRecognizer.from_whisper(
 encoder=str(encoder),decoder=str(decoder),
 tokens=str(tokens),language='id',num_threads=2,
 enable_segment_timestamps=True,enable_token_timestamps=False)
chunks=[]
for start,end in zip(cuts,cuts[1:]):
 stream=recognizer.create_stream()
 stream.accept_waveform(16000,samples[round(start*16000):round(end*16000)])
 recognizer.decode_stream(stream)
 result=stream.result
 try:raw=json.loads(str(result))
 except json.JSONDecodeError:raw={'text':result.text,'tokens':list(result.tokens),'timestamps':list(result.timestamps)}
 chunk={'startSeconds':start,'endSeconds':end,'text':result.text,'result':raw}
 chunks.append(chunk)
 print(json.dumps(chunk,ensure_ascii=False),flush=True)
out={'source':str(source),'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'durationSeconds':duration,'engine':'sherpa-onnx 2.0.1 / '+model.name+' multilingual CPU','language':'id','silences':silences,'chunks':chunks,'reviewRequired':True}
target=Path(args.output);target.parent.mkdir(parents=True,exist_ok=True)
target.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
