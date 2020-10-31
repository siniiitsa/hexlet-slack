import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';

const modals = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
};

export default (modalName) => modals[modalName];
