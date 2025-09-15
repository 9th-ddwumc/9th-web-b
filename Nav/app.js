const hamburger = document.querySelector(".nav__hamburger");
const sidebar = document.querySelector(".nav__sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// 바깥 영역 클릭 시 사이드바 닫기
document.addEventListener("click", (event) => {
  if (sidebar.classList.contains("active")) {
    // 사이드바나 햄버거 버튼 영역 외 클릭 시 닫기
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      sidebar.classList.remove("active");
    }
  }
});
