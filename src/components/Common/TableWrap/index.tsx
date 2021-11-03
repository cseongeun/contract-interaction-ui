import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 50px;
  border-radius: 24px;
  border: 1px solid #8ba9a9;
`;

const Wrap = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      :nth-child(even) {
        background-color: #f2f2f2;
      }
    }
    th {
      height: 50px;
      padding-bottom: 8px;
      border-bottom: 1px solid black;
      text-transform: uppercase;
      text-align: center;
      font-size: 15px;
      color: #818ea3;
      letter-spacing: 0.1625rem;
    }
    ,
    td {
      margin: 0;
      padding: 0.5rem;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const TableWrap: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Wrap>{children}</Wrap>
    </Wrapper>
  );
};

export default TableWrap;
