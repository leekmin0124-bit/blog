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
        ctaButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior

            // Placeholder for Data Scan, Filtering, and Result Output
            console.log('지금 시작하기 button clicked!');
            alert('데이터 스캔 및 키워드 추출 로직이 여기에 실행됩니다.');
            // Further logic will be implemented after API clarification
        });
    }
});

