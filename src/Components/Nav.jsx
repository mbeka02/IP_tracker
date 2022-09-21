import { useState } from "react";

export default function Nav(props) {
  //function with state var inside it.
  const useInputVal = (InitialVal) => {
    const [value, setValue] = useState(InitialVal);

    return {
      value,
      onChange: (e) => setValue(e.target.value),
    };
  };

  const IP = useInputVal("");
  return (
    <div className="nav">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSub(IP.value);
        }}
      >
        <h1 className="app-title">IP Address Tracker</h1>
        <div className="nav--container">
          <input
            className="nav--input"
            placeholder="Search for any IP address or domain"
            {...IP}
          />
          <button className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
