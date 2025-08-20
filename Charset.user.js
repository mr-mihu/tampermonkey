// ==UserScript==
// @name         修改页面编码
// @namespace    https://github.com/mr-mihu/tampermonkey/Charset.user.js
// @version      0.1.2
// @description  修改网站的默认编码,页面编码转换.UTF8,html编码修改
// @author       mr-mihu
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzU1NjgyNzE0MjIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNDUxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0xNTMuNiAyNDMuMnY1MjhjMCA1NC40IDQ0LjggOTkuMiAxMDIuNCA5OS4yaDUyOGMwIDQ4LTQxLjYgODkuNi04OS42IDg5LjZoLTUzNy42Yy00OCAwLTg5LjYtNDEuNi04OS42LTg5LjZWMzMyLjhjLTMuMi00OCAzOC40LTg5LjYgODYuNC04OS42IiBwLWlkPSIxMzQ1MiI+PC9wYXRoPjxwYXRoIGQ9Ik03MDAuOCA0MTIuOGMtMy4yIDYuNC0xOS4yIDE5LjItNDQuOCA0MS42LTkuNiA2LjQtMTYgMTYtMjIuNCAyNS42LTYuNCA5LjYtOS42IDIyLjQtNi40IDM1LjJ2Ni40aC02MC44di02LjRjMC0xOS4yIDMuMi0zOC40IDkuNi01MS4yIDYuNC0xMi44IDE5LjItMjguOCAzNS4yLTQ0LjhzMjguOC0yNS42IDMyLTI4LjhjOS42LTEyLjggMTIuOC0yNS42IDEyLjgtMzguNCAwLTE2LTYuNC0zMi0xNi00MS42LTkuNi05LjYtMjIuNC0xNi00MS42LTE2LTIyLjQgMC0zOC40IDYuNC00OCAyMi40LTkuNiAxMi44LTEyLjggMjguOC0xMi44IDUxLjJoLTYwLjhjMC0zOC40IDkuNi03MC40IDM1LjItODkuNiAyMi40LTIyLjQgNTEuMi0zMiA5Mi44LTMyIDM1LjIgMCA2MC44IDkuNiA4My4yIDI4LjggMjIuNCAxOS4yIDMyIDQ0LjggMzIgNzYuOCAwIDIyLjQtNi40IDQ0LjgtMTkuMiA2MC44bS03My42IDIwMS42Yy02LjQgNi40LTE5LjIgMTIuOC0yOC44IDkuNi05LjYgMC0yMi40LTMuMi0yOC44LTEyLjgtNi40LTYuNC0xMi44LTE2LTEyLjgtMjguOHMzLjItMjIuNCAxMi44LTI4LjhjNi40LTYuNCAxNi05LjYgMjguOC05LjZzMjIuNCAzLjIgMjguOCA5LjZjNi40IDYuNCAxMi44IDE2IDEyLjggMjguOCAwIDE2LTYuNCAyNS42LTEyLjggMzJtMjQwLTU1MC40aC01NjBjLTUxLjIgMC05Mi44IDQxLjYtOTIuOCA5Mi44djU2MGMwIDUxLjIgNDEuNiA5Mi44IDkyLjggOTIuOGg1NjBjNTEuMiAwIDkyLjgtNDEuNiA5Mi44LTkyLjhWMTU2LjhjMC01MS4yLTQxLjYtOTIuOC05Mi44LTkyLjgiIHAtaWQ9IjEzNDUzIj48L3BhdGg+PC9zdmc+
// @match        *://*/*
// @match        *://*/*.txt
// @match        *://*/*.json
// @match        *://*/*.html
// @match        *://*/*.htm
// @match        *://*/*.xml
// @match        *://*/*.csv
// @match        *://*/*.js
// @match        *://*/*.css
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';


    // 编码列表
    const ENCODINGS = [
        ['Big5', '繁体中文'],
        ['GBK', '简体中文'],
        ['UTF-8', 'Unicode'],
        ['UTF-16LE', 'Unicode'],
        ['GB18030', '简体中文'],
        ['EUC-JP', '日文'],
        ['EUC-KR', '韩文'],
        ['IBM866', '西里尔文'],
        ['ISO-2022-JP', '日文'],
        ['ISO-8859-2', '中欧'],
        ['ISO-8859-3', '南欧'],
        ['ISO-8859-4', '波罗的海'],
        ['ISO-8859-5', '西里尔文'],
        ['ISO-8859-6', '阿拉伯文'],
        ['ISO-8859-7', '希腊文'],
        ['ISO-8859-8', '希伯来文'],
        ['ISO-8859-8-I', '希伯来文'],
        ['ISO-8859-10', '北欧'],
        ['ISO-8859-13', '波罗的海'],
        ['ISO-8859-14', '凯尔特文'],
        ['ISO-8859-15', '西欧'],
        ['ISO-8859-16', '罗马尼亚文'],
        ['KOI8-R', '西里尔文'],
        ['KOI8-U', '西里尔文'],
        ['Macintosh', '西欧'],
        ['Shift_JIS', '日文'],
        ['Windows-874', '泰文'],
        ['Windows-1250', '中欧'],
        ['Windows-1251', '西里尔文'],
        ['Windows-1252', '西欧'],
        ['Windows-1253', '希腊文'],
        ['Windows-1254', '土耳其文'],
        ['Windows-1255', '希伯来文'],
        ['Windows-1256', '阿拉伯文'],
        ['Windows-1257', '波罗的海'],
        ['Windows-1258', '越南文']
    ];

    // 获取当前域名加端口和二级目录
    const getCurrentPathKey = () => {
        const url = new URL(window.location.href);
        const pathParts = url.pathname.split('/').filter(part => part !== '');
        const basePath = pathParts.length > 0 ? pathParts[0] : '';
        return `${url.hostname}:${url.port || (url.protocol === 'https:' ? '443' : '80')}/${basePath}`;
    };

    // 获取当前域名
    const getCurrentDomain = () => {
        return window.location.hostname;
    };

    // 为当前域名设置编码
    const setEncoding = (encoding) => {
        GM_setValue('charset_' + getCurrentDomain(), encoding);
        // 重新加载页面以应用编码
        window.location.reload();
    };

    // 还原站点到浏览器默认行为（完全忽略插件的任何编码设置）
    const resetEncoding = () => {
        GM_setValue('charset_' + getCurrentDomain(), 'browser-default');
        window.location.reload();
    };

    // 获取当前域名的编码
    const getEncoding = () => {
        return GM_getValue('charset_' + getCurrentDomain(), null);
    };

    // 获取当前路径的编码
    const getPathEncoding = () => {
        const pathKey = getCurrentPathKey();
        return GM_getValue('charset_path_' + pathKey, null);
    };

    // 设置当前路径的编码
    const setPathEncoding = (encoding) => {
        const pathKey = getCurrentPathKey();
        GM_setValue('charset_path_' + pathKey, encoding);
    };

    // 获取默认编码
    const getDefaultEncoding = () => {
        return GM_getValue('default_charset', null);
    };

    // 设置默认编码
    const setDefaultEncoding = (encoding) => {
        GM_setValue('default_charset', encoding);
    };

    // 应用默认编码（如果没有设置则提示用户设置）
    const applyDefaultEncoding = () => {
        const defaultEncoding = getDefaultEncoding();
        if (!defaultEncoding) {
            const encoding = prompt('请先设置默认编码 (例如 UTF-8):', 'UTF-8');
            if (encoding !== null && encoding !== '') {
                setDefaultEncoding(encoding);
                alert(`默认编码已设置为: ${encoding}`);
            } else {
                alert('未设置默认编码，操作已取消');
                return;
            }
        }

        // 设置当前站点使用默认编码
        GM_setValue('charset_' + getCurrentDomain(), getDefaultEncoding());
        window.location.reload();
    };

    // 添加菜单命令
    const addMenuCommands = () => {
        GM_registerMenuCommand('还原站点', resetEncoding);
        GM_registerMenuCommand('设置默认值', () => {
            const encoding = prompt('输入默认编码 (例如 UTF-8):', getDefaultEncoding() || 'UTF-8');
            if (encoding !== null && encoding !== '') {
                setDefaultEncoding(encoding);
                // 同时为当前路径设置编码
                setPathEncoding(encoding);
                alert(`默认编码已设置为: ${encoding}`);
                window.location.reload();
            }
        });
        GM_registerMenuCommand('重置到默认值', applyDefaultEncoding);

        // 添加分隔符
        GM_registerMenuCommand('--- 编码列表 ---', () => {});

        // 添加编码选择命令
        ENCODINGS.forEach(([encoding, description]) => {
            GM_registerMenuCommand(`${description}（${encoding}）`, () => {
                setEncoding(encoding);
            });
        });
    };

    // 应用编码
    const applyEncoding = () => {
        const siteEncoding = getEncoding();

        // 如果设置为浏览器默认行为，则不应用任何编码
        if (siteEncoding === 'browser-default') {
            return;
        }

        // 优先级: 站点编码 > 路径编码 > 默认编码
        let encoding = siteEncoding || getPathEncoding() || getDefaultEncoding();
        if (encoding) {
            // 检查当前文档是否是纯文本
            const isPlainText = document.contentType && document.contentType.includes('text/plain');

            // 使用XMLHttpRequest重新加载页面内容并指定编码
            const xhr = new XMLHttpRequest();
            xhr.open('GET', window.location.href, false);
            if (isPlainText) {
                xhr.overrideMimeType(`text/plain;charset=${encoding}`);
            } else {
                xhr.overrideMimeType(`text/html;charset=${encoding}`);
            }
            xhr.send();

            if (xhr.status === 200) {
                if (isPlainText) {
                    // 对于纯文本文件，保留原始格式
                    document.documentElement.innerHTML = '<head></head><body><pre></pre></body>';
                    document.querySelector('pre').textContent = xhr.responseText;
                } else {
                    // 清空当前文档
                    document.documentElement.innerHTML = '';

                    // 写入重新获取的内容
                    const newDoc = document.open('text/html', 'replace');
                    newDoc.write(xhr.responseText);
                    newDoc.close();
                }
            }
        }
    };

    // 初始化
    const init = () => {
        addMenuCommands();
        applyEncoding();
    };

    // 文档开始加载时运行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
