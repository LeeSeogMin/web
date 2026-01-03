/*
 * 6-5 State와 이벤트 예제
 * useState Hook, 이벤트 처리, 폼 관리
 */

import { useState } from 'react';

// ===========================
// 1. 기본 useState
// ===========================

function Counter() {
    // [상태값, 상태변경함수] = useState(초기값)
    const [count, setCount] = useState(0);

    return (
        <div className="counter">
            <p>카운트: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>리셋</button>
        </div>
    );
}

// ===========================
// 2. 함수형 업데이트 (권장)
// ===========================

function SafeCounter() {
    const [count, setCount] = useState(0);

    // 함수형 업데이트: 이전 상태 기반으로 업데이트
    const increment = () => {
        setCount(prev => prev + 1);
    };

    const incrementByThree = () => {
        // 함수형 업데이트는 순차적으로 처리됨
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    };

    return (
        <div className="counter">
            <p>카운트: {count}</p>
            <button onClick={increment}>+1</button>
            <button onClick={incrementByThree}>+3</button>
        </div>
    );
}

// ===========================
// 3. 객체 상태
// ===========================

function UserProfile() {
    const [user, setUser] = useState({
        name: '김철수',
        age: 25,
        email: 'kim@example.com'
    });

    // 객체 상태 업데이트: 스프레드로 복사 후 변경
    const updateName = (newName) => {
        setUser({ ...user, name: newName });
        // 또는 함수형 업데이트
        // setUser(prev => ({ ...prev, name: newName }));
    };

    const incrementAge = () => {
        setUser(prev => ({ ...prev, age: prev.age + 1 }));
    };

    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>나이: {user.age}세</p>
            <p>이메일: {user.email}</p>
            <button onClick={() => updateName('이영희')}>이름 변경</button>
            <button onClick={incrementAge}>나이 +1</button>
        </div>
    );
}

// ===========================
// 4. 배열 상태
// ===========================

function ItemList() {
    const [items, setItems] = useState(['사과', '바나나', '오렌지']);

    // 추가
    const addItem = () => {
        const newItem = `과일 ${items.length + 1}`;
        setItems([...items, newItem]);
    };

    // 삭제
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    // 수정
    const updateItem = (index, newValue) => {
        setItems(items.map((item, i) =>
            i === index ? newValue : item
        ));
    };

    return (
        <div className="item-list">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button onClick={addItem}>추가</button>
        </div>
    );
}

// ===========================
// 5. 이벤트 처리
// ===========================

function EventExamples() {
    const [message, setMessage] = useState('');

    // 클릭 이벤트
    const handleClick = (event) => {
        console.log('클릭됨!');
        console.log('타겟:', event.target);
    };

    // 키보드 이벤트
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter 키 입력됨');
        }
    };

    // 마우스 이벤트
    const handleMouseEnter = () => {
        setMessage('마우스가 들어왔습니다');
    };

    const handleMouseLeave = () => {
        setMessage('마우스가 나갔습니다');
    };

    return (
        <div>
            <button onClick={handleClick}>클릭하세요</button>

            <input
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Enter 키를 누르세요"
            />

            <div
                className="hover-box"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ padding: '20px', background: '#eee' }}
            >
                마우스를 올려보세요
            </div>

            <p>{message}</p>
        </div>
    );
}

// ===========================
// 6. 제어 컴포넌트 (폼)
// ===========================

function ControlledForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // 범용 변경 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();  // 폼 제출 방지
        console.log('제출된 데이터:', formData);
        alert(`이름: ${formData.name}\n이메일: ${formData.email}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                />
            </div>

            <div>
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                />
            </div>

            <div>
                <label htmlFor="message">메시지:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="메시지를 입력하세요"
                />
            </div>

            <button type="submit">제출</button>
        </form>
    );
}

// ===========================
// 7. 체크박스와 셀렉트
// ===========================

function AdvancedForm() {
    const [form, setForm] = useState({
        agreed: false,
        newsletter: false,
        country: 'kr'
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="agreed"
                        checked={form.agreed}
                        onChange={handleChange}
                    />
                    이용약관에 동의합니다
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={handleChange}
                    />
                    뉴스레터 구독
                </label>
            </div>

            <div>
                <label htmlFor="country">국가:</label>
                <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                >
                    <option value="kr">한국</option>
                    <option value="us">미국</option>
                    <option value="jp">일본</option>
                </select>
            </div>

            <pre>{JSON.stringify(form, null, 2)}</pre>
        </form>
    );
}

// ===========================
// 8. 토글 예제
// ===========================

function Toggle() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOn(prev => !prev)}>
                {isOn ? 'ON' : 'OFF'}
            </button>
            <p>현재 상태: {isOn ? '켜짐' : '꺼짐'}</p>
        </div>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function App() {
    return (
        <div className="app">
            <h1>State와 이벤트 예제</h1>

            <section>
                <h2>카운터</h2>
                <SafeCounter />
            </section>

            <section>
                <h2>사용자 프로필 (객체 상태)</h2>
                <UserProfile />
            </section>

            <section>
                <h2>아이템 목록 (배열 상태)</h2>
                <ItemList />
            </section>

            <section>
                <h2>폼 제출</h2>
                <ControlledForm />
            </section>

            <section>
                <h2>토글</h2>
                <Toggle />
            </section>
        </div>
    );
}

export default App;
