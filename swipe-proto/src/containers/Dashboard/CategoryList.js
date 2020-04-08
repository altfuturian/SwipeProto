import React from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';

const LOAD_CONTENT = ({list}) => {
    let grid = [];

    for (let i = 0; i < list.length; i) {
        let columns = [];
        for (let y = 0; y < 3; y++) {
            if (i < list.length) {
                columns.push(
                    <Col className="col-4" key={i}>
                        <Card className=" card-block d-flex card-category">
                            <Card.Body className="align-items-center d-flex justify-content-center">
                                {list[i]["name"]}
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
            i++;
        }
        grid.push(<Container><Row className="mb-3">{columns}</Row></Container>)
    }

    return grid;
}

const CATEGORY_LIST = ({categories}) => {
    return (
        <React.Fragment>
            <section className="header-category text-center">
                <Col>
                    <div>
                        <Container>
                            <h3> Categories </h3>
                        </Container>
                    </div>
                </Col>
            </section>
            <section className="content-category overflow-auto">
                <LOAD_CONTENT
                    list={categories}
                />
            </section>
            <section className="text-center footer-category d-flex">
                <div className="w-100 align-items-center d-flex justify-content-center">
                    <Button className=" btn-generate">Generate Items</Button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default CATEGORY_LIST;