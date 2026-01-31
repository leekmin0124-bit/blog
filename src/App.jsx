import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const startAnalysis = async () => {
    setLoading(true);
    try {
      // 1. API 연결 (본인의 키 사용)
      const genAI = new GoogleGenerativeAI("AIzaSyA_FqOYwqUYuBIMgZaetk41w4AipPz1294");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 2. 분석 실행
      const prompt = "블로그 테크 키워드 3개와 각각의 경쟁강도를 표 형식으로 뽑아줘.";
      const result = await model.generateContent(prompt);
      
      setData(result.response.text());
    } catch (error) {
      alert("분석 실패! 키를 확인하세요.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>Ai 키워드 마스터 V1.0</h1>
      <p>강력한 키워드 분석 로직을 가동합니다.</p>
      
      <button 
        onClick={startAnalysis} 
        style={{ padding: '15px 40px', fontSize: '20px', cursor: 'pointer', background: '#00d1b2', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
      >
        {loading ? "📡 데이터 스캔 중..." : "지금 시작하기"}
      </button>

      {data && (
        <div style={{ marginTop: '30px', background: '#333', padding: '20px', borderRadius: '10px', textAlign: 'left', border: '1px solid #00d1b2' }}>
          <h3>✅ 분석 완료</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{data}</pre>
        </div>
      )}
    </div>
  );
}

export default App;