import React from 'react';
import styled from 'styled-components';
import Item from 'components/Common/Sidebar/Menu/Item';
import IconTasks from 'components/Common/Icons/Menu/Tasks';
import ErrorBoundary from 'components/Common/ErrorBoundary';
import IconMessages from 'components/Common/Icons/Menu/Messages';
import IconSchedule from 'components/Common/Icons/Menu/Schedule';
import IconActivity from 'components/Common/Icons/Menu/Activity';
import IconSettings from 'components/Common/Icons/Menu/Settings';
import IconDashboard from 'components/Common/Icons/Menu/Dashboard';

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 20px 20px 10px 20px;
`;

const itemsData = [
  {
    name: 'Interaction',
    icon: IconDashboard(),
    link: '/',
  },
  {
    name: 'Info',
    icon: IconTasks(),
    link: '/info',
  },

];

interface IItemProps {
  name: string;
  icon: object | string;
  link: string;
}

const items = itemsData.map((item: IItemProps, idx: number): object => <Item key={idx} {...item} />);

const Menu = () => {
  return (
    <ErrorBoundary>
      <Wrapper>{items}</Wrapper>
    </ErrorBoundary>
  );
};

export default Menu;
