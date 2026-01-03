/**
 * 1-4-dom-practice.js
 * 제1장 DOM과 JavaScript 런타임 실습 코드
 *
 * 실행 방법:
 *   1. 1-4-dom-practice.html 파일을 브라우저로 열기
 *   2. F12를 눌러 DevTools 열기
 *   3. 버튼을 클릭하여 각 기능 테스트
 *
 * 학습 목표:
 *   - DOM 요소 선택 방법 이해
 *   - 요소 내용 및 스타일 변경 방법 이해
 *   - 이벤트 리스너 사용법 이해
 */

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 콘솔과 화면 모두에 메시지 출력
 * @param {string} message - 출력할 메시지
 */
function log(message) {
    console.log(message);
    const output = document.getElementById('console-output');
    output.textContent = message;
}

// ============================================
// 1. 요소 선택 실습
// ============================================

/**
 * getElementById로 요소 선택
 *
 * [설명]
 * - ID는 문서 내에서 고유해야 함
 * - 가장 빠른 선택 방법
 * - 단일 요소만 반환
 */
function selectById() {
    // [1단계] ID로 요소 선택
    const element = document.getElementById('target-paragraph');

    // [2단계] 선택된 요소 확인
    log(`선택된 요소: ${element.tagName}, 내용: "${element.textContent}"`);

    // [3단계] 시각적 피드백
    element.style.backgroundColor = '#ffc107';
    setTimeout(() => {
        element.style.backgroundColor = '';
    }, 1000);
}

/**
 * getElementsByClassName으로 요소 선택
 *
 * [설명]
 * - 같은 클래스를 가진 모든 요소 반환
 * - HTMLCollection 반환 (배열 유사 객체)
 * - 실시간으로 DOM 변경 반영
 */
function selectByClass() {
    // [1단계] 클래스로 요소들 선택
    const elements = document.getElementsByClassName('sample-class');

    // [2단계] 선택된 요소 개수 확인
    log(`선택된 요소 개수: ${elements.length}개`);

    // [3단계] 모든 요소에 스타일 적용
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '#17a2b8';
        elements[i].style.color = 'white';
    }

    // 1초 후 원래대로
    setTimeout(() => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '';
            elements[i].style.color = '';
        }
    }, 1000);
}

/**
 * querySelector로 요소 선택
 *
 * [설명]
 * - CSS 선택자 문법 사용
 * - 첫 번째 일치하는 요소만 반환
 * - querySelectorAll은 모든 요소 반환
 */
function selectByQuery() {
    // [1단계] CSS 선택자로 요소 선택
    const element = document.querySelector('.sample-class');

    // [2단계] 첫 번째 요소만 선택됨을 확인
    log(`querySelector는 첫 번째 요소만 선택: "${element.textContent}"`);

    // [3단계] 시각적 피드백
    element.style.border = '3px solid #dc3545';
    setTimeout(() => {
        element.style.border = '';
    }, 1000);
}

// ============================================
// 2. 내용 변경 실습
// ============================================

const originalContent = '이 텍스트가 변경됩니다.';

/**
 * textContent로 텍스트 변경
 *
 * [설명]
 * - 순수 텍스트만 변경
 * - HTML 태그는 문자열로 처리됨
 * - XSS 공격 방지에 안전
 */
function changeText() {
    const element = document.getElementById('content-target');

    // textContent: HTML 태그가 그대로 텍스트로 표시됨
    element.textContent = '텍스트가 <strong>변경</strong>되었습니다! (태그는 문자로 표시)';

    log('textContent로 텍스트 변경됨');
}

/**
 * innerHTML로 HTML 변경
 *
 * [설명]
 * - HTML 태그가 실제로 렌더링됨
 * - 주의: 사용자 입력을 넣으면 XSS 위험!
 */
function changeHTML() {
    const element = document.getElementById('content-target');

    // innerHTML: HTML 태그가 실제로 적용됨
    element.innerHTML = '텍스트가 <strong style="color: red;">변경</strong>되었습니다!';

    log('innerHTML로 HTML 변경됨');
}

/**
 * 원래 내용으로 복원
 */
function resetContent() {
    const element = document.getElementById('content-target');
    element.textContent = originalContent;
    log('원래 내용으로 복원됨');
}

// ============================================
// 3. 스타일 변경 실습
// ============================================

/**
 * style 속성으로 직접 스타일 변경
 *
 * [설명]
 * - element.style.속성명 = '값'
 * - CSS 속성명은 camelCase로 변환
 *   (background-color → backgroundColor)
 */
function changeStyle() {
    const element = document.getElementById('style-target');

    // 여러 스타일 속성 변경
    element.style.backgroundColor = '#007bff';
    element.style.color = 'white';
    element.style.borderRadius = '10px';
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'all 0.3s';

    log('style 속성으로 스타일 변경됨');
}

/**
 * classList로 클래스 토글
 *
 * [설명]
 * - classList.add(): 클래스 추가
 * - classList.remove(): 클래스 제거
 * - classList.toggle(): 있으면 제거, 없으면 추가
 * - classList.contains(): 클래스 포함 여부 확인
 */
function toggleClass() {
    const element = document.getElementById('style-target');

    // highlight 클래스 토글
    element.classList.toggle('highlight');

    const hasClass = element.classList.contains('highlight');
    log(`highlight 클래스 ${hasClass ? '추가됨' : '제거됨'}`);
}

/**
 * 스타일 초기화
 */
function resetStyle() {
    const element = document.getElementById('style-target');

    // 인라인 스타일 제거
    element.style.cssText = '';

    // 클래스 제거
    element.classList.remove('highlight');

    log('스타일 초기화됨');
}

// ============================================
// 4. 요소 생성/삭제 실습
// ============================================

let itemCount = 2; // 기존 항목 수

/**
 * 새 요소 생성 및 추가
 *
 * [설명]
 * - document.createElement(): 새 요소 생성
 * - parent.appendChild(): 자식으로 추가
 * - parent.insertBefore(): 특정 위치에 삽입
 */
function addItem() {
    // [1단계] 새 요소 생성
    const newItem = document.createElement('li');

    // [2단계] 내용 설정
    itemCount++;
    newItem.textContent = `새 항목 ${itemCount} (동적 생성)`;
    newItem.style.backgroundColor = '#d4edda';

    // [3단계] 리스트에 추가
    const list = document.getElementById('item-list');
    list.appendChild(newItem);

    log(`새 항목 추가됨: "새 항목 ${itemCount}"`);
}

/**
 * 마지막 요소 삭제
 *
 * [설명]
 * - element.remove(): 자신을 삭제
 * - parent.removeChild(): 자식 삭제
 */
function removeLastItem() {
    const list = document.getElementById('item-list');
    const lastItem = list.lastElementChild;

    if (lastItem) {
        const removedText = lastItem.textContent;
        lastItem.remove();
        log(`항목 삭제됨: "${removedText}"`);
    } else {
        log('삭제할 항목이 없습니다.');
    }
}

// ============================================
// 5. 이벤트 리스너 설정
// ============================================

/**
 * DOMContentLoaded 이벤트
 *
 * [설명]
 * - DOM 트리 구축이 완료되면 실행
 * - 이미지 등 리소스 로딩을 기다리지 않음
 * - script 태그를 head에 넣어도 안전하게 DOM 접근 가능
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로딩 완료!');

    // 입력 필드에 이벤트 리스너 등록
    const input = document.getElementById('text-input');
    const output = document.getElementById('output');

    /**
     * input 이벤트: 값이 변경될 때마다 발생
     *
     * [이벤트 객체 속성]
     * - event.target: 이벤트가 발생한 요소
     * - event.type: 이벤트 유형
     * - event.timestamp: 발생 시간
     */
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        output.textContent = value || '입력한 텍스트가 여기에 표시됩니다.';

        console.log(`입력값 변경: "${value}"`);
    });

    /**
     * keydown 이벤트: 키를 누를 때 발생
     * Enter 키 감지 예제
     */
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter 키가 눌렸습니다!');
            output.style.backgroundColor = '#d4edda';
            setTimeout(() => {
                output.style.backgroundColor = '#fff3cd';
            }, 500);
        }
    });

    // 페이지 로드 완료 메시지
    log('실습 페이지가 로드되었습니다. 버튼을 클릭해보세요!');
});

// ============================================
// 콘솔에서 직접 테스트할 수 있는 예제
// ============================================

// 콘솔에 안내 메시지 출력
console.log('%c=== DOM 실습 가이드 ===', 'color: blue; font-size: 16px; font-weight: bold;');
console.log('다음 명령어를 콘솔에서 직접 실행해보세요:');
console.log('');
console.log('1. document.title');
console.log('   → 페이지 제목 확인');
console.log('');
console.log('2. document.querySelector("h1")');
console.log('   → 첫 번째 h1 요소 선택');
console.log('');
console.log('3. document.querySelectorAll("button").length');
console.log('   → 페이지의 버튼 개수 확인');
console.log('');
console.log('4. document.body.style.backgroundColor = "lightblue"');
console.log('   → 배경색 변경 (새로고침하면 복원됨)');
