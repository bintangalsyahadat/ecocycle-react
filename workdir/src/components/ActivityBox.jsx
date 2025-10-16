import { Button, Card } from "react-bootstrap";


export default function ActivityBox({ activity }) {
    return (
        <Card
            style={{
                width: "100%",
                maxWidth: "700px",
            }}
            className="bg-light rounded-4 border-0 text-black overflow-hidden shadow"
        >
            <Card.Img
                variant="top"
                // src={activity.img}
                style={{ height: "220px", objectFit: "cover", backgroundColor: "#ddd" }}
            />
            <Card.Body className="text-center">
                <Card.Title className="fw-bold mb-2">
                    “{activity.title}”
                </Card.Title>
                <Card.Text className="small">
                    {activity.desc}
                </Card.Text>
                <Button
                    variant="primary"
                    size="sm"
                    className="fw-bold rounded-pill px-3"
                >
                    Read More
                </Button>
            </Card.Body>
        </Card>
    )
}