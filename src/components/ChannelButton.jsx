import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const renderButton = ({ name, variant, onClick }) => (
  <Button
    onClick={onClick}
    className="btn-block mb-2 text-left shadow-none"
    variant={variant}
  >
    {name}
  </Button>
);

const renderButtonWithMenu = ({
  name,
  variant,
  onClick,
  onRemoveChannel,
  onRenameChannel,
  renameBtnName,
  removeBtnName,
}) => (
  <Dropdown as={ButtonGroup} className="btn-block mb-2">
    <Button
      onClick={onClick}
      className="text-left shadow-none"
      variant={variant}
    >
      {name}
    </Button>

    <Dropdown.Toggle
      split
      className="flex-grow-0 shadow-none"
      variant={variant}
      id="dropdown-split-basic"
    />

    <Dropdown.Menu>
      <Dropdown.Item onClick={onRenameChannel}>{renameBtnName}</Dropdown.Item>
      <Dropdown.Item onClick={onRemoveChannel}>{removeBtnName}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const ChannelButton = (props) => {
  const { t } = useTranslation();
  const render = props.removable ? renderButtonWithMenu : renderButton;
  return render({
    ...props,
    renameBtnName: t('channels.rename'),
    removeBtnName: t('channels.remove'),
  });
};

export default ChannelButton;
