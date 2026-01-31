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

// Global function to start article writing
window.startArticleWriting = async () => {
    // Collect keywords from the displayed analysis or use the hardcoded list
    const section = document.querySelector('#features');
    let keywords = [];
    if (section) {
        const keywordElements = section.querySelectorAll('#results p b');
        keywordElements.forEach(el => {
            let keywordText = el.innerText.trim();
            // Remove parenthesized text like "(조회수: 92만)"
            keywordText = keywordText.replace(/\s*\(.*\)/, '');
            keywords.push(keywordText);
        });
    }

    if (keywords.length === 0) {
        // Fallback to hardcoded keywords if not found in DOM
        keywords = [
            "2026 연말정산 가이드",
            "AI 수익 자동화 솔루션",
            "무자본 1인 창업 아이템"
        ];
    }

    alert('포스팅 작성을 시작합니다.');

    if (section) {
        section.innerHTML = `
            <div style="background:#f4f4f4; padding:20px; border-radius:10px; border:2px solid #28a745;">
                <h3 style="color:#28a745;">✨ AI 블로그 글 작성 중...</h3>
                <p>선택된 키워드: ${keywords.join(', ')}</p>
                <div id="article-generation-status">로딩 중...</div>
                <div id="generated-article" style="margin-top:20px; border-top:1px solid #ccc; padding-top:10px;">
                    <!-- Generated article content will appear here -->
                </div>
            </div>
        `;

        const statusDiv = document.getElementById('article-generation-status');
        const articleDiv = document.getElementById('generated-article');

        try {
            statusDiv.innerText = "Gemini API를 사용하여 글 작성 중입니다...";
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Generate a comprehensive blog post in Korean about "${keywords[0]}". The article should be optimized for SEO, approximately 500 words long, and include sections relevant to the keyword. Incorporate the other keywords: "${keywords[1]}" and "${keywords[2]}" naturally within the content. Use markdown formatting.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            statusDiv.innerText = "✅ 글 작성 완료!";
            // Convert markdown to HTML for better display
            // For a real project, you'd use a markdown parser library
            articleDiv.innerHTML = `<h3>${keywords[0]}</h3>` + text.replace(/\n/g, '<br>');
            // Add a button to go back or publish
            articleDiv.innerHTML += `<br><button onclick="location.reload()" style="background:#007bff; color:#fff; border:none; padding:10px; border-radius:5px; cursor:pointer; margin-top:10px;">새로운 분석 시작</button>`;

        } catch (error) {
            console.error("Error generating article with Gemini API:", error);
            statusDiv.innerText = "❌ 글 작성 중 오류 발생! 콘솔을 확인해주세요.";
        }
    }
};

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
                <div id="ai-executor" style="background:#1a1a1a; color:#0f0; padding:25px; border-radius:15px; font-family:monospace; border:1px solid #0f0; box-shadow: 0 0 15px rgba(0,255,0,0.2);">
                    <div id="status-text">📡 시스템 가동 중...</div>
                    <div id="progress-bar" style="width:0%; height:10px; background:#0f0; margin:15px 0; transition:width 0.5s;"></div>
                    <div id="results" style="display:none;">
                        <h3>[V1.0 엔진 가동] 실시간 강력 키워드]</h3>
                        <p>▶ 분석 완료: <b>2026 주택 청약 변경안</b> (조회수: 92만)</p>
                        <p>▶ 분석 완료: <b>제미나이 2.0 API 활용법</b> (트렌드: 상위)</p>
                        <p>▶ 분석 완료: <b>무자본 1인 창업 아이템</b> (수익성: 높음)</p>
                        <hr>
                        <button onclick="window.startArticleWriting()" style="background:#333; color:#fff; border:1px solid #fff; padding:5px 10px; cursor:pointer;">글쓰기 실행</button>
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