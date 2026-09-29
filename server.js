/* =========================================================
 *  프로필 사이트 정적 서버 (Express)
 *  - index.html / about.html / contact.html / assets/* 를 그대로 서빙합니다.
 *  - 프론트엔드 코드는 수정하지 않습니다. 서버는 파일을 내려주는 역할만 합니다.
 * ========================================================= */
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// 정적 파일 서빙 (index.html, about.html, contact.html, assets/ 등)
app.use(
  express.static(ROOT, {
    extensions: ["html"], // "/about" 요청 시 about.html도 찾아줌
  })
);

// 404: 등록된 라우트/정적 파일 어디에도 해당하지 않을 때
app.use((req, res) => {
  res.status(404).type("text/plain").send("404 Not Found: " + req.originalUrl);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).type("text/plain").send("500 Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
