import "./style.css";
import renderList from "./listRenderer";
import { debounce } from "./util";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

// 매번 스크롤을 발생시킬 경우 성능 저하가 발생할 수 있기 때문에 중간에 한 번 확인 || 마지막에 한 번 확인하는 방법이 적절
const onScroll = e => {
  // do something (hint: e.target.scrollingElement)
  const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;

  if (scrollTop + clientHeight === scrollHeight) {
    fetchMore();
  }
};

// throttle: 일정시간간격으로 한 번씩만 실행
// debounce: 연속으로 발생하는 이벤트에 대해 마지막 한 번만 실행

document.addEventListener("scroll", debounce(onScroll, 300));
fetchMore();

// https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver
// const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
//   if (isIntersecting) fetchMore();
// });
// fetchMoreObserver.observe(fetchMoreTrigger);
// fetchMore();
