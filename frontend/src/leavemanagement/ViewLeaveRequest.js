import React from 'react';
import { Breadcrumb, Table, Divider, Popconfirm, Icon, Input } from 'antd';

const Search = Input.Search;

class ViewLeaveRequest extends React.Component {

  render() {
    const columns = [
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Start Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'End Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Number of Days',
        key: 'number',
        dataIndex: 'number',

      },
      {
        title: 'Leave Type',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: 'Reason',
        key: 'reason',
        dataIndex: 'reason',
      },
    ];

    const data = [

    ];

    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
          <Breadcrumb.Item>View Request</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Search placeholder="input search text" onSearch={value => console.log(value)}  style={{ width: 200 }}/>
        <br></br>
        <br></br>
          <Table columns={columns} dataSource={data} />

        </div>
      </React.Fragment>

    );
  }
}

export default ViewLeaveRequest;
