import React from "react";

function Buttons({ onOpen, className, classButton, onSubmit}) {
  return (
    <div className={className}>
        <button
          className={`edit ${classButton}`}
          type="button"
          onClick={onOpen}
        />
      <button
        className={`delite ${classButton}`}
        type="submit"
        onClick={onSubmit}
      />
    </div>
  );
}

export default Buttons;
