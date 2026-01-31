
import { GoogleGenerativeAI } from "@google/generative-ai";

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

const runAnalysis = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "2026년 네이버 블로그 황금 키워드 3개만 리스트 형식으로 알려줘.";
  
  try {
    const result = await model.generateContent(prompt);
    console.log("분석 결과:", result.response.text());
    alert(result.response.text());
  } catch (error) {
    console.error("오류 발생:", error);
  }
};

window.runAnalysis = runAnalysis;
