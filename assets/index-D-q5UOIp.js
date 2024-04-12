var v=(e,t,c)=>{if(!t.has(e))throw TypeError("Cannot "+c)};var m=(e,t,c)=>(v(e,t,"read from private field"),c?c.call(e):t.get(e)),b=(e,t,c)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,c)};(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function c(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=c(r);fetch(r.href,n)}})();const y=e=>typeof e=="function",l=e=>typeof e=="object"&&e!==null,w=(e,t,c,i=!0)=>{l(e)&&Object.defineProperty(e,t,{value:c,writable:!0,configurable:!0,enumerable:!!i})},f=function(e=[]){return{add:t=>!e.includes(t)&&e.push(t),cleanup:()=>e.pop(),get current(){return e[e.length-1]}}}();var p;class h{constructor(){b(this,p,new Set)}add(t){y(t)&&m(this,p).add(t)}notify(){m(this,p).forEach(t=>t.call())}}p=new WeakMap;function a(e){if(y(e)){f.add(e);try{e.call()}finally{f.cleanup()}}}function L(e){const t=new h;let c;return a(()=>{try{y(e)&&(c=e.call())}finally{t.notify()}}),{get value(){return t.add(f.current),c}}}function E(e={}){function t(i){if(!l(i))return new h;const r=Object.create(null);return Object.keys(i).forEach(n=>{w(r,n,t(i[n]))}),r}function c(i={},r){const n=r||t(i);return{get(o,u){return l(o[u])?new Proxy(o[u],c(o[u],n[u])):(n instanceof h?n.add(f.current):l(n)&&n[u]&&n[u].add(f.current),o[u])},set(o,u,d){return o[u]=d,l(d)?n[u]=t(d):n[u]&&n[u].notify(),!0}}}return new Proxy(e,c(e))}const[P,g,O,T]=["appTitle","c-input","f-input","tempTxt"].map(e=>document.getElementById(e)),s=E({app:{title:"Temperature Converter"},temp:{c:0,f:32}}),x=L(()=>`${s.temp.c} <sup>0</sup>C  =  ${s.temp.f} F`);function C(e){s.temp.c=e,s.temp.f=e*(9/5)+32}function F(e){s.temp.f=e,s.temp.c=(e-32)*(5/9)}a(()=>P.textContent=s.app.title);a(()=>g.value=s.temp.c);a(()=>O.value=s.temp.f);a(()=>T.innerHTML=x.value);g.addEventListener("input",e=>C(e.target.value));O.addEventListener("input",e=>F(e.target.value));
