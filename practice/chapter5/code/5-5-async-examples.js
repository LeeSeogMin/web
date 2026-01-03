/*
 * 5-5 비동기 프로그래밍 예제
 * 콜백, Promise, async/await, fetch API
 */

// ===========================
// 1. 콜백 패턴 (기본)
// ===========================

console.log('=== 콜백 패턴 ===');

function fetchDataCallback(callback) {
    console.log('데이터 요청 시작...');

    setTimeout(() => {
        const data = { id: 1, name: '테스트 데이터' };
        callback(null, data);  // 에러 우선 콜백 패턴
    }, 1000);
}

// 콜백 사용
fetchDataCallback((error, data) => {
    if (error) {
        console.error('에러:', error);
        return;
    }
    console.log('콜백 결과:', data);
});

// ===========================
// 2. 콜백 지옥 예시 (안티패턴)
// ===========================

/*
// 이렇게 하면 안 됨!
getUser(userId, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            // 깊은 중첩...
        });
    });
});
*/

// ===========================
// 3. Promise 기초
// ===========================

console.log('\n=== Promise 기초 ===');

// Promise 생성
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        console.log('Promise: 데이터 요청 시작...');

        setTimeout(() => {
            const success = true;  // 실패 테스트는 false로

            if (success) {
                resolve({ id: 2, name: 'Promise 데이터' });
            } else {
                reject(new Error('데이터 로드 실패'));
            }
        }, 1000);
    });
}

// Promise 사용
fetchDataPromise()
    .then(data => {
        console.log('Promise 결과:', data);
        return data.id;  // 다음 then으로 전달
    })
    .then(id => {
        console.log('전달받은 ID:', id);
    })
    .catch(error => {
        console.error('Promise 에러:', error.message);
    })
    .finally(() => {
        console.log('Promise 완료 (성공/실패 무관)');
    });

// ===========================
// 4. Promise 체이닝
// ===========================

console.log('\n=== Promise 체이닝 ===');

function step1() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Step 1 완료');
            resolve(1);
        }, 500);
    });
}

function step2(prev) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Step 2 완료 (이전값:', prev, ')');
            resolve(prev + 1);
        }, 500);
    });
}

function step3(prev) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Step 3 완료 (이전값:', prev, ')');
            resolve(prev + 1);
        }, 500);
    });
}

// 체이닝 실행
step1()
    .then(step2)
    .then(step3)
    .then(result => console.log('최종 결과:', result));

// ===========================
// 5. Promise.all - 병렬 실행
// ===========================

console.log('\n=== Promise.all ===');

const promise1 = new Promise(resolve =>
    setTimeout(() => resolve('결과 1'), 1000)
);
const promise2 = new Promise(resolve =>
    setTimeout(() => resolve('결과 2'), 500)
);
const promise3 = new Promise(resolve =>
    setTimeout(() => resolve('결과 3'), 800)
);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('Promise.all 결과:', results);
    })
    .catch(error => {
        console.error('하나라도 실패:', error);
    });

// ===========================
// 6. Promise.allSettled - 모든 결과 수집
// ===========================

console.log('\n=== Promise.allSettled ===');

const settled1 = Promise.resolve('성공 1');
const settled2 = Promise.reject('실패');
const settled3 = Promise.resolve('성공 2');

Promise.allSettled([settled1, settled2, settled3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`${index + 1}: 성공 -`, result.value);
            } else {
                console.log(`${index + 1}: 실패 -`, result.reason);
            }
        });
    });

// ===========================
// 7. async/await 기초
// ===========================

console.log('\n=== async/await 기초 ===');

async function fetchDataAsync() {
    console.log('async/await: 시작');

    // await는 Promise가 완료될 때까지 대기
    const data = await fetchDataPromise();
    console.log('async/await 결과:', data);

    return data;
}

// async 함수 호출
fetchDataAsync().then(result => {
    console.log('async 함수 반환값:', result);
});

// ===========================
// 8. async/await 에러 처리
// ===========================

console.log('\n=== async/await 에러 처리 ===');

async function fetchWithError() {
    try {
        const response = await fetch('https://invalid-url.example');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('에러 발생:', error.message);
        // 대체값 반환 또는 에러 재던지기
        return null;
    } finally {
        console.log('finally: 항상 실행');
    }
}

// ===========================
// 9. fetch API 기본
// ===========================

console.log('\n=== fetch API ===');

async function fetchPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

    try {
        const response = await fetch(url);

        // HTTP 에러 체크 (fetch는 4xx, 5xx에서 예외를 던지지 않음)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log('게시글 목록:');
        posts.forEach(post => {
            console.log(`- [${post.id}] ${post.title.substring(0, 30)}...`);
        });

        return posts;
    } catch (error) {
        console.error('Fetch 에러:', error.message);
        return [];
    }
}

// 실행
fetchPosts();

// ===========================
// 10. fetch POST 요청
// ===========================

async function createPost(title, body) {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newPost = await response.json();
        console.log('생성된 게시글:', newPost);

        return newPost;
    } catch (error) {
        console.error('POST 에러:', error.message);
        return null;
    }
}

// 실행 (테스트용)
// createPost('테스트 제목', '테스트 내용');

// ===========================
// 11. 병렬 vs 순차 실행
// ===========================

console.log('\n=== 병렬 vs 순차 실행 ===');

async function sequentialFetch() {
    console.time('순차');
    const post1 = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post2 = await fetch('https://jsonplaceholder.typicode.com/posts/2');
    console.timeEnd('순차');
}

async function parallelFetch() {
    console.time('병렬');
    const [post1, post2] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts/1'),
        fetch('https://jsonplaceholder.typicode.com/posts/2')
    ]);
    console.timeEnd('병렬');
}

// 비교 실행
// sequentialFetch();
// parallelFetch();

// ===========================
// 12. 실용 패턴: 데이터 로딩
// ===========================

async function loadUserData(userId) {
    const baseUrl = 'https://jsonplaceholder.typicode.com';

    try {
        // 사용자와 게시글을 병렬로 로드
        const [userRes, postsRes] = await Promise.all([
            fetch(`${baseUrl}/users/${userId}`),
            fetch(`${baseUrl}/posts?userId=${userId}&_limit=3`)
        ]);

        if (!userRes.ok || !postsRes.ok) {
            throw new Error('데이터 로드 실패');
        }

        const user = await userRes.json();
        const posts = await postsRes.json();

        return {
            user,
            posts,
            postCount: posts.length
        };
    } catch (error) {
        console.error('loadUserData 에러:', error.message);
        return null;
    }
}

// 실행
loadUserData(1).then(data => {
    if (data) {
        console.log('\n사용자:', data.user.name);
        console.log('게시글 수:', data.postCount);
    }
});
