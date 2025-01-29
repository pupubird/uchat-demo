import { getCookie } from '@/utils/cookieManager';

// 引入音频文件
import bingoSound from '@/assets/sounds/bingo.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import pickSound from '@/assets/sounds/pick.mp3';
import bgMusicSound from '@/assets/sounds/game_bg.wav';
import settingSound from '@/assets/sounds/setting.mp3';
import penclickSound from '@/assets/sounds/penclick.mp3';
import winSound from '@/assets/sounds/win.mp3';
import cashoutSound from '@/assets/sounds/cashout.mp3';
import finishbuySound from '@/assets/sounds/finishbuy.mp3';

// 使用音频文件创建 Audio 对象
const bingoAudio = new Audio(bingoSound);
const clickAudio = new Audio(clickSound);
const pickAudio = new Audio(pickSound);
const bgMusicAudio = new Audio(bgMusicSound);
const settingAudio = new Audio(settingSound);
const penclickAudio = new Audio(penclickSound);
const winAudio = new Audio(winSound);
const cashoutAudio = new Audio(cashoutSound);
const finishbuyAudio = new Audio(finishbuySound);

// 设置背景音乐为循环
bgMusicAudio.loop = true;

// 检查是否启用背景音乐
const isBackgroundMusicEnabled = (): boolean => {
  const soundEnable = getCookie('soundEnable');
  return soundEnable !== 'false'; // 默认打开背景音乐，只有在设置为 'false' 时才关闭
};

// 检查是否启用游戏音效
const isSoundGameEnabled = (): boolean => {
  const soundGameEnable = getCookie('soundGameEnable');
  return soundGameEnable !== 'false'; // 默认打开游戏音效，只有在设置为 'false' 时才关闭
};

// 播放音效函数
const playAudio = (audio: HTMLAudioElement) => {
  if (isSoundGameEnabled()) {
    audio.currentTime = 0; // 重置音频播放位置
    audio.play();
  }
};

// 播放 bingo 音效
export const playBingo = () => playAudio(bingoAudio);
export const playClick = () => playAudio(clickAudio);
export const playPick = () => playAudio(pickAudio);
export const playSetting = () => playAudio(settingAudio);
export const playPenclick = () => playAudio(penclickAudio);
export const playWin = () => playAudio(winAudio);
export const playCashout = () => playAudio(cashoutAudio);
export const playFinishbuy = () => playAudio(finishbuyAudio);

// 播放背景音乐
export const playBackgroundMusic = () => {
  if (isBackgroundMusicEnabled()) {
    bgMusicAudio.play();
  }
};

// 暂停背景音乐
export const pauseBackgroundMusic = () => {
  bgMusicAudio.pause();
};