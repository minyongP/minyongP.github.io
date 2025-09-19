let mockData = [
  {
    id: 0,
    isDone: false,
    content: "React study",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: "친구만나기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "낮잠자기",
    date: new Date().getTime(),
  },
];

let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  initData(mockData);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0~11 이므로 +1
  const date = today.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[today.getDay()];

  const fullDate = `${year}년 ${month}월 ${date}일 ${day}요일`;

  document.querySelector(".Header h1").textContent = fullDate;
};

const initData = (printData) => {
  // mockData 배열을 forEach를 이용해서 화면에 출력한다.
  const wrapper = document.querySelector(".todos_wrapper");
  wrapper.innerHTML = "";

  printData.forEach((todo) => {
    const item = document.createElement("div");
    item.className = "TodoItem";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onchange = () => onUpdate(todo.id);
    if (todo.isDone) checkBox.checked = true;

    const content = document.createElement("div");
    content.className = "content";
    content.textContent = todo.content;

    const date = document.createElement("div");
    date.className = "date";
    date.textContent =
      new Date(todo.date).toLocaleDateString() +
      new Date(todo.date).toLocaleTimeString();

    const button = document.createElement("button");
    button.name = "delBtn";
    button.value = todo.id;
    button.textContent = "삭제";
    button.onclick = function () {
      todoDel(this);
    };

    item.appendChild(checkBox);
    item.appendChild(content);
    item.appendChild(date);
    item.appendChild(button);

    wrapper.appendChild(item);
  });
};

// 추가 기능
let idIndex = 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector(".Editor > button").onclick = () => {
  event.preventDefault(); //전송기능 막음
  const input = document.querySelector(".Editor > input");
  const content = input.value;
  //id는 idIndex,
  // isDone은 기본 false,
  // content는 입력한 내용,
  // date는 new Date().getTime()
  // 준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
  mockData.push({
    id: idIndex++,
    isDone: false,
    content: content,
    date: new Date().getTime(),
  });

  input.value = "";
  initData(mockData); //호출한다.(다시 화면 랜더링)
};

// 수정 기능
const onUpdate = (targetId) => {
  //TodoItem에서 호출할 때 전달한 id
  /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
map함수를 이용한다. map함수의 결과를 mockData에 저장한다.
 */
  mockData = mockData.map((todo) =>
    todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
  );

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

// 삭제 기능
const todoDel = (th) => {
  //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
  const targetId = parseInt(th.value, 10); // 버튼 value에서 id 추출
  mockData = mockData.filter((todo) => todo.id !== targetId);
  initData(mockData); //호출한다.(다시 화면 랜더링)
};

// 검색 기능
document.querySelector("#keyword").onkeyup = (e) => {
  let searchedTodos = getFilterData(e.target.value);
  initData(searchedTodos);
};

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }
  //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
  //filter의 결과를 리턴 한다.
  return mockData.filter((todo) =>
    todo.content.toLowerCase().includes(search.toLowerCase())
  );
};
