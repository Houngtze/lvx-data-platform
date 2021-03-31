// 设置 REM 支持
// 使得 指定REM = 100%宽 = 100%设计稿宽度
// 对于当前项目，对于 iPhone 6，使得 7.5rem = 100%宽 = 750设计单位
// 依赖 HTML 上正确设置 <meta name="viewport" content="width=device-width">
{
  const win = window;
  const doc = win.document;
  const docEl = doc.documentElement;

  const LIMIT_CONTENT_WIDTH = 640; // 内容区大小应小于等于 640
  const resizeEvent = 'resize'; // 不使用 orientationchange，不同设备行为差异

  docEl.setAttribute('data-max-content-width', '640');
  const height = document.documentElement.clientHeight;
  const calculate = () => {
    const deviceWidth = document.documentElement.clientWidth;
    const contentWidth = Math.min(deviceWidth, LIMIT_CONTENT_WIDTH);

    docEl.style.fontSize = (100 * (contentWidth / 750)) + 'px';
    docEl.style.height = height + 'px';
  };
  calculate()
  win.addEventListener(resizeEvent, calculate, false);
  doc.addEventListener('DOMContentLoaded', calculate, false);
}

{
  const dpr = window.devicePixelRatio;
  document.documentElement.setAttribute('data-dpr', dpr <= 2 ? '2' : '3');
}

export default undefined;
