import "./App.css";
import { useEffect, useState } from "react";
import {
  Tag,
  Modal,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import SearchBar from './Components/SearchBar';
import TaskTable from './Components/TaskTable';
import AddTaskModal from './Components/AddTask';
import EditTaskModal from './Components/EditTaskModal';

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [len, setLen] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
    setDataSource(tasksFromStorage);
    setSearchData(tasksFromStorage);
  }, []);

  const saveTasksToStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const columns = [
    {
      key: "1",
      title: "Timestamp",
      dataIndex: "timestamp",
      sorter: (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      render: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      width: "200px",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "due",
      sorter: (a, b) => {
        if (!a.due || !b.due) return 0;
        return a.due.localeCompare(b.due);
      },
    },
    {
      key: "5",
      title: "Tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags !== undefined
            ? tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
            : false}
        </>
      ),
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "WORKING", value: "WORKING" },
        { text: "DONE", value: "DONE" },
        { text: "OVERDUE", value: "OVERDUE" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditTwoTone onClick={() => onEditTask(record)} />
            <DeleteTwoTone
              onClick={() => onDeleteTask(record)}
              style={{ marginLeft: "18px" }}
              twoToneColor="red"
            />
          </>
        );
      },
    },
  ];

  const onAddTask = () => {
    setIsVisible(true);
  };

  const onDeleteTask = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const updatedTasks = dataSource.filter((task) => task.id !== record.id);
        setDataSource(updatedTasks);
        setSearchData(updatedTasks);
        saveTasksToStorage(updatedTasks);
      },
    });
  };


  const onEditTask = (record) => {
    setEditedTask(record);
    setIsEditable(true);
  };

  const onSearch = (event) => {
    setLen(event?.target?.value.length);
    if (event?.target?.value.length > 0) {
      const reg = new RegExp(event?.target?.value, "i");
      const filterData = dataSource.filter((e) => reg.test(e.title));
      if (filterData?.length > 0) {
        setSearchData(filterData);
      } else {
        setSearchData([]);
      }
    } else {
      setSearchData(dataSource);
    }
  };

  let final;
  if (len > 0) {
    if (searchData.length > 0) {
      final = searchData;
    } else {
      final = [];
    }
  } else {
    final = dataSource;
  }

  const tagOptions = [
    { label: "Important", value: "important" },
    { label: "Easy", value: "easy" },
    { label: "Urgent", value: "urgent" },
    { label: "Routine", value: "routine" },
  ];

  const statusOptions = [
    { label: "OPEN", value: "OPEN" },
    { label: "WORKING", value: "WORKING" },
    { label: "DONE", value: "DONE" },
    { label: "OVERDUE", value: "OVERDUE" },
  ];

  const handleSubmit = (values) => {
    setIsVisible(false);
    values.id = dataSource.length + 1;
    values.timestamp = new Date().toLocaleDateString();
    const updatedTasks = [...dataSource, values];
    setDataSource(updatedTasks);
    setSearchData(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleEditSubmit = () => {
    const updatedTasks = dataSource.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setDataSource(updatedTasks);
    setIsEditable(false);
    setEditedTask({});
    saveTasksToStorage(updatedTasks);
  };


  return (
    <div className="container">
      <SearchBar onSearch={onSearch} onAddTask={onAddTask} />
      <TaskTable columns={columns} dataSource={final} />
      <EditTaskModal
        isVisible={isEditable}
        onCancel={() => setIsEditable(false)}
        handleSubmit={handleEditSubmit}
        editedTask={editedTask}
        tagOptions={tagOptions}
        statusOptions={statusOptions}
      />
      <AddTaskModal
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
        handleSubmit={handleSubmit}
        tagOptions={tagOptions}
        statusOptions={statusOptions}
      />
    </div>
  );
}

export default App;
