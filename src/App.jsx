import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleStartAnalysis = async () => {
    setLoading(true);
    setResult(""); // Clear previous results
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "메인 키워드 '부업'에 대한 연관 키워드 5개, 경쟁도, 수익성을 표 형식으로 분석해줘.";
      const response = await model.generateContent(prompt);

      setResult(response.response.text());
    } catch (err) {
      console.error("실행 오류:", err);
      alert("분석 중 오류가 발생했습니다. API 키 또는 네트워크 연결을 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Ai 키워드 마스터 V1.0</h2>

      <button onClick={handleStartAnalysis}>
        {loading ? "🚀 분석 로직 실행 중..." : "지금 시작하기"}
      </button>

      {loading && (
        <div style={{ marginTop: '30px' }}>
          <p>AI가 데이터를 분석하고 있습니다. 잠시만 기다려주세요...</p>
        </div>
      )}

      {result && !loading && (
        <div style={{ marginTop: '30px', textAlign: 'left', background: '#f8f9fa', padding: '20px', borderRadius: '15px', border: '2px solid #28a745' }}>
          <h3 style={{ color: '#28a745' }}>✅ 분석 완료!</h3>
          <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontFamily: 'monospace' }}>{result}</pre>
          <button onClick={() => setResult("")} style={{ marginTop: '10px' }}>다시 분석하기</button>
        </div>
      )}
    </div>
  );
}

export default App;
