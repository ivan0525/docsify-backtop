import style from './index.css';

const install = function (hook, vm) {
  const defaultBackTopConfig = {
    visibilityHeight: 300
  }

  const backTopConfig = { ...defaultBackTopConfig, ...vm.config.backTopConfig };

  const onScroll = () => {
    const offset = document.documentElement.scrollTop;
    const backTopBtn = Docsify.dom.find('.back-top');
    backTopBtn.style.right = offset >= backTopConfig.visibilityHeight ? '14px' : '-60px';
  };

  const rAF = window.requestAnimationFrame || ((fn) => setTimeout(fn, 16.67));

  hook.mounted(function () {
    const backTopBtn = document.createElement('div');
    backTopBtn.innerHTML = '<svg width="24" height="24" style="vertical-align: middle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>';
    backTopBtn.className = 'back-top';
    const offset = document.documentElement.scrollTop;
    backTopBtn.style.right = offset >= backTopConfig.visibilityHeight ? '14px' : '-60px';
    document.body.appendChild(backTopBtn);
    window.addEventListener('scroll', onScroll);
    backTopBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const startTime = Date.now();
      const docEl = document.documentElement;
      const startOffset = docEl.scrollTop;
      const frameFn = () => {
        const progress = (Date.now() - startTime) / 500;
        console.log(progress)
        if (progress < 1) {
          docEl.scrollTop = startOffset * (1 - Math.pow(progress, 3));
          rAF(frameFn);
        } else {
          docEl.scrollTop = 0;
        }
      }
      rAF(frameFn);
    });
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [install].concat(window.$docsify.plugins || []);