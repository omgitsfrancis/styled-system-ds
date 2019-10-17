import React, {
  useState,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  createContext
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styled from "styled-components";
import { backgroundColor, color } from "styled-system";
import { scrollNodeIntoView } from "../utils/scrollNodeIntoView";
// import './Autocomplete.scss';

function wrapEvent(overrideHandler, defaultHandler) {
  return event => {
    overrideHandler && overrideHandler(event);
    if (!event.defaultPrevented) {
      defaultHandler(event);
    }
  };
}

const AutocompleteContext = createContext();
export const Autocomplete = ({ children, onSelect, defaultValue = "" }) => {
  // ========== State Values ==========
  const [value, setValue] = useState(defaultValue);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [navigationIndex, setNavigationIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // ========== Ref Values ==========
  const inputRef = useRef();
  const popoverRef = useRef();
  const optionsRef = useRef();
  const scrollNodeRef = useRef();
  const avoidScrollingRef = useRef(false);

  const Test = styled.div`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  // ========== Context Value ==========
  const contextValue = useMemo(() => {
    return {
      value,
      setValue,
      navigationIndex,
      setNavigationIndex,
      selectedValue,
      setSelectedValue,
      isVisible,
      setIsVisible,
      onSelect,
      inputRef,
      popoverRef,
      optionsRef,
      scrollNodeRef,
      avoidScrollingRef
    };
  }, [
    value,
    setValue,
    selectedValue,
    setSelectedValue,
    navigationIndex,
    setNavigationIndex,
    isVisible,
    setIsVisible,
    onSelect
  ]);

  // ==========
  useLayoutEffect(() => {
    const { current: scrollNode } = scrollNodeRef;
    const { current: boundaryNode } = popoverRef;
    const { current: avoidScrolling } = avoidScrollingRef;
    if (scrollNode && !avoidScrolling) {
      scrollNodeIntoView(scrollNode, boundaryNode);
    }
    avoidScrollingRef.current = false;
  });

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <Test className="autocomplete">{children}</Test>
    </AutocompleteContext.Provider>
  );
};

Autocomplete.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func
};

export const AutocompleteInput = ({
  onChange,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  value: controlledValue,
  selectOnClick = true,
  ...rest
}) => {
  const {
    value,
    setValue,
    isVisible,
    setIsVisible,
    selectedValue,
    setSelectedValue,
    setNavigationIndex,
    inputRef,
    popoverRef,
    onSelect
  } = useContext(AutocompleteContext);

  // ========= Instance Vars ==========
  const isControlled = controlledValue != null;
  const selectOnClickRef = useRef(false);

  if (isControlled && controlledValue !== value) {
    handleValueChange(controlledValue);
  }

  // ========== Handlers ==========
  const handleKeyDown = useKeyDown();

  function handleValueChange(value) {
    if (value.trim() === "") {
      setValue("");
    } else {
      setValue(value);
    }
  }

  function handleChange(event) {
    if (!isControlled) {
      handleValueChange(event.target.value);
    }
    if (!isVisible) {
      setIsVisible(true);
    }
  }

  function handleFocus() {
    if (selectOnClick) {
      selectOnClickRef.current = true;
    }
  }

  function handleBlur() {
    setTimeout(function() {
      if (document.activeElement !== inputRef.current && popoverRef.current) {
        if (!popoverRef.current.contains(document.activeElement)) {
          if (value !== selectedValue) {
            onSelect && onSelect("");
            setValue("");
            setSelectedValue("");
          }
          setIsVisible(false);
          setNavigationIndex(null);
        }
      }
    }, 0);
  }

  function handleClick() {
    if (selectOnClickRef.current) {
      selectOnClickRef.current = false;
      inputRef.current.select();
    }
  }

  const Input = styled.input`
    height: 1.5rem;
    width: 100%;
    border: 1px solid black;
    border-radius: 0.2rem;
    text-indent: 0.5rem;
    &::-ms-clear {
      display: none;
    }
    &::placeholder {
      color: grey;
    }
    &:hover {
      cursor: text;
      background-color: blue;
    }
  `;

  // =========== Render ==========
  const inputValue = controlledValue || value;
  return (
    <Input
      {...rest}
      autoComplete="off"
      className="autocomplete__input"
      role="combobox"
      value={inputValue}
      onChange={wrapEvent(onChange, handleChange)}
      onFocus={wrapEvent(onFocus, handleFocus)}
      onBlur={wrapEvent(onBlur, handleBlur)}
      onClick={wrapEvent(onClick, handleClick)}
      onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      ref={node => (inputRef.current = node)}
    />
  );
};

AutocompleteInput.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node,
  value: PropTypes.string,
  selectOnClick: PropTypes.bool
};

export const AutocompletePopover = ({ children, ...props }) => {
  const { isVisible, popoverRef } = useContext(AutocompleteContext);
  const hidden = !isVisible ? true : false;

  const Popover = styled.div`
    border: solid 0px;
    border-top: 0;
    box-shadow: 0 0.25rem 0.25rem 0.2rem green;
    border-radius: 0 0 0.2rem 0.2rem;
    background: hsla(0, 100%, 100%, 0.99);
    position: absolute;
    left: 0.1rem;
    right: 0rem;
    z-index: 1;
    max-height: 13rem;
    overflow-y: auto;
  `;
  return (
    <Popover
      {...props}
      className="autocomplete__popover"
      tabIndex="-1"
      hidden={hidden}
      role="listbox"
      ref={node => (popoverRef.current = node)}
    >
      {children}
    </Popover>
  );
};

AutocompletePopover.propTypes = {
  children: PropTypes.node
};

export const AutocompleteList = ({ children }) => {
  const { optionsRef } = useContext(AutocompleteContext);

  const List = styled.ul`
    list-style: none;
    margin: 0px;
    padding: 0px;
    user-select: none;
  `;

  useLayoutEffect(() => {
    optionsRef.current = [];
    return () => (optionsRef.current = []);
  });

  return (
    <List className="autocomplete__list" role="list">
      {children}
    </List>
  );
};

AutocompleteList.propTypes = {
  children: PropTypes.node
};

export const AutocompleteOption = ({
  value,
  notValidOption = false,
  onClick,
  onMouseMove,
  children,
  ...props
}) => {
  const {
    setValue,
    setSelectedValue,
    selectedValue,
    setIsVisible,
    navigationIndex,
    setNavigationIndex,
    onSelect,
    optionsRef,
    scrollNodeRef,
    avoidScrollingRef
  } = useContext(AutocompleteContext);

  useEffect(() => {
    optionsRef.current.push(value);
  });

  function handleMouseMove() {
    const { current: options } = optionsRef;
    const index = options.indexOf(value);
    avoidScrollingRef.current = true;
    setNavigationIndex(options[index]);
  }

  function handleClick() {
    if (notValidOption) {
      return;
    }
    onSelect && onSelect(value);
    setValue(value);
    setSelectedValue(value);
    setIsVisible(false);
    setNavigationIndex(null);
  }

  // ========== Instance Vars ==========
  const isActive = navigationIndex === value;
  const isSelected = selectedValue === value;
  const className = classNames({
    autocomplete__option: true,
    "autocomplete__option--selected": isSelected,
    "autocomplete__option--active": isActive
  });

  return (
    <li
      {...props}
      ref={node => {
        if (isActive) scrollNodeRef.current = node;
      }}
      role="option"
      aria-current={isActive}
      aria-selected={isSelected}
      className={className}
      onClick={wrapEvent(onClick, handleClick)}
      onMouseMove={wrapEvent(onMouseMove, handleMouseMove)}
    >
      {value || children}
    </li>
  );
};

AutocompleteOption.propTypes = {
  value: PropTypes.string,
  notValidOption: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  children: PropTypes.node
};

function useKeyDown() {
  const {
    isVisible,
    navigationIndex,
    setValue,
    setIsVisible,
    setNavigationIndex,
    setSelectedValue,
    onSelect,
    optionsRef
  } = useContext(AutocompleteContext);

  return function handleKeyDown(event) {
    const { current: options } = optionsRef;
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        if (!options || options.length === 0) {
          return;
        }

        if (!isVisible) {
          // Opening a closed list
          setIsVisible(true);
        } else {
          const index = options.indexOf(navigationIndex);
          const atBottom = index === options.length - 1;
          if (atBottom) {
            // cycle through
            const firstOption = options[0];
            setNavigationIndex(firstOption);
          } else {
            const nextValue = options[(index + 1) % options.length];
            setNavigationIndex(nextValue);
          }
        }
        return;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (!options || options.length === 0) {
          return;
        }
        if (!isVisible) {
          // Opening a closed list
          setIsVisible(true);
        } else {
          const index = options.indexOf(navigationIndex);
          if (index === 0) {
            const lastOption = options[options.length - 1];
            setNavigationIndex(lastOption);
          } else if (index === -1) {
            // displaying the user's value, so go select the last one
            const value = options.length ? options[options.length - 1] : null;
            setNavigationIndex(value);
          } else {
            // normal case, select previous
            const nextValue =
              options[(index - 1 + options.length) % options.length];
            setNavigationIndex(nextValue);
          }
        }

        return;
      }
      case "Escape": {
        if (isVisible) {
          setNavigationIndex(null);
          setIsVisible(false);
        }
        return;
      }
      case "Enter": {
        event.preventDefault();
        if (isVisible && navigationIndex !== null) {
          // how to handle not valid options?
          onSelect && onSelect(navigationIndex);
          setValue(navigationIndex);
          setSelectedValue(navigationIndex);
          setNavigationIndex(null);
          setIsVisible(false);
        }
        return;
      }
    }
  };
}
