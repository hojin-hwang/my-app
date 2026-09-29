/* =========================================================
 *  프로필 데이터 (이 파일만 수정하면 사이트 내용이 바뀝니다)
 *  TODO 표시된 부분을 본인 정보로 채워주세요.
 * ========================================================= */
const PROFILE = {
  name: "Jake Hwang",
  nameKo: "황호진", // TODO: 실제 한글 이름으로 수정
  title: "Full-Stack Developer",
  // 히어로 영역에서 타이핑 효과로 순환되는 문구
  roles: [
    "Full-Stack Developer",
    "프론트엔드 & 백엔드 모두 다룹니다",
    "삼육보건대학교 재학생",
    "꾸준히 배우는 개발자",
  ],
  summary:
    "화면부터 서버까지 직접 만들며 배우는 풀스택 개발자입니다. " +
    "사용자가 실제로 쓰는 기능을 끝까지 완성하는 것을 가장 중요하게 생각합니다.",
  location: "Seoul, Korea",
  email: "hojinh@gmail.com",
  phone: "", // TODO: 공개하고 싶으면 입력 (예: "010-0000-0000"), 비우면 표시되지 않음
  resumeUrl: "", // TODO: 이력서 PDF 경로 (예: "assets/resume.pdf"), 비우면 버튼 숨김
  siteUrl: "https://my-app-one-snowy.vercel.app/",
  avatarInitials: "JH",

  links: [
    { label: "GitHub", url: "https://github.com/hojin-hwang", icon: "github" },   // TODO
    { label: "Email", url: "mailto:hojinh@gmail.com", icon: "mail" },
    { label: "Website", url: "https://my-app-one-snowy.vercel.app/", icon: "link" },
    { label: "Blog", url: "", icon: "blog" },                          // TODO (비우면 숨김)
    { label: "LinkedIn", url: "", icon: "linkedin" },                  // TODO (비우면 숨김)
  ],

  // 소개 페이지의 짧은 문단들
  about: [
    "안녕하세요. 웹 서비스를 처음부터 끝까지 만드는 것을 좋아하는 개발자입니다.",
    "삼육보건대학교에 재학 중이며, 수업 외 시간에는 직접 서비스를 기획하고 " +
      "프론트엔드와 백엔드를 함께 구현하면서 실력을 쌓고 있습니다.",
    "새로운 기술을 빠르게 익히고, 코드로 문제를 해결하는 과정을 즐깁니다.",
  ],

  // 숫자 카운터 (원하는 값으로 수정)
  stats: [
    { label: "개발 경험", value: 2, suffix: "년+" },
    { label: "완성한 프로젝트", value: 6, suffix: "개" },
    { label: "다루는 언어", value: 5, suffix: "개" },
  ],

  // level: 0~100
  skills: [
    {
      group: "Frontend",
      items: [
        { name: "HTML / CSS", level: 90 },
        { name: "JavaScript (ES6+)", level: 85 },
        { name: "React", level: 75 },
        { name: "TypeScript", level: 65 },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js / Express", level: 80 },
        { name: "Java / Spring Boot", level: 70 },
        { name: "Python", level: 70 },
        { name: "REST API 설계", level: 75 },
      ],
    },
    {
      group: "Database & DevOps",
      items: [
        { name: "MySQL", level: 75 },
        { name: "MongoDB", level: 65 },
        { name: "Git / GitHub", level: 85 },
      ],
    },
  ],

  // tags 값이 프로젝트 필터 버튼으로 자동 생성됩니다.
  projects: [
    {
      title: "프로필 웹사이트",
      period: "2026",
      description:
        "외부 JS 라이브러리 없이 바닐라 자바스크립트로 만든 개인 프로필 사이트. " +
        "테마 전환, 스크롤 스파이, 프로젝트 필터를 직접 구현했습니다.",
      tags: ["Frontend", "JavaScript"],
      stack: ["HTML", "CSS", "Vanilla JS"],
      repo: "",
      demo: "",
    },
    {
      title: "할 일 관리 API 서버",
      period: "2026",
      description:
        "JWT 인증과 사용자별 할 일 CRUD를 제공하는 REST API. " +
        "레이어 구조로 나누고 입력값 검증과 에러 처리를 정리했습니다.",
      tags: ["Backend", "API"],
      stack: ["Node.js", "Express", "MySQL"],
      repo: "",
      demo: "",
    },
    {
      title: "커뮤니티 게시판",
      period: "2025",
      description:
        "회원가입부터 글쓰기, 댓글, 이미지 업로드까지 직접 구현한 풀스택 프로젝트. " +
        "페이지네이션과 검색 기능을 포함합니다.",
      tags: ["Full-Stack", "Frontend", "Backend"],
      stack: ["React", "Spring Boot", "MySQL"],
      repo: "",
      demo: "",
    },
  ],

  // 학력 · 경험 타임라인 (최신순)
  timeline: [
    {
      when: "2025 — 현재",
      what: "삼육보건대학교 재학",
      where: "Sahmyook Health University",
      detail: "전공 수업과 병행하여 웹 개발 학습 및 개인 프로젝트 진행",
    },
    {
      when: "2025",
      what: "풀스택 웹 개발 학습 시작",
      where: "Self-taught",
      detail: "HTML/CSS/JavaScript 기초부터 서버·데이터베이스까지 단계적으로 학습",
    },
  ],

  contact: {
    headline: "함께 만들 일이 있다면 연락 주세요",
    body: "협업, 프로젝트 문의, 채용 관련 연락 모두 환영합니다. 메일로 보내주시면 가장 빠르게 확인합니다.",
    address: "Seoul, Korea", // TODO: 상세 주소가 필요하면 수정
  },
};
