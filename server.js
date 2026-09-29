/* =========================================================
 *  서버 진입점 — app.js를 불러와 포트에 바인딩만 합니다.
 * ========================================================= */
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
