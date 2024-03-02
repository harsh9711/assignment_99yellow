import React from 'react';
import { Table} from 'antd';
import "../App.css"

const TaskTable = ({ columns, dataSource }) => {
  return (
    <div className="table">
      <Table
        className="compact-table"
        pagination={{ pageSize: 10 }}
        size="medium"
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default TaskTable;
