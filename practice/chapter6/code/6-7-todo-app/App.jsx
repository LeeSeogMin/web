/*
 * 6-7 Todo 앱 완성본
 * 할 일 추가, 삭제, 완료 토글 기능
 */

import { useState } from 'react';
import './App.css';

// ===========================
// TodoItem 컴포넌트
// ===========================

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <label className="todo-label">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
            </label>
            <button
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
                aria-label="삭제"
            >
                ×
            </button>
        </li>
    );
}

// ===========================
// TodoList 컴포넌트
// ===========================

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return <p className="empty-message">할 일이 없습니다. 새로운 할 일을 추가하세요!</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

// ===========================
// TodoForm 컴포넌트
// ===========================

function TodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedText = text.trim();
        if (!trimmedText) return;

        onAdd(trimmedText);
        setText('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="todo-input"
            />
            <button type="submit" className="add-btn">
                추가
            </button>
        </form>
    );
}

// ===========================
// TodoStats 컴포넌트
// ===========================

function TodoStats({ todos }) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const remaining = total - completed;

    return (
        <div className="todo-stats">
            <span>전체: {total}</span>
            <span>완료: {completed}</span>
            <span>남음: {remaining}</span>
        </div>
    );
}

// ===========================
// App 컴포넌트 (메인)
// ===========================

function App() {
    // 초기 데이터
    const [todos, setTodos] = useState([
        { id: 1, text: 'React 기초 학습하기', completed: true },
        { id: 2, text: 'Todo 앱 만들기', completed: false },
        { id: 3, text: 'Hooks 심화 학습하기', completed: false }
    ]);

    // 다음 ID를 위한 상태
    const [nextId, setNextId] = useState(4);

    // 할 일 추가
    const handleAdd = (text) => {
        const newTodo = {
            id: nextId,
            text,
            completed: false
        };

        setTodos(prev => [...prev, newTodo]);
        setNextId(prev => prev + 1);
    };

    // 완료 상태 토글
    const handleToggle = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // 할 일 삭제
    const handleDelete = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    // 완료된 항목 모두 삭제
    const handleClearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    return (
        <div className="todo-app">
            <header className="todo-header">
                <h1>Todo App</h1>
                <TodoStats todos={todos} />
            </header>

            <main>
                <TodoForm onAdd={handleAdd} />
                <TodoList
                    todos={todos}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            </main>

            <footer className="todo-footer">
                <button
                    className="clear-btn"
                    onClick={handleClearCompleted}
                    disabled={todos.filter(t => t.completed).length === 0}
                >
                    완료된 항목 삭제
                </button>
            </footer>
        </div>
    );
}

export default App;
