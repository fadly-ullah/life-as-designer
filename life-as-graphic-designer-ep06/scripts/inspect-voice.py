"""Measure the installed EP06 source; never alters its audio samples."""
from pathlib import Path
import subprocess,json,hashlib,math
import numpy as np
r=Path(__file__).resolve().parents[1];p=r/'public/audio/ep06-voiceover.wav'
duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(p)]))
a=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-f','f32le','-ac','1','-ar','48000','-']),dtype='<f4')
fps=30;frames=math.ceil(duration*fps);padding=71
meta={'sourcePath':'public/audio/ep06-voiceover.wav','staticSource':'audio/ep06-voiceover.wav','audioDurationSeconds':duration,'decodedDurationSeconds':len(a)/48000,'audioSamples':len(a),'sampleRate':48000,'sourceSampleRate':24000,'sourceSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'fps':fps,'audioFrames':frames,'endingPaddingFrames':padding,'durationInFrames':frames+padding,'voiceGain':.82}
mp3=r/'public/audio/ep06-voiceover.mp3'
if mp3.exists():meta.update(compatibilityMp3='public/audio/ep06-voiceover.mp3',compatibilityMp3Sha256=hashlib.sha256(mp3.read_bytes()).hexdigest(),narrationMaster='Uploaded WAV, original bytes; MP3 is an optional compatibility derivative only.')
(r/'src/data/audioMetadata.json').write_text(json.dumps(meta,indent=2)+'\n')
(r/'src/data/waveform.json').write_text(json.dumps([round(float(np.sqrt(np.mean(a[i:i+1600]**2))),6) for i in range(0,len(a),1600)])+'\n')
print(json.dumps(meta,indent=2))
