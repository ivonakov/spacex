import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

import { ApiContext } from "../components/_context";
import Pagination from "../components/pagination";
/*
    //  !!! Not finish yet
    import Limit from "../components/limit";
*/
const timeDate = (time) => {
    const locaDate = new Date(time * 1000)
    return {
        date: locaDate.toLocaleDateString('bg-BG', { timeZone: 'Europe/Sofia' }),
        time: locaDate.toLocaleTimeString('bg-BG', { timeZone: 'Europe/Sofia' })
    }
}

const ListComponent = () => {

    const context = React.useContext(ApiContext);
    const items = context.launches;

    return (
        <>
            {items.content && (
                <Container className="p-1 mt-5">
                    <div className="d-flex justify-content-between my-2">
                        <div className="py-2">
                            {/* <Limit /> */}
                            <h2 className="p-2  mr-auto">SpaceX Launches</h2>
                        </div>
                        <div className="ml-auto py-2">
                            <Pagination />
                        </div>
                    </div>

                    <ListGroup className="list-group">
                        {items.content.map((launch) => (
                            <ListGroup.Item
                                key={launch._id}
                                className="list-group-item list-group-item-action"
                            >
                                <Row>
                                    <Col sm={8} className="d-flex align-items-center">
                                        <h5 className=" align-middle">
                                            {launch.launch_site.site_name_long}
                                        </h5>
                                    </Col>
                                    <Col sm={4} className="d-flex flex-column align-items-end  text-center">
                                        <div className="p-2">
                                            <small>{timeDate(launch.launch_date_unix).date}</small> <br />
                                            <small>{timeDate(launch.launch_date_unix).time}</small>
                                        </div>
                                        <div className="mt-auto p-2 ">
                                            <Button
                                                href={`/${launch.flight_number}`}
                                                className="float-right"
                                                size="sm"
                                                variant="outline-secondary"                      >
                                                Details
                      </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Container>
            )}
        </>
    );
};

export default ListComponent;
