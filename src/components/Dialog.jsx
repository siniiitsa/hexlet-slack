import React from 'react';

const Dialog = () => {
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3"></div>
        <div className="mt-auto">
          <form noValidate autoComplete="off">
            <div className="form-group">
              <div className="input-group">
                <input type="text" name="body" aria-label="body" className="mr-2 form-control" />
                <button type="submit" aria-label="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dialog;