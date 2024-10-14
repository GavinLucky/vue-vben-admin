import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

let buildTime = '';
export function resetBuildTime() {
  buildTime = '';
}
export function getBuildTime() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  if (buildTime) return buildTime;
  buildTime = dayjs
    .tz(Date.now(), 'Asia/Shanghai')
    .format('YYYY-MM-DD HH:mm:ss');
  console.log(`****** buildTime create [${buildTime}] ******`);
  return buildTime;
}
