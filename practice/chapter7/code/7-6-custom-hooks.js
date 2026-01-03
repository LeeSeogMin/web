/*
 * 7-6 커스텀 Hook 모음
 * 재사용 가능한 상태 로직
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ===========================
// 1. useLocalStorage
// 로컬 스토리지와 상태 동기화
// ===========================

export function useLocalStorage(key, initialValue) {
    // 초기값 로드 (lazy initialization)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('useLocalStorage 읽기 오류:', error);
            return initialValue;
        }
    });

    // 값 변경 시 로컬 스토리지에 저장
    const setValue = (value) => {
        try {
            // 함수형 업데이트 지원
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('useLocalStorage 저장 오류:', error);
        }
    };

    return [storedValue, setValue];
}

// ===========================
// 2. useWindowSize
// 윈도우 크기 추적
// ===========================

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
}

// ===========================
// 3. useFetch
// API 호출 추상화
// ===========================

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        let isCancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, loading, error };
}

// ===========================
// 4. useDebounce
// 값 디바운싱
// ===========================

export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

// ===========================
// 5. useToggle
// 불리언 토글
// ===========================

export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return [value, toggle, { setTrue, setFalse }];
}

// ===========================
// 6. usePrevious
// 이전 값 저장
// ===========================

export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

// ===========================
// 7. useOnClickOutside
// 외부 클릭 감지
// ===========================

export function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // ref 내부 클릭은 무시
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

// ===========================
// 8. useInterval
// setInterval 래퍼
// ===========================

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // 최신 콜백 저장
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // 인터벌 설정
    useEffect(() => {
        if (delay === null) return;

        const id = setInterval(() => {
            savedCallback.current();
        }, delay);

        return () => clearInterval(id);
    }, [delay]);
}

// ===========================
// 9. useMediaQuery
// 미디어 쿼리 감지
// ===========================

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handler = (event) => {
            setMatches(event.matches);
        };

        // 초기값 설정
        setMatches(mediaQuery.matches);

        // 이벤트 리스너 등록
        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
}

// ===========================
// 10. useDocumentTitle
// 문서 제목 설정
// ===========================

export function useDocumentTitle(title) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
}
