import React from 'react';

export function circleSVG() {
    return (
        <svg width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <path d="M47,77 C53.4475983,75.6434851 59.2789241,72.4686812 64,68" id="path-1"/>
            <filter x="-52.9%" y="-77.8%" width="205.9%" height="300.0%" filterUnits="objectBoundingBox" id="filter-2">
                <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/>
                <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
                <feMorphology radius="2" operator="erode" in="SourceAlpha" result="shadowInner"/>
                <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"/>
                <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"/>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                <feColorMatrix values="0 0 0 0 0.941176471   0 0 0 0 0.0823529412   0 0 0 0 0.149019608  0 0 0 0.191321332 0" type="matrix" in="shadowBlurOuter1"/>
            </filter>
            <path d="M71.0132964,60 C74.7980268,54.2010948 77,47.260105 77,39.8009284 C77,22.4319331 65.0606785,7.87259919 49,4" id="path-3"/>
            <filter x="-35.7%" y="-14.3%" width="171.4%" height="135.7%" filterUnits="objectBoundingBox" id="filter-4">
                <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/>
                <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
                <feMorphology radius="3" operator="erode" in="SourceAlpha" result="shadowInner"/>
                <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"/>
                <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"/>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                <feColorMatrix values="0 0 0 0 0.970775187   0 0 0 0 0.774024841   0 0 0 0 0.109462149  0 0 0 0.244112319 0" type="matrix" in="shadowBlurOuter1"/>
            </filter>
            <path d="M39,3 C19.0175681,3.58935929 3,19.9397964 3,40.0235842 C3,59.7453222 18.4452771,75.8670983 37.9232682,77" id="path-5"/>
            <filter x="-25.0%" y="-9.5%" width="150.0%" height="124.3%" filterUnits="objectBoundingBox" id="filter-6">
                <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/>
                <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
                <feMorphology radius="2" operator="erode" in="SourceAlpha" result="shadowInner"/>
                <feOffset dx="0" dy="2" in="shadowInner" result="shadowInner"/>
                <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"/>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                <feColorMatrix values="0 0 0 0 0.49415046   0 0 0 0 0.826234102   0 0 0 0 0.129877269  0 0 0 0.266757246 0" type="matrix" in="shadowBlurOuter1"/>
            </filter>
        </defs>
        <g id="Клиентский-мониторинг" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="сircle">
                <circle id="Oval-2" stroke="#979797" strokeWidth="6" opacity="0.0701992754" cx="40" cy="40" r="37"/>
                <g id="Oval-2" opacity="0.7" strokeLinecap="round">
                    <use stroke="#F01526" strokeWidth="4" xlinkHref="#path-1"/>
                </g>
                <g id="Oval-2" strokeLinecap="round">
                    <use stroke="#F8C51C" strokeWidth="6" xlinkHref="#path-3"/>
                </g>
                <g id="Oval-2" opacity="0.7" strokeLinecap="round">
                    <use stroke="#7ED321" strokeWidth="4" xlinkHref="#path-5"/>
                </g>
            </g>
        </g>
    </svg>)
}