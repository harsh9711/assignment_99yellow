import React from 'react';
import { Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ({ onSearch, onAddTask }) => {
  return (
    <nav>
      <h1>ToDo List</h1>
      <Search
        onChange={onSearch}
        placeholder="Enter Title"
        allowClear
        style={{ width: 300 }}
      />
      <Tooltip placement="bottom" title="Add Task">
        <button onClick={onAddTask} className="btn">
          <PlusOutlined />
        </button>
      </Tooltip>
    </nav>
  );
};

export default SearchBar;
