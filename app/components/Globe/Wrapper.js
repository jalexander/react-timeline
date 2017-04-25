import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;

  margin: 0;

  border: 3px dotted #b3b3b3;
  border-radius: 50%;
  width: ${(props) => props.width ? `${props.width}px` : 'auto'};
  height: ${(props) => props.height ? `${props.height}px` : 'auto'};

  margin-left: ${(props) => props.width ? `-${props.width / 2}px` : '-464px'};
  margin-top: ${(props) => props.height ? `-${props.height / 2}px` : '-454px'};

  @-moz-document url-prefix() {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export default Wrapper;
