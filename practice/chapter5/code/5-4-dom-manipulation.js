/*
 * 5-4 DOM 조작 예제
 * 요소 선택, 생성, 수정, 삭제, 이벤트 처리
 *
 * 이 스크립트는 5-4-dom-demo.html과 함께 사용
 */

// ===========================
// 1. 요소 선택
// ===========================

// 단일 요소 선택
const title = document.querySelector('h1');
const container = document.querySelector('#app');
const firstButton = document.querySelector('.btn');

// 여러 요소 선택
const allButtons = document.querySelectorAll('.btn');
const listItems = document.querySelectorAll('li');

console.log('제목:', title?.textContent);
console.log('버튼 개수:', allButtons.length);

// ===========================
// 2. 요소 생성 및 추가
// ===========================

function createCard(title, content) {
    // 요소 생성
    const card = document.createElement('div');
    card.className = 'card';

    // 제목 요소
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;

    // 내용 요소
    const cardContent = document.createElement('p');
    cardContent.textContent = content;

    // 조립
    card.appendChild(cardTitle);
    card.appendChild(cardContent);

    return card;
}

// innerHTML vs textContent
function setContentExample() {
    const div = document.createElement('div');

    // textContent: 텍스트만 설정 (안전, XSS 방지)
    div.textContent = '<script>alert("해킹!")</script>';
    // 결과: 문자열 그대로 표시

    // innerHTML: HTML 파싱 (주의 필요)
    // div.innerHTML = '<strong>강조</strong>';
    // 결과: HTML로 렌더링
}

// ===========================
// 3. 클래스 조작
// ===========================

function toggleTheme(element) {
    // 클래스 토글
    element.classList.toggle('dark-mode');

    // 클래스 추가/제거
    // element.classList.add('active');
    // element.classList.remove('active');

    // 클래스 존재 여부 확인
    const hasDarkMode = element.classList.contains('dark-mode');
    console.log('다크 모드:', hasDarkMode);
}

// ===========================
// 4. 스타일 조작
// ===========================

function highlightElement(element) {
    // 직접 스타일 설정
    element.style.backgroundColor = '#fff3e0';
    element.style.padding = '1rem';
    element.style.borderRadius = '8px';

    // 여러 스타일 한 번에 (cssText)
    // element.style.cssText = 'color: red; font-size: 20px;';
}

// ===========================
// 5. 속성 조작
// ===========================

function updateAttributes(element) {
    // 속성 설정
    element.setAttribute('data-id', '123');
    element.setAttribute('aria-label', '새 항목');

    // 속성 읽기
    const id = element.getAttribute('data-id');
    console.log('data-id:', id);

    // 속성 제거
    // element.removeAttribute('data-id');

    // dataset으로 data-* 접근
    element.dataset.status = 'active';
    console.log('dataset:', element.dataset);
}

// ===========================
// 6. 이벤트 리스너
// ===========================

// 기본 클릭 이벤트
function setupClickHandler() {
    const button = document.querySelector('#actionBtn');

    button?.addEventListener('click', (event) => {
        console.log('클릭됨!');
        console.log('타겟:', event.target);
        console.log('좌표:', event.clientX, event.clientY);
    });
}

// 이벤트 옵션
function setupAdvancedHandler() {
    const button = document.querySelector('#onceBtn');

    // once: true - 한 번만 실행
    button?.addEventListener('click', () => {
        console.log('한 번만 실행됩니다!');
    }, { once: true });
}

// ===========================
// 7. 이벤트 위임 (Event Delegation)
// ===========================

function setupEventDelegation() {
    const list = document.querySelector('#itemList');

    // 부모에 이벤트 등록 (버블링 활용)
    list?.addEventListener('click', (event) => {
        // 클릭된 요소가 li인지 확인
        if (event.target.tagName === 'LI') {
            console.log('클릭된 항목:', event.target.textContent);
            event.target.classList.toggle('selected');
        }

        // 삭제 버튼 처리
        if (event.target.classList.contains('delete-btn')) {
            const item = event.target.closest('li');
            item?.remove();
            console.log('항목 삭제됨');
        }
    });
}

// ===========================
// 8. 동적 리스트 관리
// ===========================

function initTodoList() {
    const form = document.querySelector('#todoForm');
    const input = document.querySelector('#todoInput');
    const list = document.querySelector('#todoList');

    form?.addEventListener('submit', (event) => {
        event.preventDefault();  // 폼 제출 방지

        const text = input.value.trim();
        if (!text) return;

        // 새 항목 생성
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-btn">삭제</button>
        `;

        list.appendChild(li);
        input.value = '';
        input.focus();
    });

    // 이벤트 위임으로 삭제 처리
    list?.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.closest('li').remove();
        }
    });
}

// ===========================
// 9. DOM 준비 확인
// ===========================

// DOMContentLoaded 사용
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 준비 완료!');

    // 초기화 함수 호출
    setupClickHandler();
    setupEventDelegation();
    initTodoList();
});

// ===========================
// 10. 요소 제거
// ===========================

function removeElement(selector) {
    const element = document.querySelector(selector);

    // 방법 1: remove()
    element?.remove();

    // 방법 2: 부모에서 제거
    // element?.parentNode.removeChild(element);
}

// 모든 자식 제거
function clearChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    // 또는: parent.innerHTML = '';
}
