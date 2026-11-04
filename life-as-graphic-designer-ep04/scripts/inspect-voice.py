"""Measure the installed EP04 source; never alters its audio samples."""
from pathlib import Path
import subprocess,json,hashlib,math
import numpy as np
r=Path(__file__).resolve().parents[1];p=r/'public/audio/ep04-voiceover.mp3'
duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(p)]))
a=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(p),'-f','f32le','-ac','1','-ar','48000','-']),dtype='<f4')
fps=30;frames=math.ceil(duration*fps);padding=47
meta={'sourcePath':'public/audio/ep04-voiceover.mp3','staticSource':'audio/ep04-voiceover.mp3','audioDurationSeconds':duration,'decodedDurationSeconds':len(a)/48000,'audioSamples':len(a),'sampleRate':48000,'sourceSampleRate':48000,'sourceSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'fps':fps,'audioFrames':frames,'endingPaddingFrames':padding,'durationInFrames':frames+padding,'voiceGain':.82}
(r/'src/data/audioMetadata.json').write_text(json.dumps(meta,indent=2)+'\n')
(r/'src/data/waveform.json').write_text(json.dumps([round(float(np.sqrt(np.mean(a[i:i+1600]**2))),6) for i in range(0,len(a),1600)])+'\n')
print(json.dumps(meta,indent=2))
