// src/9th-web-b/components/SearchForm.tsx
import React, { memo, useCallback } from 'react';

interface SearchFormProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  includeAdult: boolean;
  onIncludeAdultChange: (include: boolean) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = memo(({
  searchQuery,
  onSearchQueryChange,
  includeAdult,
  onIncludeAdultChange,
  language,
  onLanguageChange,
  onSearch
}) => {
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  }, [onSearch]);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
  }, [onSearchQueryChange]);

  const handleAdultChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onIncludeAdultChange(e.target.checked);
  }, [onIncludeAdultChange]);

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  }, [onLanguageChange]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form-container">
        <div className="search-input-group">
          <div className="input-wrapper">
            <span className="input-icon">🎬</span>
            <span className="input-label">영화 제목</span>
            <input
              type="text"
              className="search-input"
              placeholder="영화 제목을 입력하세요"
              value={searchQuery}
              onChange={handleQueryChange}
            />
          </div>

          <div className="checkbox-wrapper">
            <span className="checkbox-icon">🔞</span>
            <span className="checkbox-label">옵션</span>
            <label className="checkbox-label-inline">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={handleAdultChange}
              />
              <span>성인 콘텐츠 포시</span>
            </label>
          </div>
        </div>

        <div className="language-select-group">
          <span className="select-icon">🌐</span>
          <span className="select-label">언어</span>
          <select
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          🔍 검색하기
        </button>
      </div>
    </form>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm;