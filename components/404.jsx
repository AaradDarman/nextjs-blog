import { Fragment } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  const Container = styled.div`
    background-color: ${({ theme }) => theme.primary};
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .m-btn {
      flex: unset;
      text-decoration: none;
    }
    .m-btn:hover {
        color: unset;
    }
  `;
  const Image = styled.div`
    background: url("/images/404error.png") no-repeat 50%;
    background-size: contain;
    width: 100%;
    height: 77%;
  `;

  return (
    <Fragment>
      <Container id="notfound">
        <Container className="w-100 flex-column">
          <Image />
          <h2 className="mb-4 text-center">شرمنده همچین صفحه ایی نداریم</h2>
          <Link to="/" className="m-btn">
            برگشت به صفحه اصلی
          </Link>
        </Container>
      </Container>
    </Fragment>
  );
};

export default NotFound;
