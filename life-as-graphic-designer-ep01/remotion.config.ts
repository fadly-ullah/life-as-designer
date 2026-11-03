import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(18);
Config.setConcurrency(3);
// The cloud image supplies Chromium. CLI --browser-executable overrides this.
const browser=process.env.REMOTION_BROWSER_EXECUTABLE || (existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
if(browser) Config.setBrowserExecutable(browser);
