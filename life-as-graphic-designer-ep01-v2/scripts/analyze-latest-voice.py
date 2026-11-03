from pathlib import Path
import subprocess,json,hashlib,math
import numpy as np
root=Path(__file__).resolve().parents[1]
source=root/'public/audio/ep01-voiceover.mp3'
if not source.is_file():raise SystemExit('Latest V2 VO is missing; no fallback to the original recording is allowed.')
pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-f','f32le','-ac','1','-ar','44100','-'])
audio=np.frombuffer(pcm,dtype='<f4')
sha=hashlib.sha256(source.read_bytes()).hexdigest()
meta={'sourcePath':'public/audio/ep01-voiceover.mp3','staticSource':'audio/ep01-voiceover.mp3','audioDurationSeconds':len(audio)/44100,'audioSamples':len(audio),'sampleRate':44100,'fps':30,'audioFrames':math.ceil(len(audio)/44100*30),'endingPaddingFrames':36,'sourceSha256':sha,'voiceGain':.79,'alignment':'See voice-alignment.json; captions must be reviewed again if the source hash changes.'}
meta['durationInFrames']=meta['audioFrames']+meta['endingPaddingFrames']
(root/'src/data/audioMetadata.json').write_text(json.dumps(meta,indent=2)+'\n')
levels=[round(float(np.sqrt(np.mean(audio[i:i+1470]**2))),6) for i in range(0,len(audio),1470)]
(root/'src/data/waveform.json').write_text(json.dumps(levels)+'\n')
print(json.dumps(meta,indent=2))
