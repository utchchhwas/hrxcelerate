import React from 'react';
import {Breadcrumb,Table, Divider, Popconfirm, Icon, Input } from 'antd';

const Search = Input.Search;

class LeaveCancelRequest extends React.Component {
  
  render() {
    const columns = [
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'View Leave',
        dataIndex: 'view',
        key: 'view',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Leave Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Cancel Reason',
        dataIndex: 'reason',
        key: 'reason',
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    const data = [
      {
        key: '1',
        name: 'Ram',
        view: 'view',
        type: 'type',
        reason: 'reason',
      },
    ];

  return (
    <React.Fragment>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
              <Breadcrumb.Item>Cancel Request</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Search placeholder="input search text" onSearch={value => console.log(value)}  style={{ width: 200 }}/>
        <br></br>
        <br></br>
            <Table columns={columns} dataSource={data} />,
           
            </div>
          
            </React.Fragment>
            
  );
}
}

export default LeaveCancelRequest;
