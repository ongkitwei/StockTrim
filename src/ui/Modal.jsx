import React from "react";

function Modal({ chart, id }) {
  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box w-[90%] max-w-5xl m-auto">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="w-[100%] h-[100%]">{chart}</div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
