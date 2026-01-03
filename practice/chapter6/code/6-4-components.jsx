/*
 * 6-4 컴포넌트와 Props 예제
 * 함수 컴포넌트, props 전달, children 활용
 */

// ===========================
// 1. 기본 함수 컴포넌트
// ===========================

// 함수 선언문
function Welcome() {
    return <h1>안녕하세요!</h1>;
}

// 화살표 함수
const Greeting = () => {
    return <p>React 세계에 오신 것을 환영합니다.</p>;
};

// ===========================
// 2. Props 전달
// ===========================

// props 객체 직접 사용
function UserCard(props) {
    return (
        <div className="user-card">
            <h2>{props.name}</h2>
            <p>나이: {props.age}세</p>
            <p>이메일: {props.email}</p>
        </div>
    );
}

// 구조 분해 할당 (권장)
function UserCardDestructured({ name, age, email }) {
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <p>나이: {age}세</p>
            <p>이메일: {email}</p>
        </div>
    );
}

// props 기본값 설정
function Button({ label = '클릭', onClick, disabled = false }) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

// ===========================
// 3. 이벤트 핸들러 전달
// ===========================

function ActionButton({ text, onAction }) {
    const handleClick = () => {
        console.log(`${text} 버튼 클릭됨`);
        onAction?.();  // onAction이 있으면 호출
    };

    return (
        <button className="action-btn" onClick={handleClick}>
            {text}
        </button>
    );
}

// 사용 예시
function ActionButtons() {
    const handleSave = () => console.log('저장 완료');
    const handleCancel = () => console.log('취소됨');

    return (
        <div>
            <ActionButton text="저장" onAction={handleSave} />
            <ActionButton text="취소" onAction={handleCancel} />
        </div>
    );
}

// ===========================
// 4. children props
// ===========================

// 카드 레이아웃 컴포넌트
function Card({ title, children }) {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

// 사용 예시
function CardExample() {
    return (
        <Card title="사용자 정보">
            <p>이름: 김철수</p>
            <p>나이: 25세</p>
            <button>수정</button>
        </Card>
    );
}

// ===========================
// 5. 컴포넌트 합성
// ===========================

function Avatar({ src, alt, size = 'medium' }) {
    const sizeMap = {
        small: 32,
        medium: 48,
        large: 64
    };

    return (
        <img
            src={src}
            alt={alt}
            width={sizeMap[size]}
            height={sizeMap[size]}
            className="avatar"
        />
    );
}

function UserInfo({ user }) {
    return (
        <div className="user-info">
            <Avatar src={user.avatarUrl} alt={user.name} size="medium" />
            <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

function Comment({ author, text, date }) {
    return (
        <div className="comment">
            <UserInfo user={author} />
            <p className="comment-text">{text}</p>
            <span className="comment-date">{date}</span>
        </div>
    );
}

// ===========================
// 6. 조건부 props
// ===========================

function Alert({ type = 'info', message, dismissible = false, onDismiss }) {
    const typeClasses = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error'
    };

    return (
        <div className={`alert ${typeClasses[type]}`}>
            <span>{message}</span>
            {dismissible && (
                <button className="dismiss-btn" onClick={onDismiss}>
                    ×
                </button>
            )}
        </div>
    );
}

// ===========================
// 7. 스프레드 연산자로 props 전달
// ===========================

function Input(props) {
    return <input {...props} className="custom-input" />;
}

// 사용 예시
function FormExample() {
    return (
        <div>
            <Input type="text" placeholder="이름 입력" />
            <Input type="email" placeholder="이메일 입력" required />
        </div>
    );
}

// ===========================
// 8. 완전한 예제: 프로필 카드
// ===========================

function ProfileCard({ user, onFollow, onMessage }) {
    const { name, bio, avatarUrl, followers, following } = user;

    return (
        <div className="profile-card">
            <div className="profile-header">
                <Avatar src={avatarUrl} alt={name} size="large" />
                <h2>{name}</h2>
            </div>

            <p className="bio">{bio}</p>

            <div className="stats">
                <span><strong>{followers}</strong> 팔로워</span>
                <span><strong>{following}</strong> 팔로잉</span>
            </div>

            <div className="actions">
                <Button label="팔로우" onClick={onFollow} />
                <Button label="메시지" onClick={onMessage} />
            </div>
        </div>
    );
}

// ===========================
// 앱 컴포넌트
// ===========================

function App() {
    const user = {
        name: '김철수',
        bio: 'React 개발자입니다.',
        avatarUrl: 'https://via.placeholder.com/64',
        email: 'kim@example.com',
        followers: 1234,
        following: 567
    };

    return (
        <div className="app">
            <Welcome />
            <Greeting />

            <UserCardDestructured
                name={user.name}
                age={25}
                email={user.email}
            />

            <ProfileCard
                user={user}
                onFollow={() => console.log('팔로우!')}
                onMessage={() => console.log('메시지!')}
            />
        </div>
    );
}

export default App;
