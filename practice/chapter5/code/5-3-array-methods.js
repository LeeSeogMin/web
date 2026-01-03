/*
 * 5-3 배열 메서드 예제
 * map, filter, reduce, find, forEach 활용
 */

// ===========================
// 1. 샘플 데이터
// ===========================

const users = [
    { id: 1, name: '김철수', age: 25, active: true },
    { id: 2, name: '이영희', age: 30, active: false },
    { id: 3, name: '박민수', age: 22, active: true },
    { id: 4, name: '정수진', age: 28, active: true },
    { id: 5, name: '최동훈', age: 35, active: false }
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ===========================
// 2. forEach - 반복 실행 (반환값 없음)
// ===========================

console.log('=== forEach 예제 ===');
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (${user.age}세)`);
});

// ===========================
// 3. map - 변환하여 새 배열 생성
// ===========================

console.log('\n=== map 예제 ===');

// 이름만 추출
const names = users.map(user => user.name);
console.log('이름 목록:', names);

// 제곱 계산
const squares = numbers.map(n => n * n);
console.log('제곱:', squares);

// 객체 변환
const userSummaries = users.map(user => ({
    displayName: `${user.name} (${user.age}세)`,
    status: user.active ? '활성' : '비활성'
}));
console.log('사용자 요약:', userSummaries);

// ===========================
// 4. filter - 조건에 맞는 요소만 추출
// ===========================

console.log('\n=== filter 예제 ===');

// 활성 사용자만
const activeUsers = users.filter(user => user.active);
console.log('활성 사용자:', activeUsers.map(u => u.name));

// 짝수만
const evens = numbers.filter(n => n % 2 === 0);
console.log('짝수:', evens);

// 25세 이상
const adults = users.filter(user => user.age >= 25);
console.log('25세 이상:', adults.map(u => `${u.name}(${u.age}세)`));

// ===========================
// 5. reduce - 누적하여 단일 값 생성
// ===========================

console.log('\n=== reduce 예제 ===');

// 합계 계산
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('1~10 합계:', sum);

// 나이 합계
const totalAge = users.reduce((acc, user) => acc + user.age, 0);
console.log('나이 합계:', totalAge);
console.log('평균 나이:', (totalAge / users.length).toFixed(1));

// 객체로 그룹화
const groupByActive = users.reduce((groups, user) => {
    const key = user.active ? 'active' : 'inactive';
    groups[key] = groups[key] || [];
    groups[key].push(user.name);
    return groups;
}, {});
console.log('활성 상태별 그룹:', groupByActive);

// ===========================
// 6. find - 첫 번째 매칭 요소 반환
// ===========================

console.log('\n=== find 예제 ===');

// 특정 사용자 찾기
const user = users.find(u => u.name === '박민수');
console.log('찾은 사용자:', user);

// 조건에 맞는 첫 번째 요소
const firstInactive = users.find(u => !u.active);
console.log('첫 비활성 사용자:', firstInactive?.name);

// ===========================
// 7. some / every - 조건 검사
// ===========================

console.log('\n=== some / every 예제 ===');

const hasAdult = users.some(u => u.age >= 30);
console.log('30세 이상 존재:', hasAdult);

const allActive = users.every(u => u.active);
console.log('모두 활성:', allActive);

// ===========================
// 8. 메서드 체이닝
// ===========================

console.log('\n=== 메서드 체이닝 예제 ===');

// 활성 사용자의 이름을 나이순으로 정렬
const result = users
    .filter(user => user.active)           // 활성 사용자만
    .sort((a, b) => a.age - b.age)         // 나이순 정렬
    .map(user => user.name);                // 이름만 추출

console.log('활성 사용자 (나이순):', result);

// 복잡한 체이닝 예제
const stats = numbers
    .filter(n => n > 3)                     // 3 초과
    .map(n => n * 2)                        // 2배
    .reduce((acc, n) => acc + n, 0);        // 합계

console.log('3 초과 숫자를 2배한 합계:', stats);

// ===========================
// 9. 구조 분해와 함께 사용
// ===========================

console.log('\n=== 구조 분해 활용 ===');

// 구조 분해로 특정 속성만 추출
const userCards = users.map(({ name, age }) => `${name}: ${age}세`);
console.log('사용자 카드:', userCards);
