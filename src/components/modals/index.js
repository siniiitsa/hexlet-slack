import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

export default (modalName) => modals[modalName];
