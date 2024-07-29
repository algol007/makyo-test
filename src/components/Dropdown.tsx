import { useState } from 'react';
import CloseIcon from '../assets/close-icon.png';
import SearchIcon from '../assets/search-icon.png';
import './Dropdown.css';

interface MultiSelectDropdownProps {
    options: string[];
    onChange: (value: string[]) => void;
    isMultiple?: boolean;
    isDisabled?: boolean;
}

const MultiSelectDropdown = ({ options, onChange, isMultiple=true, isDisabled=false }: MultiSelectDropdownProps) => {
    const [keyword, setKeyword] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [optionList, setOptionList] = useState<string[]>(options)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
      if (isDisabled) return
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
      if (!isMultiple) {
          setSelectedOptions([option])
          return;
      }
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const handleSearch = (value: string) => {
      const search = value.toLowerCase();
      const newOptionList = options.filter(data => data.toLowerCase().includes(search));
        setKeyword(search);

      if (search === '') setOptionList(options)
      else setOptionList(newOptionList)
  }

 const getHighlightedText = (text: string, highlight: string) => {
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, idx) => (
          <span key={idx} className={part.toLowerCase() === highlight.toLowerCase() ? 'highlight' : ''}>
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="multi-select-dropdown">
        <div className={`dropdown-wrapper ${isDisabled ? 'disabled' : ''}`}>
            <div className="dropdown-selected">{selectedOptions.length ? selectedOptions.map((option: string) => (
                <div
                    key={option}
                    onClick={() => handleOptionClick(option)}
                >
                    {
                        isMultiple ?
                        <div className="dropdown-selected-item">
                            {option}
                            <img src={CloseIcon} alt="close" width={8} height={8} />
                        </div> :
                        <div>{option}</div>
                    }
                </div>
            )) : <span style={{width: '100%'}} onClick={toggleDropdown}>Select options</span>}</div>
            <span className="arrow" onClick={toggleDropdown}>{isDropdownOpen ? '▲' : '▼'}</span>
        </div>
        {
            isDropdownOpen && (
                <div className="dropdown-list-wrapper">
                    <div className="dropdown-search-wrapper">
                        <img src={SearchIcon} alt="close" width={16} height={16} className="search-icon" />
                        <input type="search" className="dropdown-search" onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                    <div className="dropdown-list">
                        {optionList.map((option: string) => (
                            <div
                                key={option}
                                className={`dropdown-list-item ${selectedOptions.includes(option) ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {getHighlightedText(option, keyword)}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default MultiSelectDropdown;