/*
 * 5-7 API 연동 데모
 * JSONPlaceholder API를 사용한 게시글 CRUD
 */

// ===========================
// 상태 관리
// ===========================

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// DOM 요소 캐싱
const elements = {
    loadingStatus: document.getElementById('loadingStatus'),
    successStatus: document.getElementById('successStatus'),
    errorStatus: document.getElementById('errorStatus'),
    skeleton: document.getElementById('skeleton'),
    postList: document.getElementById('postList'),
    errorMessage: document.getElementById('errorMessage'),
    errorDetail: document.getElementById('errorDetail'),
    refreshBtn: document.getElementById('refreshBtn')
};

// ===========================
// UI 상태 관리 함수
// ===========================

function showLoading() {
    elements.loadingStatus.classList.remove('hidden');
    elements.successStatus.classList.add('hidden');
    elements.errorStatus.classList.add('hidden');
    elements.skeleton.classList.remove('hidden');
    elements.postList.classList.add('hidden');
    elements.errorMessage.classList.add('hidden');
    elements.refreshBtn.disabled = true;
}

function showSuccess() {
    elements.loadingStatus.classList.add('hidden');
    elements.successStatus.classList.remove('hidden');
    elements.errorStatus.classList.add('hidden');
    elements.skeleton.classList.add('hidden');
    elements.postList.classList.remove('hidden');
    elements.errorMessage.classList.add('hidden');
    elements.refreshBtn.disabled = false;
}

function showError(message) {
    elements.loadingStatus.classList.add('hidden');
    elements.successStatus.classList.add('hidden');
    elements.errorStatus.classList.remove('hidden');
    elements.skeleton.classList.add('hidden');
    elements.postList.classList.add('hidden');
    elements.errorMessage.classList.remove('hidden');
    elements.errorDetail.textContent = message;
    elements.refreshBtn.disabled = false;
}

// ===========================
// API 함수
// ===========================

/**
 * 게시글 목록 가져오기
 * @param {number} limit - 가져올 게시글 수
 * @returns {Promise<Array>} 게시글 배열
 */
async function fetchPosts(limit = 10) {
    const url = `${API_BASE_URL}/posts?_limit=${limit}`;

    const response = await fetch(url);

    // HTTP 에러 체크 (중요!)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

/**
 * 사용자 정보 가져오기
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} 사용자 객체
 */
async function fetchUser(userId) {
    const url = `${API_BASE_URL}/users/${userId}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`사용자 정보 로드 실패`);
    }

    return response.json();
}

/**
 * 게시글과 작성자 정보를 함께 가져오기
 * @param {number} limit - 가져올 게시글 수
 * @returns {Promise<Array>} 작성자 정보가 포함된 게시글 배열
 */
async function fetchPostsWithAuthors(limit = 10) {
    // 1. 게시글 가져오기
    const posts = await fetchPosts(limit);

    // 2. 고유한 userId 추출
    const userIds = [...new Set(posts.map(post => post.userId))];

    // 3. 사용자 정보 병렬로 가져오기
    const userPromises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(userPromises);

    // 4. userId를 키로 하는 맵 생성
    const userMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
    }, {});

    // 5. 게시글에 작성자 정보 추가
    return posts.map(post => ({
        ...post,
        author: userMap[post.userId]
    }));
}

// ===========================
// 렌더링 함수
// ===========================

/**
 * 게시글 카드 HTML 생성
 * @param {Object} post - 게시글 객체
 * @returns {string} HTML 문자열
 */
function createPostCard(post) {
    const authorName = post.author?.name || '알 수 없음';

    return `
        <article class="post-card">
            <h2>${escapeHtml(post.title)}</h2>
            <p>${escapeHtml(post.body)}</p>
            <div class="post-meta">
                <span>작성자: ${escapeHtml(authorName)}</span>
                <span>게시글 ID: ${post.id}</span>
            </div>
        </article>
    `;
}

/**
 * HTML 특수문자 이스케이프 (XSS 방지)
 * @param {string} text - 이스케이프할 텍스트
 * @returns {string} 이스케이프된 텍스트
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 게시글 목록 렌더링
 * @param {Array} posts - 게시글 배열
 */
function renderPosts(posts) {
    const html = posts.map(createPostCard).join('');
    elements.postList.innerHTML = html;
}

// ===========================
// 메인 함수
// ===========================

/**
 * 게시글 로드 및 표시
 */
async function loadPosts() {
    showLoading();

    try {
        // 로딩 시뮬레이션 (실제로는 제거)
        // await new Promise(resolve => setTimeout(resolve, 1000));

        const posts = await fetchPostsWithAuthors(10);
        renderPosts(posts);
        showSuccess();

        console.log(`${posts.length}개 게시글 로드 완료`);
    } catch (error) {
        console.error('게시글 로드 실패:', error);
        showError(error.message);
    }
}

// ===========================
// 초기화
// ===========================

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {
    console.log('API 데모 초기화');
    loadPosts();
});

// 전역에서 접근 가능하도록 (HTML onclick용)
window.loadPosts = loadPosts;
