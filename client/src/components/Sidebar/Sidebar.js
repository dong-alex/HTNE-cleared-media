import React from 'react';
import { bool, func } from 'prop-types';
import { StyledSidebar } from './Sidebar.styled';

const Sidebar = ({ open, setOpen, ...props }) => {
  
  const isExpanded = open ? true : false;
  
  return (
    <StyledSidebar aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span />
      <span />
      <span />
    </StyledSidebar>
  )
}

Sidebar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Sidebar;
