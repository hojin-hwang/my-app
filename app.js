/* =========================================================
 *  Express 앱 설정
 *  - 미들웨어, 정적 파일 서빙, 에러 핸들러를 구성합니다.
 *  - 실제 서버 구동(listen)은 server.js에서 합니다.
 * ========================================================= */
const path = require("path");
const express = require("express");

const app = express();
const PUBLIC_DIR = path.join(__dirname, "public");

// 정적 파일 서빙: index.html, about.html, contact.html, assets/ 등
app.use(
  express.static(PUBLIC_DIR, {
    extensions: ["html"], // "/about" 요청 시 about.html도 찾아줌
  })
);

// 404: 등록된 라우트/정적 파일 어디에도 해당하지 않을 때
app.use((req, res) => {
  res.status(404).type("text/plain").send("404 Not Found: " + req.originalUrl);
});

// 에러 핸들러 (4개 인자를 모두 받아야 Express가 에러 핸들러로 인식함)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).type("text/plain").send("500 Internal Server Error");
});

module.exports = app;
