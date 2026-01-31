import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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

window.startArticleWriting = async (mainKeyword) => { // Accept mainKeyword as argument

    // Collect keywords from the displayed analysis or use the hardcoded list

    // Now we rely on mainKeyword being passed directly for the primary article.

    const keywords = [

        mainKeyword,

        "AI 수익 자동화 솔루션", // These are from previous user input. We can make these dynamic later if needed.

        "무자본 1인 창업 아이템"

    ];



    alert('포스팅 작성을 시작합니다.');



    const section = document.querySelector('#features');

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

            const prompt = `Generate a comprehensive blog post in Korean about "${keywords[0]}". The article should be optimized for SEO, approximately 500 words long, and include sections relevant to the keyword. Incorporate the other keywords: "${keywords[1]}" and "${keywords[2]}" naturally within the content. Use markdown formatting.

Title: 자면서도 돈 버는 'AI 블로그 자동화' 2uce="background:#f4f4f4; padding:20px; border-radius:10px; border:2px solid #28a745;">

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

            const prompt = `Generate a comprehensive blog post in Korean about "${keywords[0]}". The article should be optimized for SEO, approximately 500 words long, and include sections relevant to the keyword. Incorporate the other keywords: "${keywords[1]}" and "${keywords[2]}" naturally within the content. Use markdown formatting.

Title: 자면서도 돈 버는 'AI 블로그 자동화' 2026년 핵심 전략

Outline:

도입: 수동 글쓰기의 시대는 끝났습니다. 왜 AI 자동화가 필수인가?

핵심: 제미나이 API와 자동 포스팅 툴을 연결하는 3단계 로직.

결론: 지금 바로 시작해야 하는 이유와 수익화 인증 사례.

`; // Added user's provided title and outline to prompt



            const result = await model.generateContent(prompt);

            const response = await result.response;

            const text = response.text();



            statusDiv.innerText = "✅ 글 작성 완료!";

            // Convert markdown to HTML for better display

            articleDiv.innerHTML = `<h2>${keywords[0]}</h2>` + text.replace(/\n/g, '<br>'); // Changed h3 to h2 for main title

            // Add a button to go back or publish

            articleDiv.innerHTML += `<br><button onclick="location.reload()" style="background:#007bff; color:#fff; border:none; padding:10px; border-radius:5px; cursor:pointer; margin-top:10px;">새로운 분석 시작</button>`;



        } catch (error) {

            console.error("Error generating article with Gemini API:", error);

            statusDiv.innerText = "❌ 글 작성 중 오류 발생! 콘솔을 확인해주세요.";

        }

    }

};