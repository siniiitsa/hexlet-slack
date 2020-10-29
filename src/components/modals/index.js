import AddChannel from './AddChannel';

const modals = {
  addChannel: AddChannel,
};

export default (modalName) => modals[modalName];
