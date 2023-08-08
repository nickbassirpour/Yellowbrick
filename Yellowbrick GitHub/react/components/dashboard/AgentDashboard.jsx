// import node module libraries
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import custom components
// import { FlatPickr } from 'components/elements/flat-pickr/FlatPickr';
// import ApexCharts from 'components/elements/charts/ApexCharts';
import StatRightIcon from "components/admin/stats/StatRightIcon";

// import sub components
import Agents from "./Agents.jsx";
import Proposals from "./Proposals.jsx";
import Clients from "./Clients.jsx";

// import data files
// import {
// 	TrafficChartSeries,
// 	TrafficChartOptions,
// 	EarningsChartSeries,
// 	EarningsChartOptions
// } from 'data/charts/ChartData';

import UserService from "../../services/userService.js";
import debug from "sabio-debug";
const _logger = debug.extend("Agent Dashboard");

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// 	<Link
// 		to=""
// 		// ref={ref}
// 		// onClick={(e) => {
// 		// 	e.preventDefault();
// 		// 	onClick(e);
// 		// }}
// 	>
// 		{/* {children} */}
// 	</Link>
// ));

const AgentDashboard = (props) => {
  const [data, setData] = useState({
    totalClients: 0,
    totalAgents: 0,
    totalProposals: 0,
    totalAppointments: 0,
  });

  _logger(props);

  useEffect(() => {
    UserService.getAllDashboardById(props.currentUser.id)
      .then(getAllSuccess)
      .catch(getAllError);
  }, []);

  const getAllSuccess = (res) => {
    _logger(res.item);
    setData((prevState) => {
      let data = { ...prevState };
      data.totalClients = res.item[0].count;
      data.totalAgents = res.item[1].count;
      data.totalProposals = res.item[2].count;
      data.totalAppointments = res.item[3].count;
      return data;
    });
  };

  const getAllError = (err) => {
    _logger(err);
  };

  return (
    <div>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
        >
          <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
            <div className="mb-3 mb-lg-0">
              <h1 className="mb-0 h2 fw-bold">Agent Dashboard</h1>
            </div>
            <div className="d-flex">
              <div className="input-group me-3  ">
                {/* <FlatPickr value={''} /> */}
                <span
                  className="input-group-text text-muted"
                  id="basic-addon2"
                >
                  <i className="fe fe-calendar"></i>
                </span>
              </div>
              <Link
                to="#"
                className="btn btn-primary"
              >
                Setting
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Proposals"
            value={data.totalProposals.toString()}
            summary="Number of sales"
            summaryValue="+20.9$"
            summaryIcon="up"
            isShowSummaryIcon={false}
            iconName="shopping-bag"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Clients"
            value={data.totalClients.toString()}
            summary="Number of pending"
            summaryValue="120+"
            summaryIcon="down"
            isShowSummaryIcon={true}
            iconName="book-open"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Agents"
            value={data.totalAgents.toString()}
            summary="Students"
            summaryValue="+1200"
            summaryIcon="up"
            isShowSummaryIcon={true}
            iconName="users"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Appointments"
            value={data.totalAppointments.toString()}
            summary="Instructor"
            summaryValue="+200"
            summaryIcon="up"
            isShowSummaryIcon={true}
            iconName="user-check"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>
      </Row>

      <Row>
        <Col
          xl={4}
          lg={6}
          md={12}
          className="mb-4"
        >
          <Clients
            title="Clients"
            currentUser={props.currentUser}
          />
        </Col>
        <Col
          xl={4}
          lg={6}
          md={12}
          className="mb-4"
        >
          <Proposals title="Proposals" />
        </Col>
        <Col
          xl={4}
          lg={6}
          md={12}
          className="mb-4"
        >
          <Agents title="Agents" />
        </Col>
      </Row>
    </div>
  );
};

AgentDashboard.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default AgentDashboard;
