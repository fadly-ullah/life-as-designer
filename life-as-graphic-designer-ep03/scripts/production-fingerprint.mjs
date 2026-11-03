import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(join(p,d.name)):[join(p,d.name)]);
export const productionFingerprint=()=>{const h=createHash('sha256');for(const p of [...walk('src'),...walk('public')].sort()){h.update(p);h.update('\0');h.update(readFileSync(p));h.update('\0');}return h.digest('hex');};
