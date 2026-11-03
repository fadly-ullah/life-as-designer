import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(18);
Config.setConcurrency(2);
Config.setChromiumOpenGlRenderer('swangle');
const browser=process.env.REMOTION_BROWSER_EXECUTABLE||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
if(browser)Config.setBrowserExecutable(browser);
