export default function Card(props) {
  return (
    <div className="Card">
      <div className="Card--container">
        <h2 className="title">ip address</h2>
        <p className="description">{props.address}</p>
      </div>
      <hr></hr>
      <div className="Card--container">
        <h2 className="title">location</h2>
        {props.location && (
          <p className="description">{props.location.city},</p>
        )}
        {props.location && (
          <p className="description">{props.location.region}</p>
        )}
      </div>
      <hr></hr>
      <div className="Card--container">
        <h2 className="title">timezone</h2>
        {props.location && (
          <p className="description">UTC {props.location.timezone}</p>
        )}
      </div>
      <hr></hr>
      <div className="Card--container">
        <h2 className="title">isp</h2>
        <p className="description">{props.isp}</p>
      </div>
    </div>
  );
}
