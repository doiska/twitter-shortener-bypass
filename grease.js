// ==UserScript==
// @name        t.co bypass
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @include     https://tweetdeck.twitter.com/*
// @version     2
// @grant       none
// ==/UserScript==

const formatWithHttps = (s) => s.startsWith('http') ? s : `https://${s}`;

const observer = new MutationObserver(function() {
	const nodes = [...document.querySelectorAll("a[href^='https://t.co/']")];
	nodes.map(node => {
		const url = [...node.childNodes].filter(n => n.nodeName !== 'svg').map(n => n.innerHTML ?? n.textContent).filter(text => text !== '…').join('');
		node.href = formatWithHttps(url);
	});
});

const config = {
	childList: true,
	subtree: true
};

observer.observe(document.body, config);