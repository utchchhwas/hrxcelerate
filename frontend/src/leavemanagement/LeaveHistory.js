import React from 'react';
import { Breadcrumb, Table, Divider, Popconfirm, Icon, Tabs } from 'antd';

const TabPane = Tabs.TabPane;


class LeaveHistory extends React.Component {



  render() {

    const allrequests = [
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Leave Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Start Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'End Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'No Of Days',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    const accepted = [
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Leave Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Start Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'End Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'No Of Days',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Accepted By',
        dataIndex: 'acceptedby',
        key: 'acceptedby',
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    const rejected = [
      {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Leave Type',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Start Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'End Date',
        dataIndex: 'date',
        key: 'date',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'No Of Days',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Rejected By',
        dataIndex: 'rejectedby',
        key: 'rejectedby',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Reject Reason',
        dataIndex: 'rejectreason',
        key: 'rejectreason',
        render: text => <a href="javascript:;">{text}</a>,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
          <Breadcrumb.Item>Leave History</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Tabs >
            <TabPane tab="All Requests" key="1">
            <Table columns={allrequests}  />
    </TabPane>
            <TabPane tab="Accepted" key="2">
            <Table columns={accepted}  />
    </TabPane>
            <TabPane tab="Rejected" key="3">
            <Table columns={rejected}  />
    </TabPane>
          </Tabs>


        </div>

      </React.Fragment>
    );
  }
}

export default LeaveHistory;
