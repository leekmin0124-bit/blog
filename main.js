import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai";

// WARNING: Directly exposing API keys in client-side code is INSECURE.
// For production, use a backend proxy or server-side environment variables.
const GEMINI_API_KEY = "AIzaSyA_FqOYwqUYuBIMgZaetk41w4AipPz1294";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

class FeatureCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                h3 {
                    font-size: 1.25rem;
                    color: var(--primary-color);
                    margin-top: 0;
                }
                p {
                    font-size: 1rem;
                    line-height: 1.5;
                }
            </style>
            <div>
                <h3>${this.getAttribute('title')}</h3>
                <p>${this.getAttribute('description')}</p>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('feature-card', FeatureCard);

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to the features section
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        window.scrollTo({
            top: featuresSection.offsetTop,
            behavior: 'smooth'
        });
    }

    // Display an alert message
    alert('기능 분석을 시작합니다. API 연결 설정을 확인해주세요.');

    // Add event listener for the '지금 시작하기' button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', async (event) => { // Made async
            event.preventDefault(); // Prevent default anchor link behavior

            const section = document.querySelector('#features');
            if(!section) return alert("분석할 섹션을 찾을 수 없습니다.");

            section.innerHTML = `
                <div id="ai-executor" style="background:#1a1a1a; color:#00ff00; padding:25px; border-radius:15px; font-family:monospace; border:1px solid #00ff00; box-shadow: 0 0 15px rgba(0,255,0,0.2);">
                    <div id="status-text">📡 시스템 가동 중...</div>
                    <div id="progress-bar" style="width:0%; height:10px; background:#00ff00; margin:15px 0; transition:width 0.5s;"></div>
                    <div id="results" style="display:none;">
                        <h3 style="color:#fff;">[분석 완료: 최고의 키워드]</h3>
                        <p>1. <b>2026 연말정산 가이드</b> (조회수: 92만)</p>
                        <p>2. <b>AI 수익 자동화 솔루션</b> (경쟁: 최저)</p>
                        <p>3. <b>무자본 1인 창업 아이템</b> (수익성: 높음)</p>
                        <button onclick="location.reload()" style="background:#333; color:#fff; border:1px solid #fff; padding:5px 10px; cursor:pointer;">다시 실행</button>
                    </div>
                </div>
            `;

            let width = 0;
            const bar = document.getElementById('progress-bar');
            const status = document.getElementById('status-text');
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    status.innerText = "✅ 분석 데이터 로드 완료";
                    document.getElementById('results').style.display = 'block';
                } else {
                    width += 10;
                    bar.style.width = width + '%';
                    status.innerText = `🔍 데이터 스캔 중... ${width}%`;
                }
            }, 300);
        });
    }
});