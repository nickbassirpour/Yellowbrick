// import node module libraries
// import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import ClientService from "../../services/clientService.js";
import debug from "sabio-debug";
import { formatDateShort } from "../../utils/dateFormater.js";
const _logger = debug.extend("Clients");
import { Col, Row, Card, ListGroup, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import PropTypes from "prop-types";

// import data files

const Clients = (props) => {
  const [data, setData] = useState({
    clients: [],
  });

  _logger(props);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const agentId = props.currentUser.id;
    if (pathname.includes("agent")) {
      ClientService.getById(0, 5, agentId)
        .then(getClientsSuccess)
        .catch(getClientsError);
    } else {
      ClientService.selectAll(0, 10)
        .then(getClientsSuccess)
        .catch(getClientsError);
    }
  }, []);

  const getClientsSuccess = (res) => {
    const clientArray = res.item.pagedItems;
    _logger(clientArray);
    setData((prevState) => {
      let clientData = { ...prevState };
      clientData.clients = clientArray;
      return clientData;
    });
  };

  const getClientsError = (err) => {
    _logger("Get Clients Error", err);
  };

  // const Activity = ({ title }) => {
  return (
    <Card className="h-100 bg-white border border-bottom-1">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height bg-primary">
        <h4 className="mb-0">Clients</h4>
        <Link
          to="/clients"
          className="btn btn-outline-white btn-sm bg-white"
        >
          View all
        </Link>
      </Card.Header>
      <Card.Body className="bg-white border-bottom">
        <ListGroup className="list-timeline-activity">
          {data?.clients?.slice(0, 5).map((item, index) => (
            <ListGroup.Item
              className="px-0 pt-0 border-0 mb-2 bg-white"
              key={index}
            >
              <Row>
                <Col xs={10}>
                  <Row>
                    <Col className="mb-1">
                      <h4 className="mb-0 h5">
                        {item.firstName} {item.lastName}
                      </h4>
                    </Col>
                    <Col className="text-end fs-6">
                      <span className="text-end fs-6">
                        {item.createdBy.firstName} {item.createdBy.lastName}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <p className="mb-1">{item.phone}</p>
                    </Col>
                    <Col className="text-end fs-6">
                      <span className="text-end fs-6">
                        {formatDateShort(item.dateModified)}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col
                  className="col-auto"
                  xs={2}
                >
                  <div className={`avatar`}>
                    <Image
                      alt="avatar"
                      src={
                        item.createdBy.avatarUrl
                          ? item.createdBy.avatarUrl
                          : Avatar1
                      }
                      className="rounded-circle"
                    />
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

Clients.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default Clients;
