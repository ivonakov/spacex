import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Container, Row, Col, Button, Image } from "react-bootstrap";

import { ApiContext } from "../components/_context";
import useSingle from "../components/_getItem";

const timeDate = (time) => {
  const locaDate = new Date(time * 1000);
  return {
    date: locaDate.toLocaleDateString("bg-BG", { timeZone: "Europe/Sofia" }),
    time: locaDate.toLocaleTimeString("bg-BG", { timeZone: "Europe/Sofia" }),
  };
};

const DetailComponent = () => {
  const [single] = useSingle();
  const params = useParams();
  const context = React.useContext(ApiContext);
  const history = useHistory();

  let item = null;

  if (context.launches.content) {
    item = context.launches.content.find((e) => e.flight_number === params.num);
    if (!item) {
      item = single;
    }
  }

  return (
    <>
      {item && (
        <Container className="p-1 mt-5">
          <Row className="d-flex rounded mb-4 p-0">
            <div className="py-2">
              <h3 className="mb-0">
                {item.mission_name}
                <small className=" text-muted">
                  <em>[ {item.rocket.rocket_name} ]</em>
                </small>
              </h3>
            </div>
            <div className="ml-auto py-2">
              <Button variant="outline-secondary" onClick={history.goBack}>
                Go Back
              </Button>
            </div>
          </Row>
          <Row className="border rounded mb-4 shadow-sm">
            <Col xs={6} md={4} className="col p-4 ">
              <Image src={item.links.mission_patch_small} rounded />
            </Col>
            <Col xs={12} md={8} className="col p-4 ">
              <h3 className="mb-0">
                {item.mission_name}{" "}
                <small className=" text-muted">
                  <em>[ {item.rocket.rocket_name} ]</em>
                </small>
              </h3>
              <div className="mb-1 text-muted">
                {timeDate(item.launch_date_unix).date} /{" "}
                {timeDate(item.launch_date_unix).time}
              </div>
              <hr />
              <h4 className="mb-3">{item.launch_site.site_name_long}</h4>
              <p className="card-text mb-4">{item.details}</p>

              <div className="btn-group  mt-auto float-right" role="group">
                <Button
                  href={`item.links.article_link`}
                  variant="outline-secondary"
                  target="_blank"
                >
                  article
                </Button>
                <Button
                  href={`item.links.wikipedia`}
                  variant="outline-secondary"
                  target="_blank"
                >
                  wikipedia
                </Button>
                <Button
                  href={`item.links.video_link`}
                  variant="outline-secondary"
                  target="_blank"
                >
                  video
                </Button>
              </div>
            </Col>
          </Row>
          {item.mission_name && (
            <Row className="border rounded py-2 my-4 shadow-sm">
              <Col xs={4} sm={2}>
                Mission Name:
              </Col>
              <Col xs={8} sm={10}>
                {item.mission_name}
              </Col>
            </Row>
          )}
          {item.rocket.rocket_name && (
            <Row className="border rounded py-2 my-4 shadow-sm">
              <Col xs={4} sm={2}>
                Rocket Name:
              </Col>
              <Col xs={8} sm={10}>
                {item.rocket.rocket_name}
              </Col>
            </Row>
          )}
          {item.rocket.rocket_type && (
            <Row className="border rounded py-2 my-4 shadow-sm">
              <Col xs={4} sm={2}>
                Rocket Type:
              </Col>
              <Col xs={8} sm={10}>
                {item.rocket.rocket_type}
              </Col>
            </Row>
          )}

          {item.rocket.second_stage.payloads[0].nationality && (
            <Row className="border rounded py-2 my-4 shadow-sm">
              <Col xs={4} sm={2}>
                Nationality:
              </Col>
              <Col xs={8} sm={10}>
                {item.rocket.second_stage.payloads[0].nationality}
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default DetailComponent;
