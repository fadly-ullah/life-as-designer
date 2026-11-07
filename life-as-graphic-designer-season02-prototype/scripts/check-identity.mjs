import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');process.chdir(root);
const lock=JSON.parse(readFileSync('source-lock.json'));
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
for(const [file,hash] of Object.entries(lock.lockedLocalFiles)){if(!existsSync(file)||sha(file)!==hash)throw Error('Original identity changed: '+file);}
for(const r of lock.protectedProjects){const p=resolve(root,'..',r.path);if(!existsSync(p)||sha(p)!==r.sha256)throw Error('Previous project changed: '+r.path);}
const report={originalCharacterUnchanged:true,originalFontAndColorsUnchanged:true,protectedPreviousFiles:lock.protectedProjects.length,originalPrototypeRecovered:false,externalReferenceVideoAvailable:false,audioDeferred:true,mp4Deferred:true};
mkdirSync('out',{recursive:true});writeFileSync('out/identity-check.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
