import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;

  margin: -454px 0 0 -464px;

  border: 3px dotted #b3b3b3;
  border-radius: 50%;

  @-moz-document url-prefix() {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export default Wrapper;
