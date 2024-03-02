import React from 'react';
import { Modal, Form, DatePicker, Select, Button, Input } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddTaskModal = ({ isVisible, onCancel, handleSubmit }) => {
    const [form] = Form.useForm();

    const tagOptions = [
        { label: 'Important', value: 'important' },
        { label: 'Easy', value: 'easy' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Routine', value: 'routine' },
    ];

    const statusOptions = [
        { label: 'OPEN', value: 'OPEN' },
        { label: 'WORKING', value: 'WORKING' },
        { label: 'DONE', value: 'DONE' },
        { label: 'OVERDUE', value: 'OVERDUE' },
    ];

    const onFinish = (values) => {
        handleSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onCancel}
            title="Add New Task"
           
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title' }, { max: 100 }]}
                    optional
                >
                    <Input placeholder="Enter the title" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the description' }, { max: 1000 }]}
                >
                    <Input.TextArea placeholder="Enter the description" />
                </Form.Item>
                <Form.Item
                    label="Due Date"
                    name="due"
                    requiredMark="optional"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value && value < moment().startOf('day')) {
                                    return Promise.reject(new Error('Due date cannot be earlier than today'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <DatePicker format="MM/DD/YYYY" />
                </Form.Item>
                <Form.Item label="Tag" name="tags" requiredMark="optional">
                    <Select mode="tags" placeholder="Enter the tag">
                        {tagOptions.map((tag) => (
                            <Option key={tag.value} value={tag.value}>
                                {tag.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="OPEN"
                    rules={[{ required: true, message: "Please choose the status" }]}
                >
                    <Select placeholder="Select status">
                        {statusOptions.map((status) => (
                            <Option key={status.value} value={status.value}>
                                {status.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='submit'>
                    <Button className="Submit-btn" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTaskModal;
